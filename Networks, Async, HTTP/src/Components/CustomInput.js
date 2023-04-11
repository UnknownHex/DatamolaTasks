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

        this.input = document.createElement('input');
        this.init();
    }

    blink() {
        const blink = () => {
            // console.log(e.target);
            this.node.classList.remove(styles.wrong);
            this.node.removeEventListener('animationend', blink);
        };

        this.node.addEventListener('animationend', blink);
        this.node.classList.add(styles.wrong);
    }

    init() {
        this.node.classList.add(styles.inp);
        const inputBtn = new Button({ classNames: [styles.ico, this.icon] });
        const label = document.createElement('label');

        this.input.setAttribute('type', this.type || 'text');
        label.setAttribute('for', this.name);

        if (this.type === 'password') {
            inputBtn.node.addEventListener('mousedown', () => {
                this.input.type = 'text';
            });
            inputBtn.node.addEventListener('mouseup', () => {
                this.input.type = this.type;
            });
            inputBtn.node.addEventListener('mouseout', () => {
                this.input.type = this.type;
            });
        }

        if (this.isDate) {
            this.input.addEventListener('click', (e) => {
                e.target.type = 'datetime-local';
                e.target.showPicker();
            });

            this.input.addEventListener('blur', (e) => {
                this.value = e.target.value;
                e.target.type = 'text';
                e.target.value = this.value ? formatDate(new Date(this.value)) : null;
            });

            this.input.value = this.value ? formatDate(new Date(this.value)) : null;
        }

        if (this.onChange) {
            this.input.addEventListener('change', this.onChange);
        }

        if (this.isRequired) {
            this.input.setAttribute('required', this.isRequired);
        }

        if (this.name) {
            this.input.setAttribute('name', this.name);
        }

        if (this.placeholder) {
            this.input.setAttribute('name', this.placeholder);
        }

        if (this.value) {
            this.input.value = this.value;
        }

        this.node.appendChild(this.input);

        label.classList.add(styles.inpCaption);
        label.textContent = this.label;

        if (this.icon) {
            this.node.appendChild(inputBtn.node);
        }

        this.node.appendChild(label);
    }
}
