class Blur extends BaseElement {
    constructor() {
        super();

        this.init();
    }

    init() {
        this.node.classList.add(styles.blurWrapper);
    }
}
