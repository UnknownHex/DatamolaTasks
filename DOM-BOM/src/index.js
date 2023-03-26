// class App {
//     constructor() {
//         this.init();
//     }

//     init() {
//         const headerView = new HeaderView('main-mount-point');
//         const mainContent = new MainSection('main-content');
//         const taskFeedView = new TaskFeedView('main-content');
//         const filterView = new FilterView('main-mount-point');
//         const taskView = new TaskView('main-mount-point');
//     }
// }

const taskCollection = new TaskCollector([]);

const headerView = new HeaderView('mount-point');
const mainSection = new MainSection('main-content');
mainSection.appendIn('mount-point');
const taskFeedView = new TaskFeedView('main-content');
const filterView = new FilterView('mount-point');
const taskView = new TaskView('main-content');

const showTaskFeedPage = (tasklist, currentUser) => {
    mainSection.clear();
    taskFeedView.display({
        tasklist,
        currentUser,
    });
};

const showTaskPage = (task, currentUser) => {
    mainSection.clear();
    taskView.display({
        task,
        currentUser,
    });
};

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
const setCurrentUser = (user) => {
    taskCollection.user = user;
    headerView.display({ user: taskCollection.user });

    showTaskFeedPage(taskCollection.tasklist, taskCollection.user);
};

// addTask(task: Task) - добавляет новую таску в модель и перерисовывает доску с задачами.
const addTask = (task) => {
    const isAdded = taskCollection.add(
        task.name,
        task.description,
        task.assignee,
        task.status,
        task.priority,
        task.isPrivate,
    );

    isAdded && showTaskFeedPage(taskCollection.tasklist, taskCollection.user);
};

// editTask(id: string, task: Task) - редактирует таску в модели и перерисовывает доску с задачами.
const editTask = (id, task) => {
    const isEdited = taskCollection.edit(
        id,
        task.name,
        task.description,
        task.assignee,
        task.status,
        task.priority,
        task.isPrivate,
    );

    isEdited && showTaskFeedPage(taskCollection.tasklist, taskCollection.user);
};

// removeTask(id: string) - удаляет таску из модели и перерисовывает доску с задачами.
const removeTask = (id) => {
    const isRemoved = taskCollection.remove(id);

    isRemoved && showTaskFeedPage(taskCollection.tasklist, taskCollection.user);
};

// getFeed(skip?: number, top?: number, filterConfig?: Object)
//      - вызывает getPage с параметрами в модели и отображает соответствующую доску с задачами.
const getFeed = (skip, top, filterConfig) => {
    const filteredTasks = taskCollection.getPage(skip, top, filterConfig);

    showTaskFeedPage(filteredTasks, taskCollection.user);

    console.log(filteredTasks); // Need only for testlog in console!
};

// showTask(id: string) - получить таску по айди из модели и отобразить соответствующий TaskView.
const showTask = (id) => {
    const foundTask = taskCollection.get(id);

    foundTask && showTaskPage(foundTask, taskCollection.user);
};

const filterOpt = {
    // dateTo: '2020-01-01 00:00',
    // dateFrom: '2021',
    // assignee: 'Карэнт Йусер',
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

let taskId = '';

setTimeout(() => {
    addTask(oneTask);
    taskId = taskCollection.tasklist[0].id;
    taskCollection.addAll([fakeTasks[22], fakeTasks[8], fakeTasks[9]]);
}, 100);

setTimeout(() => {
    console.log('"Константина Гон" signed up;');
    setCurrentUser('Константина Гон');
}, 1100);

setTimeout(() => {
    console.log('\n"Константина Гон" edit her task;');
    editTask(taskId, editOneTask);
}, 2100);

setTimeout(() => {
    console.log('\n"Инна Катеринина" logged in;');
    setCurrentUser('Инна Катеринина');
}, 3100);

setTimeout(() => {
    console.log('\n"Инна Катеринина" try to edit task with wrong params;');
    editTask(taskId, inValidTask);
    console.log('\n"Инна Катеринина" edit with valid params;');
    editTask(taskId, oneTask);
}, 4100);

setTimeout(() => {
    console.log('\n"Константина Гон" returned to system;');
    setCurrentUser('Константина Гон');
}, 5100);

setTimeout(() => {
    console.log('\n"Константина Гон" try to delete task;');
    removeTask(taskId);
}, 6100);

setTimeout(() => {
    console.log('\n"Константина Гон" try to delete task with wrong ID;');
    removeTask(taskId);
}, 7100);

setTimeout(() => {
    console.log('\n"Константина Гон" try to delete task by "Инна Катеринина" owner;');
    removeTask(fakeTasks[8].id);
}, 8100);

setTimeout(() => {
    console.log('\nLoad all tasks...');
    taskCollection.addAll(fakeTasks);
}, 9100);

setTimeout(() => {
    console.log('\n"Константина Гон" apply filters;');
    console.log('Get first 10 tasks;');
    getFeed();
    console.log('Get from 10 to 25;');
    getFeed(10, 15);
}, 10300);

setTimeout(() => {
    filterView.display({
        filterOpt,
        avaliableUsers: fakeTasks,
    });
    console.log('\n"Константина Гон" apply filters;');
    console.log('Get only [med, low] priority tasks;');
    getFeed(0, 30, filterOpt);
}, 11300);

setTimeout(() => {
    filterView.clear();
    filterOpt.priority = taskPriority.high;
    filterView.display({
        filterOpt,
        avaliableUsers: fakeTasks,
    });
    console.log('Get only [high] priority tasks;');
    getFeed(0, 30, filterOpt);
}, 14300);

setTimeout(() => {
    filterView.clear();
    console.log(`\n"Константина Гон" go to task page with ID ${fakeTasks[8].id};`);
    showTask(fakeTasks[8].id);
}, 16300);

setTimeout(() => {
    const rUUID = crypto.randomUUID();
    console.log(`\n"Константина Гон" go to task page with unavaliable ID: ${rUUID};`);
    showTask(rUUID);
}, 18300);
