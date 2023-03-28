class LocalStorage {
    constructor(taskCollector, userCollector) {
        this.storage = localStorage;

        this.userCollector = userCollector;
        this.taskCollector = taskCollector;

        this.filterString = null;
        this.setToDefaults();
        // this.filterOptions = {
        //     assignee: null,
        //     status: new Set(),
        //     priority: new Set(),
        //     private: new Set(),
        //     startDate: '',
        //     endDate: '',
        // };

        this.storageKeys = {
            currentUser: 'currentUser',
            // mainKey: this.userCollector.user,
            tasklist: 'tasklist',

            filterString: 'filterString',
            filterOptions: 'filterOptions',
        };

        this.init();
    }

    init() {
        const storageLength = this.storage.length;

        if (storageLength === 0) {
            this.saveStoredData();
            this.#saveFilterOptions();
        }

        if (storageLength > 0) {
            this.loadStoredData();
        }
    }

    get activeFilters() {
        return {
            assignee: this.filterOptions.assignee,
            status: Array.from(this.filterOptions.status),
            priority: Array.from(this.filterOptions.priority),
            isPrivate: Array.from(this.filterOptions.private),
            dateFrom: this.filterOptions.dateFrom,
            dateTo: this.filterOptions.dateTo || new Date(),
        };
    }

    #saveFilterOptions() {
        this.saveToStore(this.storageKeys.filterOptions, {
            assignee: this.filterOptions.assignee,
            status: Array.from(this.filterOptions.status),
            priority: Array.from(this.filterOptions.priority),
            private: Array.from(this.filterOptions.private),
            dateFrom: new Date(this.filterOptions.dateFrom),
            dateTo: new Date(this.filterOptions.dateTo),
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

    saveStoredData() {
        this.saveToStore(this.storageKeys.currentUser, this.userCollector.user);
        this.saveToStore(this.storageKeys.tasklist, this.taskCollector.tasklist);
        this.saveToStore(this.storageKeys.filterString, this.filterString);
        this.#saveFilterOptions();
    }

    loadStoredData() {
        this.userCollector.user = this.loadFromStore(this.storageKeys.currentUser);
        this.taskCollector.tasklist = this.loadFromStore(this.storageKeys.tasklist);
        this.filterString = this.loadFromStore(this.storageKeys.filterString);
        this.#loadFilterOptions();
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
        this.#saveFilterOptions();
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

    setDateFrom(date) {
        console.log(date);
        this.filterOptions.dateFrom = new Date(date);
        this.#saveFilterOptions();
    }

    setDateTo(date) {
        this.filterOptions.dateTo = new Date(date);
        this.#saveFilterOptions();
    }

    setToDefaults() {
        this.filterString = null;
        this.filterOptions = {
            assignee: null,
            status: new Set(),
            priority: new Set(),
            private: new Set(),
            dateFrom: new Date('1999'),
            dateTo: null,
        };
    }
}
