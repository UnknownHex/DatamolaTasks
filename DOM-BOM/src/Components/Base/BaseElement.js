class BaseElement {
    #node;

    constructor(tag = 'div') {
        this.#node = document.createElement(tag);
    }

    get node() {
        return this.#node;
    }
}
