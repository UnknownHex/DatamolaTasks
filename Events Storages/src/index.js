class App {
    constructor() {
        this.init();
        this.initListeners();
    }

    init() {
        this.taskCollection = new TaskCollector(fakeTasks);
        this.userCollection = new UserCollector(fakeUsers);
        this.storage = new LocalStorage(this.taskCollection, this.userCollection);

        this.headerView = new HeaderView('mount-point');

        this.mainSection = new MainSection('main-content');
        this.mainSection.appendIn('mount-point');

        this.taskFeedView = new TaskFeedView('main-content');

        this.filterBadge1 = new FilterBadge({ key: fieldKeys.priority.key, value: taskPriority.low });
        this.filterBadge1.appendIn('mount-point');
        this.filterBadge2 = new FilterBadge({ key: fieldKeys.priority.key, value: taskPriority.medium });
        this.filterBadge2.appendIn('mount-point');
        this.filterBadge3 = new FilterBadge({ key: fieldKeys.priority.key, value: taskPriority.high });
        this.filterBadge3.appendIn('mount-point');
        this.filterBadge4 = new FilterBadge({ key: fieldKeys.status.key, value: taskStatus.toDo });
        this.filterBadge4.appendIn('mount-point');
        this.filterBadge5 = new FilterBadge({ key: fieldKeys.status.key, value: taskStatus.inProgress });
        this.filterBadge5.appendIn('mount-point');

        this.filterView = new FilterView('mount-point');
        this.taskView = new TaskView('main-content');

        this.notificationView = new NotificationView('mount-point');
    }

    initListeners() {
        const main = document.querySelector('#mount-point');

        main.addEventListener(customEvents.showFilters.caption, this.showFilter.bind(this));
        main.addEventListener(customEvents.getSelectParam.caption, this.changeInputParams.bind(this));
        main.addEventListener(customEvents.getFilterParam.caption, this.changeButtonParams.bind(this));
        main.addEventListener(customEvents.clearFilters.caption, this.clearFilters.bind(this));
        main.addEventListener(customEvents.confirmFilters.caption, this.confirmFilters.bind(this));
    }

    changeInputParams(e) {
        const paramName = e.detail.name;
        const paramValue = e.detail.value;
        console.log(paramName, ":", paramValue);

        switch (paramName) {
            case fieldKeys.assignee.key:
                const user = paramValue ? this.userCollection.get(paramValue) : null;
                this.storage.setAssignee(user?.name);
                break;
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
    }

    clearFilters() {
        this.storage.setToDefaults();
        this.storage.saveStoredData();
        this.showFilter();

        console.log(`\naction: ${customEvents.clearFilters.caption}`, this.storage.activeFilters);
    }

    confirmFilters() {
        console.log(this.storage.activeFilters);
        this.getFeed(0, 10, this.storage.activeFilters);

        console.log(`\naction: ${customEvents.confirmFilters.caption}`);
    }

    showTaskFeedPage(tasklist, currentUser) {
        this.mainSection.clear();
        this.taskFeedView.display({
            tasklist,
            currentUser,
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
        this.filterView.display({
            filterOpt: this.storage.activeFilters,
            avaliableUsers: this.storage.userCollector.userlist,
        });
        // console.log(this.storage.filterOptions);
        // console.log(this.storage.activeFilters);
    }

    setCurrentUser(user) {
        const tmpUser = this.taskCollection.user;

        this.taskCollection.user = user;

        if (tmpUser !== this.taskCollection.user) {
            this.headerView.display({ user: this.taskCollection.user });
            this.showTaskFeedPage(this.taskCollection.tasklist, this.taskCollection.user);

            this.storage.saveStoredData();

            this.taskCollection.user
                ? this.NotificationView.createNotifly({
                    type: notiflyVariants.infoNoti,
                    message: notiflyMessages.info.greeting(this.taskCollection.user),
                })
                : this.NotificationView.createNotifly({
                    type: notiflyVariants.infoNoti,
                    message: notiflyMessages.info.bye(tmpUser),
                });
        }
    }

    addTask(task) {
        if (!this.taskCollection.user) return;

        const isAdded = this.taskCollection.add(
            task.name,
            task.description,
            task.assignee,
            task.status,
            task.priority,
            task.isPrivate,
        );

        if (isAdded) {
            this.showTaskFeedPage(this.taskCollection.tasklist, this.taskCollection.user);

            this.NotificationView.createNotifly({
                type: notiflyVariants.succNoti,
                message: notiflyMessages.success.taskAdded(task.name, this.taskCollection.user),
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
            this.showTaskFeedPage(this.taskCollection.tasklist, this.taskCollection.user);

            this.NotificationView.createNotifly({
                type: notiflyVariants.succNoti,
                message: notiflyMessages.success.taskUpdated(id, this.taskCollection.user),
            });
        }
    }

    removeTask(id) {
        const isRemoved = this.taskCollection.remove(id);

        if (isRemoved) {
            this.showTaskFeedPage(this.taskCollection.tasklist, this.taskCollection.user);

            this.NotificationView.createNotifly({
                type: notiflyVariants.succNoti,
                message: notiflyMessages.success.taskRemoved(id, this.taskCollection.user),
            });
        }
    }

    getFeed(skip, top, filterConfig) {
        const filteredTasks = this.taskCollection.getPage(skip, top, filterConfig);
        console.log(filterConfig);
        this.showTaskFeedPage(filteredTasks, this.taskCollection.user);

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

// setCurrentUser(user: string) - добавляет текущего пользователя в хидер и в модель.

const filterOpt = {
    // dateTo: '2020-01-01 00:00',
    // dateFrom: '2021',
    assignee: 'Карэнт Йусер',
    // status: ['Complete'],
    priority: [taskPriority.low, taskPriority.medium],
    // isPrivate: [],
};

//
//
//
//
//
//
//
//

const inValidTask = {
    name: 'Супердлинноеназваниетаскипридуманноемеганеординарррнымразработчикомэтогомира!',
    description: 'Неменееизощренноеописаниевсехдеталейработынадпоставленнойтаскойотширокодушевноготаскгивера!',
    assignee: 123,
    status: 'Complete',
    priority: 'Medium',
    isPrivate: '',
};

// let taskId = '';

// setTimeout(() => {
//     console.log('"Константина Гон" signed up;');
//     setCurrentUser('Константина Гон');
// }, 100);

// setTimeout(() => {
//     addTask(oneTask);
//     taskId = taskCollection.tasklist[0].id;
// }, 1100);

// setTimeout(() => {
//     taskCollection.addAll([fakeTasks[22], fakeTasks[8], fakeTasks[9]]);
//     console.log('\n"Константина Гон" edit her task;');
//     editTask(taskId, editOneTask);
// }, 2100);

// setTimeout(() => {
//     console.log('\n"Инна Катеринина" logged in;');
//     setCurrentUser('Инна Катеринина');
// }, 3100);

// setTimeout(() => {
//     console.log('\n"Инна Катеринина" try to edit task with wrong params;');
//     editTask(taskId, inValidTask);
//     console.log('\n"Инна Катеринина" edit with valid params;');
//     editTask(taskId, oneTask);
// }, 4100);

// setTimeout(() => {
//     console.log('\n"Константина Гон" returned to system;');
//     setCurrentUser('Константина Гон');
// }, 5100);

// setTimeout(() => {
//     console.log('\n"Константина Гон" try to delete task;');
//     removeTask(taskId);
// }, 6100);

// setTimeout(() => {
//     console.log('\n"Константина Гон" try to delete task with wrong ID;');
//     removeTask(taskId);
// }, 7100);

// setTimeout(() => {
//     console.log('\n"Константина Гон" try to delete task by "Инна Катеринина" owner;');
//     removeTask(fakeTasks[8].id);
// }, 8100);

// setTimeout(() => {
//     console.log('\nLoad all tasks...');
//     taskCollection.addAll(fakeTasks);
// }, 9100);

// setTimeout(() => {
//     console.log('\n"Константина Гон" apply filters;');
//     console.log('Get first 10 tasks;');
//     getFeed();
//     console.log('Get from 10 to 25;');
//     getFeed(10, 15);
//     filterView.display({
//         filterOpt,
//         avaliableUsers: fakeTasks,
//     });
// }, 10300);

// setTimeout(() => {
//     console.log('\n"Константина Гон" apply filters;');
//     console.log('Get only [med, low] priority tasks;');
//     getFeed(0, 30, filterOpt);
// }, 11300);

// setTimeout(() => {
//     // filterView.clear();
//     filterOpt.priority = taskPriority.high;
//     filterView.display({
//         filterOpt,
//         avaliableUsers: fakeTasks,
//     });
//     console.log('Get only [high] priority tasks;');
// }, 12300);

// setTimeout(() => {
//     getFeed(0, 30, filterOpt);
// }, 13300);

// setTimeout(() => {
//     filterView.clear();
//     console.log(`\n"Константина Гон" go to task page with ID ${fakeTasks[8].id};`);
//     showTask(fakeTasks[8].id);
// }, 14300);

// setTimeout(() => {
//     const rUUID = crypto.randomUUID();
//     console.log(`\n"Константина Гон" go to task page with unavaliable ID: ${rUUID};`);
//     showTask(rUUID);
// }, 15300);

// setTimeout(() => {
//     console.log('\n"Константина Гон" logged our;');
//     setCurrentUser(null);
// }, 16300);
