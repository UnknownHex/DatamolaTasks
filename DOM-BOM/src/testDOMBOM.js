const headerView = new HeaderView('main-mount-point');

setTimeout(() => {
    headerView.display({ user: 'Grenkaji Pania' });
}, 3000);

const taskFeedView = new TaskFeedView('main-mount-point');

let count = 0;
const inserter = setInterval(() => {
    if (fakeTasks.length - 1 < count) {
        clearInterval(inserter);
    } else {
        taskFeedView.addTask(fakeTasks[count]);
        count += 1;
    }
    // eslint-disable-next-line no-unused-expressions
}, 120);

const oneTask = {
    id: 'fgerg34',
    name: '!!!',
    description: '!',
    createdAt: new Date('2023-03-15T01:10:07'),
    assignee: 'Константина Гон',
    status: 'Complete',
    priority: 'Medium',
    isPrivate: false,
    comments: [],
};

setTimeout(() => {
    taskFeedView.updateTasks(fakeTasks);
}, 5000);
