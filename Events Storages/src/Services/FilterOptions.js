class FilterOptions {
    static filterString = null;
    static filterOptions = {
        assignee: null,
        status: new Set(),
        priority: new Set(),
        private: new Set(),
    };

    static checkSetValues(set, value) {
        set.has(value) ? set.delete(value) : set.add(value);
    }

    static setAssigneee(assignee) {
        filterOptions.assignee = assignee || null;
    }

    static setAssignee(name) {
        filterOptions.assignee = name || null;
    }

    static setStatus(status) {
        FilterOptions.checkSetValues(this.filterOptions.status, status);
    }

    static setPriority(priority) {
        FilterOptions.checkSetValues(this.filterOptions.priority, priority);
    }

    static setPrivate(isPrivate) {
        FilterOptions.checkSetValues(this.filterOptions.private, isPrivate);
    }
}
