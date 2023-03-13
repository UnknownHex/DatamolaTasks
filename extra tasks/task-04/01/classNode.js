class Node {
    constructor(value) {
        this._value = value;
        this._next = null;
    }

    get value() {
        return this._value;
    }

    set next(node) {
        this._next = node;
    }

    get next() {
        return this._next;
    }
}
