class App {
    constructor() {
        this.state = {
            isTableView: false,
        };

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
    
    }

    async init() {
        this.appContainer = document.querySelector('#mount-point');

        this.storage = new LocalStorage();
        this.apiService = new APIService(API.address);

        this.notificationView = new NotificationView(this.appContainer.id);

        this.headerView = new HeaderView(this.appContainer.id);

        this.mainSection = new MainSection('main-content');
        this.mainSection.appendIn(this.appContainer.id);

        this.taskFeedView = new TaskFeedView('main-content');

        if (this.storage.currentUserId) {
            const user = this.userCollection.get(this.storage.currentUserId);
            this.setCurrentUser(user || null);
        }

        this.filterView = new FilterView(this.appContainer.id);

        this.footer = new FooterView(this.appContainer.id);

        this.storage.loadStoredData();
        const user = await this.findUser('id', this.storage.currentUserId) || null;
        if (this.storage.currentUserId) {
            // TODO: waiting animation
            const token = user ? this.storage.loadToken() : null;
            this.setCurrentUser(user, token);
        }
        this.showTaskFeedPage();
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
        this.appContainer.addEventListener(customEvents.registerUser.caption, this.registerUserHandler.bind(this));
        this.appContainer.addEventListener(customEvents.showRegistration.caption, this.showRegistration.bind(this));
        this.appContainer.addEventListener(customEvents.showTaskFeed.caption, this.showTaskFeedPage.bind(this));
        this.appContainer.addEventListener(customEvents.addTask.caption, this.addTaskHandler.bind(this));
        this.appContainer.addEventListener(customEvents.editTask.caption, this.editTaskHandler.bind(this));
        this.appContainer.addEventListener(customEvents.showTaskModal.caption, this.showTaskModal.bind(this));
        this.appContainer.addEventListener(customEvents.deleteTask.caption, this.deleteTaskHandler.bind(this));
        this.appContainer.addEventListener(customEvents.showTaskPage.caption, this.openTaskPage.bind(this));
        this.appContainer.addEventListener(customEvents.changeTaskfeedView.caption, this.changeView.bind(this));
        this.appContainer.addEventListener(customEvents.addComment.caption, this.addCommentHandler.bind(this));
    }

    addCommentHandler(event) {
        const { text, taskId } = event.detail.data;

        this.showTaskPage(task);
    }

    changeView() {
        this.state.isTableView = !this.state.isTableView;
        this.taskFeedView.changeView(this.state.isTableView);
    }

    openTaskPage(event) {
        if (!this.storage.currentUserId) {
            NotificationView.createNotifly({
                type: notiflyVariants.warnNoty,
                message: notiflyMessages.warn.requiredRegistration,
            });
            return;
        }

        console.log(event.detail);

        // this.showTaskPage(task);
    }

    deleteTaskHandler(event) {
        const id = event.detail;

        const isOk = window.confirm(`Are you really want to delete task ${id}?`);
    }

    editTaskHandler(event) {
        // event.detail.id
        // {
        //     name: event.detail.name.input.value,
        //     description: event.detail.description.value,
        //     assignee: event.detail.assignee,
        //     status: event.detail.options.status,
        //     isPrivate: !!event.detail.options.isPrivate,
        //     priority: event.detail.options.priority,
        // },
    }

    addTaskHandler(event) {
        // name, description, assignee, options = detail
        const data = event.detail;
        const name = data.name.input.value;
        const description = data.description.value;
        const assignee = data?.assignee;
        const { options } = data;

        const preTaskInst = {
            name,
            description,
            assignee,
            isPrivate: options.isPrivate,
            priority: options.priority,
            status: options.status,
        };
    }

    showAuthorization() {
        const blur = this.createBlur();
        const authorizationView = new AuthorizationView(this.appContainer.id);

        blur.appendChild(authorizationView.authForm);
    }

