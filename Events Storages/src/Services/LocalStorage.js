class LocalStorage {
    constructor(taskCollector) {
        this.storage = localStorage;

        this.user = null;
        this.taskCollector = taskCollector;

        this.filterString = null;
        this.filterOptions = {
            assignee: null,
            status: new Set(),
            priority: new Set(),
            private: new Set(),
        };

        this.storageKeys = {
            user: 'user',
            tasklist: 'tasklist',

            filterString: 'filterString',
            filterOptions: 'filterOptions',
        };

        this.init();
    }

    init() {
        // this.storage.clear();
        const storageLength = this.storage.length;

        if (storageLength === 0) {
            this.saveStoredData();
            this.#saveFilterOptions();
        }

        if (storageLength > 0) {
            this.loadStoredData();
            this.#loadFilterOptions();
        }
    }

    saveStoredData() {
        this.saveToStore(this.storageKeys.user, this.user);
        this.saveToStore(this.storageKeys.tasklist, this.taskCollector.tasklist);
        this.saveToStore(this.storageKeys.filterString, this.filterString);
    }

    loadStoredData() {
        this.user = this.loadFromStore(this.storageKeys.user);
        this.taskCollector.tasklist = this.loadFromStore(this.storageKeys.tasklist);
        this.filterString = this.loadFromStore(this.storageKeys.filterString);
    }

    #saveFilterOptions() {
        this.saveToStore(this.storageKeys.filterOptions, {
            assignee: this.filterOptions.assignee,
            status: Array.from(this.filterOptions.status),
            priority: Array.from(this.filterOptions.priority),
            private: Array.from(this.filterOptions.private),
        });
    }

    #loadFilterOptions() {
        const lastFilters = this.loadFromStore(this.storageKeys.filterOptions);
        this.filterOptions.assignee = lastFilters.assignee;
        this.filterOptions.status = new Set(lastFilters.status);
        this.filterOptions.priority = new Set(lastFilters.priority);
        this.filterOptions.private = new Set(lastFilters.private);
    }

    #checkSetValues(set, value) {
        set.has(value) ? set.delete(value) : set.add(value);
        this.#saveFilterOptions();
    }

    saveToStore(key, data) {
        this.storage.setItem(key, JSON.stringify(data));
    }

    loadFromStore(key) {
        return JSON.parse(this.storage.getItem(key));
    }

    clearStorage() {
        this.storage.clear();
    }

    setAssignee(assignee) {
        this.filterOptions.assignee = assignee || null;
        this.saveToStore(this.storageKeys.assignee, this.filterOptions.assignee);
    }

    setTasklist(tasklist) {
        this.tasklist = tasklist;
        this.saveToStore(this.storageKeys, this.tasklist);
    }

    setFilterString(searchString) {
        this.searchString = searchString;
        this.saveToStore(this.storageKeys.filterString, this.searchString);
    }

    setStatus(status) {
        this.#checkSetValues(this.filterOptions.status, status);
    }

    setPriority(priority) {
        this.#checkSetValues(this.filterOptions.priority, priority);
    }

    setPrivate(isPrivate) {
        this.#checkSetValues(this.filterOptions.private, isPrivate);
    }
}
