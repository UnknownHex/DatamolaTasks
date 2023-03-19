class List {
    constructor(startValue) {
        this._root = new Node(startValue);
        this._len = 1;
    }

    get root() {
        return this._root;
    }

    set root(node) {
        this._root = node;
    }

    get len() {
        return this._len;
    }

    set len(value) {
        this._len = value;
    }

    getWorkingPoint(idx = null) {
        let point = this.root;
        let currentPoint = 0;

        while(point.next && currentPoint !== idx) {
            point = point.next;
            currentPoint += 1;
        };
        
        if (idx && currentPoint !== idx) {
            throw new Error(errors.outOfListRange);
        };

        return point;
    }

    addNode(value, idx = null) {
        const node = new Node(value);

        try {
            const insertionPoint = this.getWorkingPoint(idx);
            node.next = insertionPoint.next;

            if (idx === 0) {
                this.root.next = node;
            } else {
                insertionPoint.next = node;
            };
        } catch (e) {
            console.log(e.message);
            return false;
        };

        this.len += 1;
        return true;
    }

    removeNode(idx = null) {
        try {
            if (!idx && !this.root.next) throw new Error(errors.onlyOneElement);
            
            const index = idx ?? this.len - 1;

            if (index === 0) {
                this.root = this.root.next;
            } else if(index > 0) {
                const prePoint = this.getWorkingPoint(index - 1);
                const removablePoint = this.getWorkingPoint(index);

                prePoint.next = removablePoint.next;
            };
        } catch (e) {
            console.log(e.message);
            return false;
        };

        this.len -= 1;
        return true;
    }

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
