class List {
    constructor(startValue) {
        this._root = new Node(startValue);
    }

    get root() {
        return this._root;
    }

    set root(node) {
        this._root = node;
    }

    getWorkPoint(idx = null) {
        let point = this.root;
        let currentPoint = 0;

        while(point.next && currentPoint !== idx) {
            point = point.next;
            currentPoint += 1;
        };
        
        if (idx && currentPoint !== idx) {
            throw Error(errors.outOfListRange);
        };

        return point;
    }

    addNode(value, idx = null) {
        const node = new Node(value);
        let insertionPoint;

        try {
            insertionPoint = this.getWorkPoint(idx);
        } catch (e) {
            console.log(e);
            return false;
        };

        if (idx === 0) {
            node.next = this.root;
            this.root = node;
        } else if (idx > 0) {
            node.next = insertionPoint.next;
            insertionPoint.next = node;
        } else {
            insertionPoint.next = node;
        };

        return true;
    }

    // TODO: removeNod(i?: number): boolean;

    print() {
        let node = this.root;
        let nodeList = [];
        
        while (node) {
            nodeList = [...nodeList, node.value];
            node = node.next;
        };

        console.log(nodeList);
    }
};
