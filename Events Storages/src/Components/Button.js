class Button extends BaseElement {
    constructor({
        caption, name, type, classNames, onClick, isBurger, icon, dataset,
    }) {
        super('button');
        this.caption = caption;
        this.type = type ?? 'button';
        this.classes = classNames ?? '';
        this.isBurger = isBurger ?? false;
        this.onClick = onClick;
        this.icon = icon;
        this.name = name;
        this.dataset = dataset;

        this.init();
    }

    init() {
        this.node.setAttribute('type', this.type);

        if (Array.isArray(this.classes)) {
            this.classes.forEach((styleName) => this.node.classList.add(styleName));
        } else if (typeof this.classes === 'string') {
            this.node.classList.add(this.classes);
        }

        if (this.caption) {
            const capt = document.createElement('div');
            capt.classList.add(styles.btnCaption);
            capt.textContent = this.caption;
            this.node.append(capt);
        }

        if (this.name) {
            this.node.setAttribute('name', this.name);
        }

        if (this.dataset) {
            this.node.dataset.data = this.dataset;
        }

        if (this.isBurger) {
            const line = document.createElement('span');
            line.classList.add(styles.burgLine);

            const line2nd = line.cloneNode();
            const line3rd = line.cloneNode();

            this.node.appendChild(line);
            this.node.appendChild(line2nd);
            this.node.appendChild(line3rd);
        } else if (this.classes.includes(styles.onlyicon) || this.icon) {
            const icon = document.createElement('span');
            icon.classList.add(styles.ico);
            icon.classList.add(this.icon);

            this.node.appendChild(icon);
        }

        if (this.onClick) {
            this.node.addEventListener('click', this.onClick);
        }
    }
}
