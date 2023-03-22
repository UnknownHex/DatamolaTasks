class Button extends BaseElement {
    constructor({
        caption, type, classNames, onClick, isBurger,
    }) {
        super('button');
        this.caption = document.createTextNode(caption);
        this.type = type ?? 'button';
        this.classes = classNames ?? '';
        this.isBurger = isBurger ?? false;
        this.onClick = onClick;

        this.init();
    }

    init() {
        this.node.setAttribute('type', this.type);

        if (Array.isArray(this.classes)) {
            this.classes.forEach((styleName) => this.node.classList.add(styleName));
        } else if (typeof this.classes === 'string') {
            this.node.classList.add(this.classes);
        }

        if (this.isBurger) {
            const line = document.createElement('span');
            line.classList.add(styles.burgLine);
            const line2nd = line.cloneNode();
            const line3rd = line.cloneNode();

            this.node.appendChild(line);
            this.node.appendChild(line2nd);
            this.node.appendChild(line3rd);
        } else {
            this.node.appendChild(this.caption);
        }

        if (this.onClick) {
            this.node.addEventListener('click', this.onClick);
        }
    }
}
