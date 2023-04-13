class BaseElement {
    #node;

    constructor(tag = 'div') {
        this.#node = document.createElement(tag);
    }

    get node() {
        return this.#node;
    }

    get outerHTML() {
        return this.#node.outerHTML;
    }

    clear() {
        while (this.#node.firstChild) {
            this.#node.firstChild.remove();
        }

        this.#node.remove();
    }
}
