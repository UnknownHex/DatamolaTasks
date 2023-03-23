const headerView = new HeaderView('main-mount-point');
const taskFeedView = new TaskFeedView('main-mount-point');

setTimeout(() => {
    headerView.display({ user: 'Grenkaji Pania' });
}, 3000);

let count = 0;
const inserter = setInterval(() => {
    if (fakeTasks.length - 1 < count) {
        clearInterval(inserter);
    } else {
        taskFeedView.addTask(fakeTasks[count]);
        count += 1;
    }
}, 120);

const oneTask = new Task(
    'Супердлинноеназваниетаскипридуманноемеганеординарррнымразработчикомэтогомира!',
    'Неменееизощренноеописаниевсехдеталейработынадпоставленнойтаскойотширокодушевноготаскгивера!',
    'Константина Гон',
    'Complete',
    'Medium',
    false,
);

setTimeout(() => {
    taskFeedView.display({ task: oneTask });
}, 4000);

const task = new Task(
    'Супердлинноеназваниетаскипридуманноемеганеординарррнымразработчикомэтогомира!',
    'Неменееизощренноеописаниевсехдеталейработынадпоставленнойтаскойотширокодушевноготаскгивера!',
    ' ',
    'Complete',
    'Medium',
    false,
);

Task.validate(task);

console.log(filterTasks(fakeTasks, { assignee: 'Константина Гон', wrongOpt: true }));
