class App {
    constructor() {
        this.state = {
            isTableView: false,
            isTasksLoading: true,
        };

        this.init();
        this.initListeners();
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
        this.profileView = new ProfileView('main-content');
        console.log('user', LocalStorage.tmpData.users[0]);
        this.profileView.display(LocalStorage.tmpData.users[0]);
    }

    async init() {
        this.appContainer = document.querySelector('#mount-point');

        this.storage = new LocalStorage();
        this.apiService = new APIService(API.address);
        await this.apiService.init();

        this.notificationView = new NotificationView(this.appContainer.id);

        this.headerView = new HeaderView(this.appContainer.id);

        this.mainSection = new MainSection('main-content');
        this.mainSection.appendIn(this.appContainer.id);

        this.taskFeedView = new TaskFeedView('main-content');

        this.filterView = new FilterView(this.appContainer.id);

        this.footer = new FooterView(this.appContainer.id);

        this.storage.loadStoredData();

        if (this.storage.currentUserId) {
            // TODO: waiting animation
            const user = LocalStorage.findUser(fieldKeys.id.key, this.storage.currentUserId) || null;
            const token = user ? this.storage.loadToken() : null;
            // console.log(user, token);
            this.setCurrentUser(user, token);
        }

        this.test();

        // this.showTaskFeedPage();
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

    async addCommentHandler(event) {
        const { text, taskId } = event.detail.data;

        const response = await this.apiService.postComment({ taskId, text });

        if (!response.ok) {
            const [message] = response.json.message;

            NotificationView.createNotifly({
                type: notiflyVariants.errNoti,
                message,
            });

            return;
        }
        const taskResponse = await this.apiService.getTaskById(taskId);

        if (taskResponse.ok) {
            this.showTaskPage(taskResponse.json);
        }
    }

    changeView() {
        this.state.isTableView = !this.state.isTableView;
        this.taskFeedView.changeView(this.state.isTableView);
    }

    inLoading(isLoading) {
        this.state.isTasksLoading = isLoading;
        this.taskFeedView.showLoading(this.state.isTasksLoading);
    }

    async openTaskPage(event) {
        if (!this.storage.currentUserId) {
            NotificationView.createNotifly({
                type: notiflyVariants.warnNoty,
                message: notiflyMessages.warn.requiredRegistration,
            });
            return;
        }
        const id = event.detail;
        const response = await this.apiService.getTaskById(id);

        if (!response.ok) {
            NotificationView.createNotifly({
                type: notiflyVariants.errNoti,
                message: response.json.message,
            });
        }

        if (response.ok) {
            const task = response.json;
            this.showTaskPage(task);
        }
    }

    async deleteTaskHandler(event) {
        const id = event.detail;

        const isOk = window.confirm(`Are you really want to delete task ${id}?`);

        if (!isOk) return;
        this.inLoading(true);

        const response = await this.apiService.deleteTask(id);

        if (response.ok) {
            const remover = LocalStorage.findUser(fieldKeys.id.key, this.storage.currentUserId);

            this.showTaskFeedPage();

            NotificationView.createNotifly({
                type: notiflyVariants.succNoti,
                message: notiflyMessages.success.taskRemoved(id, remover.userName),
            });
        } else {
            NotificationView.createNotifly({
                type: notiflyVariants.errNoti,
                message: response.json.message,
            });
        }
    }

    async editTaskHandler(event) {
        this.inLoading(true);
        const { id } = event.detail;
        const editableData = {
            name: event.detail.name.input.value,
            description: event.detail.description.value,
            assignee: event.detail.assignee,
            status: event.detail.options.status,
            isPrivate: !!event.detail.options.isPrivate,
            priority: event.detail.options.priority,
        };

        const response = await this.apiService.editTask(id, editableData);

        if (response.ok) {
            const editor = LocalStorage.findUser(fieldKeys.id.key, this.storage.currentUserId);

            NotificationView.createNotifly({
                type: notiflyVariants.succNoti,
                message: notiflyMessages.success.taskUpdated(id, editor.userName),
            });

            this.showTaskFeedPage();
        } else {
            NotificationView.createNotifly({
                type: notiflyVariants.errNoti,
                message: response.json.message,
            });
        }
    }

    async addTaskHandler(event) {
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

        const response = await this.apiService.createTask(preTaskInst);

        if (response.ok) {
            const creator = LocalStorage.findUser(fieldKeys.id.key, this.storage.currentUserId);
            NotificationView.createNotifly({
                type: notiflyVariants.succNoti,
                message: notiflyMessages.success.taskAdded(name, creator.userName),
            });
        }
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
        const user = LocalStorage.findUser(fieldKeys.login.key, login.input.value);

        this.setCurrentUser(user, response.json.token);
        event.target.dispatchEvent(customEvents.closeModal.action);
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
            photo: btoa(img),
        };

        if (!isOk.continue) return;

        const response = await this.apiService.register(userData);

        if (!response.ok) {
            response.json.message.forEach((msg) => {
                NotificationView.createNotifly({
                    type: notiflyVariants.errNoti,
                    message: msg,
                });
            });
        }

        if (response.ok) {
            NotificationView.createNotifly({
                type: notiflyVariants.succNoti,
                message: notiflyMessages.success.userAdded,
            });
            this.showTaskFeedPage();
        }
    }

    logoutUser() {
        this.setCurrentUser(null, null);
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

        // this.showTaskFeedPage();
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
        // this.showTaskFeedPage();
    }

    async showTaskFeedPage() {
        this.inLoading(true);
        await this.apiService.getAllTasks();
        // const tasks3 = this.getFeed(0, 10, this.storage.activeFilters);
        this.mainSection.clear();
        const currentUser = await this.getCurrentUser();
        this.taskFeedView.display({
            isTasksLoading: this.state.isTasksLoading,
            tasklist: LocalStorage.tmpData.tasks,
            currentUser,
            filterOpt: this.storage.activeFilters,
            isTableView: this.state.isTableView,
        });
        this.inLoading(false);
    }

    async showTaskPage(task) {
        this.mainSection.clear();
        // Get task from api
        const taskView = new TaskView('main-content');
        const currentUser = await this.getCurrentUser();
        taskView.display({
            task,
            currentUser,
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

        this.apiService.getAllUsers()
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
        console.log(event.detail);
        const id = event.detail;
        const response = id ? await this.apiService.getTaskById(id) : null;
        const blur = this.createBlur();

        if (response?.ok || !id) {
            const taskModalView = new TaskModalView(this.appContainer.id, {
                task: response?.json,
            });
            blur.appendChild(taskModalView.addTaskForm);
        }
    }

    async setCurrentUser(user, token) {
        console.log('setCurrentUser:', user);
        const tmpUser = LocalStorage.findUser(fieldKeys.id.key, this.storage.currentUserId);

        this.apiService.token = token || null;

        this.headerView.display(user);
        // this.showTaskFeedPage();

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
                message: notiflyMessages.info.bye(tmpUser.userName),
            });
    }

    async getCurrentUser() {
        if (!this.storage.currentUserId) return;
        // const currentUser = LocalStorage.findUser(fieldKeys.id.key, this.storage.currentUserId);
        const response = await this.apiService.getMyProfile();

        if (!response.ok) {
            NotificationView.createNotifly({
                type: notiflyVariants.errNoti,
                message: response.message,
            });
        }

        const currentUser = response.json;
        console.log(currentUser);

        return currentUser;
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
