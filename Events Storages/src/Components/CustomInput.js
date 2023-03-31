class CustomInput extends BaseElement {
    constructor({
        label, type, value, icon, name, placeholder, isRequired, isDate, onClick, onChange, onFocus, onBlur,
    }) {
        super();

        this.label = label;
        this.type = type;
        this.value = value;
        this.icon = icon;
        this.name = name;
        this.isRequired = isRequired;
        this.placeholder = placeholder;
        this.onClick = onClick;
        this.onChange = onChange;
        this.isDate = isDate;

        this.init();
    }

    init() {
        this.node.classList.add(styles.inp);
        const input = document.createElement('input');
        const inputBtn = new Button({ classNames: [styles.ico, this.icon] });
        const label = document.createElement('label');

        input.setAttribute('type', 'text');

        if (this.isDate) {
            input.addEventListener('click', (e) => {
                e.target.type = 'datetime-local';
                console.log(e.target.value);
                e.target.showPicker();
            });

            input.addEventListener('blur', (e) => {
                console.log('preBlur(target):', e.target.value);
                console.log('preBlur(this):', this.value);
                this.value = e.target.value;
                e.target.type = 'text';
                e.target.value = this.value ? formatDate(new Date(this.value)) : null;
            });

            input.value = this.value ? formatDate(new Date(this.value)) : null;
        }

        if (this.onChange) {
            input.addEventListener('change', this.onChange);
        }

        if (this.isRequired) {
            input.setAttribute('required', this.isRequired);
        }

        if (this.name) {
            input.setAttribute('name', this.name);
        }

        if (this.placeholder) {
            input.setAttribute('name', this.placeholder);
        }

        this.node.appendChild(input);

        label.classList.add(styles.inpCaption);
        label.textContent = this.label;

        this.node.appendChild(inputBtn.node);
        this.node.appendChild(label);
    }
}
