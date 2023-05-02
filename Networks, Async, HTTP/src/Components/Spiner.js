class Spiner extends BaseElement {
    constructor() {
        super();

        this.init();
    }

    init() {
        this.node.classList.add(styles.ldsRing);
        this.node.innerHTML = '<div></div><div></div><div></div><div></div>';
    }

    showSpiner(container) {
        container.appendChild(this.node);
    }

    clearSpiner() {
        this.node.remove();
    }
}
