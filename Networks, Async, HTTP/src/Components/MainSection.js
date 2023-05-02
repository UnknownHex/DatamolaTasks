class MainSection extends BaseElement {
    constructor(id) {
        super('main');

        this.id = id;

        this.init();
    }

    init() {
        this.node.classList.add(styles.main);
        this.node.setAttribute('id', this.id);
    }

    appendIn(id) {
        document.querySelector(`#${id}`).appendChild(this.node);
    }

    clear() {
        while (this.node.firstChild) {
            this.node.firstChild.remove();
        }
    }
}
