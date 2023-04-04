class LocalStorage {
    static userCollector = [];
    static taskCollector = [];

    constructor() {
        this.storage = localStorage;

        this.currentUserId = null;


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
            currentUserId: 'currentUserId',
            // mainKey: this.userCollector.user,
            tasklist: 'tasklist',
            userlist: 'userlist',

            filterString: 'filterString',
            filterOptions: 'filterOptions',
        };

        this.init();
    }

    init() {
        const storageLength = this.storage.length;

        if (storageLength > 0) {
            this.loadStoredData();
        }

        this.saveStoredData();
    }

    static getUser(id) {
        const [user] = LocalStorage.userCollector.filter((user) => user.id === id);

        return user || null;
    }

    static getTask(id) {
        const [task] = LocalStorage.taskCollector.filter((user) => task.id === id);

        return task || null;
    }

    get activeFilters() {
        return {
            assignee: this.filterOptions.assignee,
            status: Array.from(this.filterOptions.status),
            priority: Array.from(this.filterOptions.priority),
            isPrivate: Array.from(this.filterOptions.private),
            dateFrom: this.filterOptions.dateFrom,
            dateTo: this.filterOptions.dateTo,
        };
    }

    saveFilterOptions() {
        this.saveToStore(this.storageKeys.filterOptions, {
            assignee: this.filterOptions.assignee,
            status: Array.from(this.filterOptions.status),
            priority: Array.from(this.filterOptions.priority),
            private: Array.from(this.filterOptions.private),
            dateFrom: this.filterOptions.dateFrom,
            dateTo: this.filterOptions.dateTo,
        });
    }

    loadFilterOptions() {
        const lastFilters = this.loadFromStore(this.storageKeys.filterOptions);
        this.filterOptions.assignee = lastFilters?.assignee;
        this.filterOptions.status = new Set(lastFilters?.status);
        this.filterOptions.priority = new Set(lastFilters?.priority);
        this.filterOptions.private = new Set(lastFilters?.private);
        this.filterOptions.dateFrom = lastFilters?.dateFrom;
        this.filterOptions.dateTo = lastFilters?.dateTo;
    }

    #checkSetValues(set, value) {
        set.has(value) ? set.delete(value) : set.add(value);
        this.saveFilterOptions();
    }

    saveStoredData() {
        this.saveToStore(this.storageKeys.currentUserId, this.currentUserId);
        this.saveToStore(this.storageKeys.tasklist, LocalStorage.taskCollector);
        this.saveToStore(this.storageKeys.userlist, LocalStorage.userCollector);
        this.saveToStore(this.storageKeys.filterString, this.filterString);
        this.saveFilterOptions();
    }

    loadStoredData() {
        this.currentUserId = this.loadFromStore(this.storageKeys.currentUserId);
        LocalStorage.taskCollector = this.loadFromStore(this.storageKeys.tasklist);
        LocalStorage.userCollector = this.loadFromStore(this.storageKeys.userlist);
        this.filterString = this.loadFromStore(this.storageKeys.filterString);
        this.loadFilterOptions();
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

    setCurrentUser(user) {
        this.currentUserId = user ? user?.id : null;
        this.saveToStore(this.storageKeys.currentUserId, this.currentUserId);
    }

    setAssignee(assignee) {
        this.filterOptions.assignee = assignee || null;
        this.saveFilterOptions();
    }

    setTasklist(tasklist) {
        LocalStorage.taskCollector = tasklist.map((task) => (task instanceof Task ? task?.info : task));
        this.saveToStore(this.storageKeys.tasklist, LocalStorage.taskCollector);
    }

    setUserlist(userlist) {
        LocalStorage.userCollector = userlist.map((user) => (user instanceof User ? user?.info : user));
        this.saveToStore(this.storageKeys.userlist, LocalStorage.userCollector);
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
        this.filterOptions.dateFrom = date === null ? null : new Date(date);
        this.saveFilterOptions();
    }

    setDateTo(date) {
        this.filterOptions.dateTo = date === null ? null : new Date(date);
        this.saveFilterOptions();
    }

    setToDefaults() {
        this.filterString = null;
        this.filterOptions = {
            assignee: null,
            status: new Set(),
            priority: new Set(),
            private: new Set(),
            dateFrom: null,
            dateTo: null,
        };
    }
}