    async loginUser(event) {
        const { login, password } = event.detail;
        const response = await this.apiService.authLogin({
            login: login.input.value,
            password: password.input.value,
        });

        if (!response.ok) {
            NotificationView.createNotifly({
                message: response.json.message,
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
        const user = await this.findUser('login', response.json.login);
        this.setCurrentUser(user, response.json.token);
    }

    async registerUserHandler(event) {
        // { login, name, pass, confirm, img, imgBlob }
        const {
            login,
            name,
            pass,
            confirm,
            img,
        } = event.detail;

        const loginValidRequest = isLoginValid(login.input.value);
        const passRequest = isPassConfirmed(pass.input.value, confirm.input.value);

        const isOk = { continue: true };

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
            userName: name.input.value,
            password: pass.input.value,
            retypedPassword: confirm.input.value,
            photo: 'btoa(img)',
        };

        if (!isOk.continue) return;

        const response = await this.apiService.register(userData);

        if (response.status >= 400) {
            response.json.message.forEach((msg) => {
                NotificationView.createNotifly({
                    type: notiflyVariants.errNoti,
                    message: msg,
                });
            });
        }

        response.status === 200 && this.showTaskFeedPage();
    }

    logoutUser() {
        this.setCurrentUser(null);
        this.storage.setToDefaults();
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

        this.showTaskFeedPage();
    }

    changeInputParams(e) {
        const paramName = e.detail.name;
        const paramValue = e.detail.value;

        switch (paramName) {
        case fieldKeys.assignee.key: {
            this.storage.setAssignee(paramValue);
            break;
        }
        case fieldKeys.dateFrom.key:
            this.storage.setDateFrom(paramValue);
            break;
        case fieldKeys.dateTo.key:
            this.storage.setDateTo(paramValue);
            break;
        default:
            break;
        }
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
    }

    clearFilters() {
        this.storage.setToDefaults();
        this.storage.saveStoredData();

        this.filterView.display({
            avaliableUsers: [], // get users from api
            filterOpt: this.storage.activeFilters,
        });
        // this.showTaskFeedPage();
    }

    confirmFilters() {
        this.showTaskFeedPage();
    }

    showTaskFeedPage(tasks, assignee) {
        // const tasks3 = this.getFeed(0, 10, this.storage.activeFilters);
        this.mainSection.clear();
        this.taskFeedView.display({
            tasklist: tasks || [],
            assignee,
            currentUser: this.getCurrentUser(),
            filterOpt: this.storage.activeFilters,
            isTableView: this.state.isTableView,
        });
    }

    showTaskPage(task) {
        this.mainSection.clear();
        // Get task from api
        const taskView = new TaskView('main-content');
        taskView.display({
            task,
            currentUser: this.getCurrentUser(),
        });
    }

    showFilter() {
        if (!this.storage.currentUserId) {
            NotificationView.createNotifly({
                type: notiflyVariants.warnNoty,
                message: notiflyMessages.warn.login,
            });
            return;
        }

        this.apiService.allUsers()
            .then((res) => {
                const blur = this.createBlur();
                const filter = this.filterView.display({
                    filterOpt: this.storage.activeFilters,
                    avaliableUsers: res.json,
                });

                blur.appendChild(filter);
            });
    }

    showRegistration() {
        this.mainSection.clear();
        const registrationView = new RegistrationView('main-content');
    }

    async showTaskModal(event) {
        if (!this.storage.currentUserId) {
            NotificationView.createNotifly({
                type: notiflyVariants.warnNoty,
                message: notiflyMessages.warn.login,
            });
            return;
        }
        const id = event.detail;
        const task = ''; // GET task from API by ID
        const blur = this.createBlur();

        const userlist = await this.apiService.allUsers();
        const assignee = userlist.json.find((user) => user.id === this.storage.currentUserId);

        const taskModalView = new TaskModalView(this.appContainer.id, {
            userlist: userlist.json,
            assignee,
            task,
        });
        blur.appendChild(taskModalView.addTaskForm);
    }

    async setCurrentUser(user, token) {
        this.apiService.token = token || null;

        this.headerView.display(user);
        this.showTaskFeedPage();

        this.storage.setToDefaults();
        this.storage.saveFilterOptions();
        this.storage.setCurrentUser(user, token);

        this.apiService.token
            ? NotificationView.createNotifly({
                type: notiflyVariants.infoNoti,
                message: notiflyMessages.info.greeting(user.userName),
            })
            : NotificationView.createNotifly({
                type: notiflyVariants.infoNoti,
                message: notiflyMessages.info.bye(LocalStorage.getUser(tmpUser).name),
            });
    }

    addUser({
        login, name, pass, img,
    }) {
        const isRegistered = ''; // REGISTER from API

        if (isRegistered) {
            NotificationView.createNotifly({
                type: notiflyVariants.succNoti,
                message: notiflyMessages.success.userAdded,
            });
        }
    }

    getCurrentUser() {
        if (!this.storage.currentUserId) return;
        const currentUser = ''; // Need to find user

        return currentUser;
    }

    async findUser(key, value) {
        const allUsers = await this.apiService.allUsers();

        if (allUsers.ok) {
            const user = await allUsers.json.find((inst) => inst[key] === value);
            console.log(user);
            return user;
        }

        NotificationView.createNotifly({
            type: notiflyVariants.errNoti,
            message: `Can't find user with ${key}: ${value}.`,
        });
    }

    addTask(task) {
        if (!this.storage.currentUserId) return;

        const isAdded = this.taskCollection.add(
            task.name,
            task.description,
            task.assignee,
            task.status,
            task.priority,
            task.isPrivate,
            this.storage.currentUserId,
        );

        if (isAdded) {
            this.showTaskFeedPage();

            NotificationView.createNotifly({
                type: notiflyVariants.succNoti,
                message: notiflyMessages.success.taskAdded(task.name, this.getCurrentUser().name),
            });
        }
    }

    editTask(id, task) {
        const isEdited = ''; // PATCH API
        // this.taskCollection.edit(
        //     id,
        //     task.name,
        //     task.description,
        //     task.assignee,
        //     task.status,
        //     task.priority,
        //     task.isPrivate,
        //     task.comments,
        // );

        if (isEdited) {
            this.showTaskFeedPage();

            // this.showTaskPage(LocalStorage.getTask(id));

            NotificationView.createNotifly({
                type: notiflyVariants.succNoti,
                message: notiflyMessages.success.taskUpdated(id, LocalStorage.getUser(this.userCollection.user).name),
            });
        }
    }

    removeTask(id) {
        const isRemoved = ''; // this.taskCollection.remove(id);   REMOVE WITH API

        if (isRemoved) {
            this.showTaskFeedPage();

            NotificationView.createNotifly({
                type: notiflyVariants.succNoti,
                message: notiflyMessages.success.taskRemoved(id, this.getCurrentUser().name),
            });
        }
    }

    getFeed(skip, top, filterConfig) {
        const filteredTasks = []; // GET TASKS THAN FILTER

        return filteredTasks;
        // console.log(filteredTasks); // Need only for testlog in console!
    }

    showTask(id) {
        const foundTask = this.taskCollection.get(id);

        foundTask && this.showTaskPage(foundTask);
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
