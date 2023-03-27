class App {
    constructor() {
        this.init();
    }

    init() {
        this.taskCollection = new TaskCollector([]);
        this.storage = new LocalStorage(this.taskCollection);

        this.headerView = new HeaderView('mount-point');

        this.mainSection = new MainSection('main-content');
        this.mainSection.appendIn('mount-point');

        this.taskFeedView = new TaskFeedView('main-content');

        this.filterView = new FilterView('mount-point');
        this.taskView = new TaskView('main-content');

        this.notificationView = new NotificationView('mount-point');
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

    }

    setCurrentUser(user) {
        const tmpUser = this.taskCollection.user;

        this.taskCollection.user = user;

        if (tmpUser !== this.taskCollection.user) {
            this.headerView.display({ user: this.taskCollection.user });
            this.showTaskFeedPage(this.taskCollection.tasklist, this.taskCollection.user);

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
