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

const headerView = new HeaderView('mount-point');
new MainSection('main-content')
    .appendIn('mount-point');
const taskFeedView = new TaskFeedView('main-content');
const filterView = new FilterView('mount-point');
const taskView = new TaskView('main-content');

// taskFeedView.display({ tasklist: fakeTasks, isTableView: true });

// let count = 0;
// const inserter = setInterval(() => {
//     if (fakeTasks.length - 1 < count) {
//         clearInterval(inserter);
//     } else {
//         taskFeedView.addTask(fakeTasks[count]);
//         count += 1;
//     }
// }, 120);

const oneTask = new Task(
    'Супердлинноеназваниетаскипридуманноемеганеординарррнымразработчикомэтогомира!',
    'Неменееизощренноеописаниевсехдеталейработынадпоставленнойтаскойотширокодушевноготаскгивера!',
    'Константина Гон',
    'Complete',
    'Medium',
    false,
);

// setTimeout(() => {
//     taskFeedView.display({ tasklist: fakeTasks });
// }, 5100);

const task = new Task(
    'Супердлинноеназваниетаскипридуманноемеганеординарррнымразработчикомэтогомира!',
    'Неменееизощренноеописаниевсехдеталейработынадпоставленнойтаскойотширокодушевноготаскгивера!',
    ' ',
    'Complete',
    'Medium',
    false,
);

// Task.validate(task);

// console.log(filterTasks(fakeTasks, { assignee: 'Константина Гон', wrongOpt: true }));

const taskCollection = new TaskCollector(fakeTasks);

const filterOpt = {
    // dateTo: '2020-01-01 00:00',
    // dateFrom: '2021',
    // assignee: 'Карэнт Йусер',
    // status: ['Complete'],
    priority: ['Low'],
    // isPrivate: [],
};

filterView.display({ avaliableUsers: fakeUsers, filterOpt });

const withFilters = taskCollection.getPage(0, 30, filterOpt);

taskFeedView.display({ tasklist: withFilters });

// console.log(taskCollection.getPage(5, 5, filterOpt));

setTimeout(() => {
    headerView.display({ user: 'Карэнт Йусер' });
    filterView.clear();
    filterView.display({ avaliableUsers: fakeUsers, filterOpt });

    taskFeedView.clear();
    taskView.display({ task: fakeTasks[9], isAllow: false });
    taskView.display({ task: fakeTasks[7], isAllow: true });
}, 3000);
