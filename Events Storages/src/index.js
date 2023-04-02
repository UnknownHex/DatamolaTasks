class App {
    constructor() {
        this.init();
        this.initListeners();

        this.test();
    }

    createBlur() {
        const blur = new Blur();
        this.appContainer.style = 'max-height: 100vh; overflow: hidden;';
        this.appContainer.appendChild(blur.node);

        blur.node.addEventListener('mousedown', (event) => {
            event.target.classList.contains(styles.blurWrapper) && this.clearBlur(blur.node);
        });

        blur.node.addEventListener(customEvents.closeModal.caption, this.clearBlur.bind(this, blur.node));

        return blur.node;
    }

    clearBlur(node) {
        this.appContainer.removeAttribute('style');
        node.remove();
    }

    test() {
        this.mainSection.clear();
        const registrationView = new RegistrationView('main-content');
    }

    init() {
        this.appContainer = document.querySelector('#mount-point');

        this.storage = new LocalStorage();

        this.taskCollection = new TaskCollector(this.storage.taskCollector);
        this.userCollection = new UserCollector(this.storage.userCollector);

        this.headerView = new HeaderView(this.appContainer.id);

        this.mainSection = new MainSection('main-content');
        this.mainSection.appendIn(this.appContainer.id);

        this.taskFeedView = new TaskFeedView('main-content');

        this.filterView = new FilterView(this.appContainer.id);
        this.taskView = new TaskView(this.appContainer.id);

        this.notificationView = new NotificationView(this.appContainer.id);

        this.footer = new FooterView(this.appContainer.id);

        // uncomment next 2 lines for the first start or add users and tasks manually...
        //
        // this.storage.saveToStore(this.storage.storageKeys.tasklist, fakeTasks);
        // this.storage.saveToStore(this.storage.storageKeys.userlist, fakeUsers);
        this.getFeed(0, this.taskCollection.tasklist.length, this.storage.activeFilters);

        if (this.storage.currentUserId) {
            const user = this.userCollection.get(this.storage.currentUserId);
            this.setCurrentUser(user || null);
        }
    }

    initListeners() {
        this.appContainer.addEventListener(customEvents.showFilters.caption, this.showFilter.bind(this));
        this.appContainer.addEventListener(customEvents.getSelectParam.caption, this.changeInputParams.bind(this));
        this.appContainer.addEventListener(customEvents.getFilterParam.caption, this.changeButtonParams.bind(this));
        this.appContainer.addEventListener(customEvents.clearFilters.caption, this.clearFilters.bind(this));
        this.appContainer.addEventListener(customEvents.confirmFilters.caption, this.confirmFilters.bind(this));
        this.appContainer.addEventListener(customEvents.cancelFilterParam.caption, this.cancelFilterParam.bind(this));
        this.appContainer.addEventListener(customEvents.loginUser.caption, this.loginUser.bind(this));
        this.appContainer.addEventListener(customEvents.logoutUser.caption, this.logoutUser.bind(this));
        this.appContainer.addEventListener(customEvents.showModal.caption, this.showAuthorization.bind(this));
        this.appContainer.addEventListener(customEvents.registerUser.caption, this.registerUser.bind(this));
    }

    showAuthorization() {
        const blur = this.createBlur();
        const authorizationView = new AuthorizationView(this.appContainer.id);

        blur.appendChild(authorizationView.authForm);
    }

    loginUser(event) {
        const { login, password } = event.detail;

        const [user] = this.userCollection.userlist.filter((userEnt) => (
            userEnt.login.toLowerCase() === login.input.value?.toLowerCase()
        ));

        const isPassCorrect = user?.password === password.input.value;
        if (!user || !isPassCorrect) {
            NotificationView.createNotifly({
                message: 'Wrong login or password...',
                type: notiflyVariants.errNoti,
            });

            const blink = (e) => {
                e.target.parentNode.classList.remove(styles.wrong);
                e.target.parentNode.removeEventListener('animationend', blink);
            };

            login.node.addEventListener('animationend', blink);
            login.node.classList.add(styles.wrong);

            password.node.addEventListener('animationend', blink);
            password.node.classList.add(styles.wrong);

            return;
        }

        this.setCurrentUser(user);
        event.target.dispatchEvent(customEvents.closeModal.action);
    }

    registerUser(event) {
        // { login, name, pass, confirm, img, imgBlob }
        const {
            login,
            name,
            pass,
            confirm,
            img,
            imgBlob,
        } = event.detail;

        const loginFreeRequest = isLoginFree(login.input.value, this.userCollection.userlist);
        const loginValidRequest = isLoginValid(login.input.value);
        const passRequest = isPassConfirmed(pass.input.value, confirm.input.value);

        const isOk = { continue: true };

        if (loginFreeRequest.status >= 400) {
            NotificationView.createNotifly({ message: loginFreeRequest.err.message, type: notiflyVariants.errNoti });
            isOk.continue = false;
            login.blink();
        }

        if (loginValidRequest.status >= 400) {
            NotificationView.createNotifly({ message: loginValidRequest.err.message, type: notiflyVariants.errNoti });
            isOk.continue = false;
            login.blink();
        }

        if (passRequest.status >= 400) {
            NotificationView.createNotifly({ message: passRequest.err.message, type: notiflyVariants.errNoti });
            isOk.continue = false;
            pass.blink();
            confirm.blink();
        }

        const userData = {
            login: login.input.value,
            pass: pass.input.value,
            name: name.input.value,
            img,
        };

        isOk.continue && this.addUser(userData);
    }

    logoutUser() {
        console.log('LOGOUT user;');
        this.setCurrentUser(null);
    }

    cancelFilterParam({ target }) {
        const { key, value } = target.dataset;

        switch (key) {
        case fieldKeys.assignee.key: {
            this.storage.setAssignee(null);
            break;
        }
        case fieldKeys.dateFrom.key:
            this.storage.setDateFrom(null);
            break;
        case fieldKeys.dateTo.key:
            this.storage.setDateTo(null);
            break;
        case fieldKeys.status.key:
            this.storage.setStatus(value);
            break;
        case fieldKeys.priority.key:
            this.storage.setPriority(value);
            break;
        case fieldKeys.isPrivate.key:
            this.storage.setPrivate(value === 'true');
            break;
        default:
            break;
        }

        console.log(this.storage.activeFilters);
        this.getFeed(0, 10, this.storage.activeFilters);

        // this.showTaskFeedPage({
        //     tasklist: this.taskCollection.tasklist,
        //     currentUser: this.taskCollection.user,
        //     activeFilters: this.storage.activeFilters,
        // });
    }

    changeInputParams(e) {
        const paramName = e.detail.name;
        const paramValue = e.detail.value;
        console.log(paramName, ':', paramValue);

        switch (paramName) {
        case fieldKeys.assignee.key: {
            const user = paramValue ? this.userCollection.get(paramValue) : null;
            this.storage.setAssignee(user?.name);
            break;
        }
        case fieldKeys.dateFrom.key:
            console.log('save date:', paramValue, new Date(paramValue));
            this.storage.setDateFrom(paramValue);
            break;
        case fieldKeys.dateTo.key:
            console.log('save date:', paramValue, new Date(paramValue));
            this.storage.setDateTo(paramValue);
            break;
        default:
            break;
        }

        console.log(`\naction: ${customEvents.getSelectParam.caption}`, this.storage.activeFilters);
    }

    changeButtonParams(e) {
        const paramName = e.detail.name;
        const paramValue = e.detail.dataset.data;

        if (paramName) {
            e.stopPropagation();
        }

        switch (paramName) {
        case fieldKeys.assignee.key:
            this.storage.setAssignee(paramValue);
            break;
        case fieldKeys.isPrivate.key:
            this.storage.setPrivate(!!paramValue);
            break;
        case fieldKeys.priority.key:
            this.storage.setPriority(paramValue);
            break;
        case fieldKeys.status.key:
            this.storage.setStatus(paramValue);
            break;
        default:
            break;
        }

        console.log(`\naction: ${customEvents.getFilterParam.caption}`, this.storage.activeFilters);
        console.log(e.detail);
    }

    clearFilters() {
        this.storage.setToDefaults();
        this.storage.saveStoredData();
        this.filterView.display({
            filterOpt: this.storage.activeFilters,
            avaliableUsers: this.storage.userCollector,
        });

        console.log(`\naction: ${customEvents.clearFilters.caption}`, this.storage.activeFilters);
    }

    confirmFilters() {
        console.log(this.storage.activeFilters);
        this.getFeed(0, 10, this.storage.activeFilters);

        console.log(`\naction: ${customEvents.confirmFilters.caption}`);
    }

    showTaskFeedPage({ tasklist, currentUser, activeFilters }) {
        this.mainSection.clear();
        this.taskFeedView.display({
            tasklist,
            currentUser,
            filterOpt: activeFilters,
        });
    }

    showTaskPage(task, currentUser) {
        this.mainSection.clear();
        this.taskView.display({
            task,
            currentUser,
        });
    }

    showFilter() {
        console.log('In storage:', this.storage.activeFilters);
        this.filterView.display({
            filterOpt: this.storage.activeFilters,
            avaliableUsers: this.userCollection.userlist,
        });

        // console.log(this.storage.filterOptions);
        // console.log(this.storage.activeFilters);
    }

    setCurrentUser(user) {
        const tmpUser = this.userCollection.user;
        console.log(user);

        this.userCollection.user = user?.name || null;
        if (tmpUser !== this.userCollection.user) {
            this.headerView.display(user);
            console.log(user);
            this.showTaskFeedPage({
                tasklist: this.taskCollection.tasklist,
                currentUser: this.userCollection.user,
            });

            this.storage.setToDefaults();
            this.storage.setCurrentUser(user);
            this.storage.saveFilterOptions();

            this.userCollection.user
                ? NotificationView.createNotifly({
                    type: notiflyVariants.infoNoti,
                    message: notiflyMessages.info.greeting(this.userCollection.user),
                })
                : NotificationView.createNotifly({
                    type: notiflyVariants.infoNoti,
                    message: notiflyMessages.info.bye(tmpUser),
                });
        }
    }

    addUser({ login, name, pass, img }) {
        const isRegistered = this.userCollection.add(name, login, pass, img);

        console.log(isRegistered);

        if (isRegistered) {
            NotificationView.createNotifly({
                type: notiflyVariants.succNoti,
                message: notiflyMessages.success.userAdded,
            });

            console.log(notiflyMessages.success.userAdded);
        }

        console.log(this.userCollection.userlist);
    }

    addTask(task) {
        if (!this.userCollection.user) return;

        const isAdded = this.taskCollection.add(
            task.name,
            task.description,
            task.assignee,
            task.status,
            task.priority,
            task.isPrivate,
        );

        if (isAdded) {
            this.showTaskFeedPage({
                tasklist: this.taskCollection.tasklist,
                currentUser: this.userCollection.user,
                activeFilters: this.storage.activeFilters,
            });

            this.NotificationView.createNotifly({
                type: notiflyVariants.succNoti,
                message: notiflyMessages.success.taskAdded(task.name, this.userCollection.user),
            });
        }
    }

    editTask(id, task) {
        const isEdited = this.taskCollection.edit(
            id,
            task.name,
            task.description,
            task.assignee,
            task.status,
            task.priority,
            task.isPrivate,
        );

        if (isEdited) {
            this.showTaskFeedPage({
                tasklist: this.taskCollection.tasklist,
                currentUser: this.taskCollection.user,
                activeFilters: this.storage.activeFilters,
            });

            this.NotificationView.createNotifly({
                type: notiflyVariants.succNoti,
                message: notiflyMessages.success.taskUpdated(id, this.taskCollection.user),
            });
        }
    }

    removeTask(id) {
        const isRemoved = this.taskCollection.remove(id);

        if (isRemoved) {
            this.showTaskFeedPage({
                tasklist: this.taskCollection.tasklist,
                currentUser: this.taskCollection.user,
                activeFilters: this.storage.activeFilters,
            });

            this.NotificationView.createNotifly({
                type: notiflyVariants.succNoti,
                message: notiflyMessages.success.taskRemoved(id, this.taskCollection.user),
            });
        }
    }

    getFeed(skip, top, filterConfig) {
        const filteredTasks = this.taskCollection.getPage(skip, top, filterConfig);

        this.showTaskFeedPage({
            tasklist: filteredTasks,
            currentUser: this.userCollection.user,
            activeFilters: this.storage.activeFilters,
        });

        console.log(filteredTasks); // Need only for testlog in console!
    }

    showTask(id) {
        const foundTask = this.taskCollection.get(id);

        foundTask && this.showTaskPage(foundTask, this.taskCollection.user);
    }
}

const app = new App();

const oneTask = {
    name: 'Супердлинноеназваниетаскипридуманноемеганеординарррнымразработчикомэтогомира!',
    description: 'Неменееизощренноеописаниевсехдеталейработынадпоставленнойтаскойотширокодушевноготаскгивера!',
    assignee: 'Константина Гон',
    status: 'Complete',
    priority: 'Medium',
    isPrivate: false,
};

const editOneTask = {
    name: 'Супер-длинное название таски, придуманное меганеординарррным разработчиком этого мира!',
    description: 'Не менее изощренное описание всех деталей работы над поставленной таской от широкодушевного таскгивера!',
    assignee: 'Инна Катеринина',
    status: taskStatus.inProgress,
    priority: taskPriority.high,
    isPrivate: true,
};
