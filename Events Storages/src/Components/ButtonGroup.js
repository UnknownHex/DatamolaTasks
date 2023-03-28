class ButtonGroup extends BaseElement {
    constructor({ buttons, commonStyle, onClick }) {
        super();

        this.commonStyle = commonStyle;
        this.buttons = buttons;
        this.onClick = onClick;

        this.init();
    }

    init() {
        if (!Array.isArray(this.buttons)) {
            throw new Error('"buttons" must be a list! ( Array<Button>, Button[] )');
        }

        const fragment = document.createDocumentFragment();

        this.node.classList.add(this.commonStyle);

        this.buttons.forEach((button) => {
            button.node.setAttribute('data-action', this.name);

            fragment.appendChild(button.node);
        });

        this.node.addEventListener('click', this.onClick);

        this.node.appendChild(fragment);
    }
}
