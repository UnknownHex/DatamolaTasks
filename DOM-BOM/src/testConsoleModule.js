/* eslint-disable no-multiple-empty-lines */
/* eslint-disable max-len */
/* eslint-disable quotes */
console.log('Let\'s start with create taskcollection instance:');
console.log('\tconst taskcollection = new TaskCollector(fakeTasks);');
const taskcollection = new TaskCollector(fakeTasks);
console.log(taskcollection.tasklist);

console.log('\n\nNow create task with VALID params:');
console.log('\ttaskcollection.add(...)');
const addValidTask = taskcollection.add(
    'Организовать пользователям доступ к файловым хранилищам',
    'Открыть на доступ все общие папки для пользователей.',
    'user',
    'To Do',
    'High',
    false,
);
console.log(addValidTask);

console.log('\n\nTry to create some tasks with INVALID params:');
console.log('\ttaskcollection.add(...)');
const invaddValidTask = taskcollection.add(
    '1',
    'Открыть на доступ все общие папки для пользователей.',
    '1',
    'frfrfr',
    'High',
    false,
);
console.log('...next:');
taskcollection.add(
    '',
    'Открыть на доступ все общие папки для пользователей.',
    '1',
    'To Do',
    'High',
    false,
);
console.log('...next:');
taskcollection.add(
    'Norm',
    '        ',
    '1',
    'Complete',
    'High',
    'false',
);
console.log(invaddValidTask);

console.log('\n\nThan we try to get task with ID "000010"');
console.log('\ttaskcollection.get(\'000010\')');
console.log(taskcollection.get('000010'));

console.log('\n\nAnd get task with wrong ID');
console.log('\ttaskcollection.get(\'\')');
console.log(taskcollection.get(''));
console.log('\ttaskcollection.get(\'unexisting-id\')');
console.log(taskcollection.get('unexisting-id'));

console.log('\n\nShow different pagination variants:');
console.log('\ttaskcollection.getPage(0, 10)');
console.log(taskcollection.getPage(0, 10));
console.log('\ttaskcollection.getPage(10, 10)');
console.log(taskcollection.getPage(10, 10));

console.log('\nPagination variants with filter:');
console.log('\ttaskcollection.getPage(0, 5, filterOpt) - low priority:');

const filterOpt = {
    // assignee: 'Тим',
    // dateFrom: new Date('2023-03-18T00:00:00'),
    // dateTo: new Date('2023-03-18T23:59:59'),
    // status: 'Complete',
    priority: 'Low',
    // isPrivate: false,
    // description: 'svg',
};

console.log(taskcollection.getPage(0, 5, filterOpt));

console.log('\n\nEdit task with id "000003":');
console.log('\ttaskcollection.edit(\'000003\', \'new name\', \'updated description\', \'new assignee\', \'In progress\', \'Low\')');
console.log('After edit:');
console.log(taskcollection.get('000003'));
console.log('Before:');
const editTask03 = taskcollection.edit('000003', 'new name', 'updated description', 'new assignee', 'In progress', 'Low');
console.log(taskcollection.get('000003'));
console.log(editTask03);

console.log('Edit with errors:');
console.log('\ttaskcollection.edit(\'000012\', \'    \', \'updated description\', \'new assignee\', \'In progress\', \'Low\')');
const editTask0WithErrors = taskcollection.edit('000012', '', 'updated description', 'new assignee', 'In progress', 'Low');
console.log('\ttaskcollection.edit(\'000012\', \'Новое имя\', \'updated description\', \'new assignee\', \'Прогрэсс!\', \'Low\')');
taskcollection.edit('000012', 'Новое имя', 'updated description', 'new assignee', 'Прогрэсс!', 'Low');
console.log('\ttaskcollection.edit(\'000012\', \' \', \' \', \'Не понимаю про это поле...\', \'To Do\', \'L1ow\')');
taskcollection.edit('000012', ' ', ' ', 'Не понимаю про это поле...', 'To Do', 'L1ow');
console.log('\ttaskcollection.edit(...) - if not current user:');
taskcollection.edit('000011', 'new name', 'description', 'Не понимаю про это поле...', 'To Do', 'Low');
console.log(editTask0WithErrors);

console.log('\n\nRemove task:');
console.log(`\ttaskcollection.remove('000012')`);
console.log('After:');
console.log(taskcollection.tasklist);
console.log('Before:');
console.log(taskcollection.remove('000012'));
console.log(taskcollection.tasklist);

console.log('\nTry to remove task if not owner:');
taskcollection.remove('000004');
console.log('\nTry to remove task with wrong ID:');
console.log(taskcollection.remove('0000dfsdfsdf04'));
console.log(taskcollection.tasklist);


console.log('\n\nCreate comment with VALID params:');
console.log(`\ttaskcollection.addComment('000003', 'My honest opinion about this task!');`);
console.log(taskcollection.addComment('000003', 'My honest opinion about this task!'));
console.log(taskcollection.get('000003').comments);


console.log('\nCreate comment with INVALID params:');
console.log(`\ttaskcollection.addComment('', 'My honest opinion about this task!');`);
console.log(taskcollection.addComment('', 'My honest opinion about this task!'));
console.log(`\ttaskcollection.addComment('000001', '');`);
console.log(taskcollection.addComment('000001', ''));

const differentTasks = [
    {
        name: 'INVALID TASK 1',
        description: 'TASK DESCRIPTION...',
        createdAt: new Date(),
        assignee: 'TASK CREATOR',
        status: 'To Do',
        priority: 'High',
        isPrivate: false,
        comments: [],
    },
    {
        id: crypto.randomUUID(),
        name: 'INVALID TASK 2',
        description: 'TASK DESCRIPTION...',
        createdAt: new Date(),
        assignee: ' ',
        status: 'Complete',
        priority: 'Low',
        isPrivate: false,
        comments: [{
            id: '839200',
            text: 'TASK COMMENT...',
            createdAt: new Date(),
            author: 'Карэнт Йусер',
        }],
    },
    {
        id: crypto.randomUUID(),
        name: 'VALID TASK 1',
        description: 'TASK DESCRIPTION...',
        createdAt: new Date(),
        assignee: 'TASK CREATOR',
        status: 'To Do',
        priority: 'Low',
        isPrivate: false,
        comments: [],
    },
    {
        id: crypto.randomUUID(),
        name: 'INVALID TASK 3',
        description: 'TASK DESCRIPTION...',
        createdAt: new Date(),
        assignee: 'TASK CREATOR',
        status: ' ',
        priority: 'Low',
        isPrivate: false,
        comments: [],
    },
    {
        id: crypto.randomUUID(),
        name: 'VALID TASK 2',
        description: 'TASK DESCRIPTION...',
        createdAt: new Date(),
        assignee: 'TASK CREATOR',
        status: 'To Do',
        priority: 'Low',
        isPrivate: false,
        comments: [],
    },
    {
        id: crypto.randomUUID(),
        name: 'VALID TASK 3',
        description: 'TASK DESCRIPTION...',
        createdAt: new Date(),
        assignee: 'TASK CREATOR',
        status: 'To Do',
        priority: 'Low',
        isPrivate: false,
        comments: [],
    },
    {
        id: crypto.randomUUID(),
        name: 'INVALID TASK 4',
        createdAt: new Date(),
        assignee: 'TASK CREATOR',
        status: 'To Do',
        priority: 'Low',
        isPrivate: false,
        comments: [],
    },
    {
        id: crypto.randomUUID(),
        name: 'INVALID TASK 5',
        description: 'TASK DESCRIPTION...',
        createdAt: new Date(),
        assignee: ' ',
        status: 'To Do',
        priority: 'Low',
    },
    {
        id: crypto.randomUUID(),
        name: 'INVALID TASK 6',
        description: 'TASK DESCRIPTION...',
        assignee: 'TASK CREATOR',
        status: 'To Do',
        priority: 'Low',
        isPrivate: false,
        comments: [],
    },
    {
        id: crypto.randomUUID(),
        name: 'VALID TASK 4',
        description: 'TASK DESCRIPTION...',
        createdAt: new Date(),
        assignee: 'TASK CREATOR',
        status: 'To Do',
        priority: 'Low',
        isPrivate: false,
        comments: [],
    },
    {
        name: 'INVALID TASK 7',
        description: 'TASK DESCRIPTION...',
        createdAt: new Date(),
        assignee: 'TASK CREATOR',
        status: 'To Do',
        priority: 'Low',
        comments: [],
    },
    {
        id: crypto.randomUUID(),
        name: 'VALID TASK 5',
        description: 'TASK DESCRIPTION...',
        createdAt: new Date(),
        assignee: 'TASK CREATOR',
        status: 'To Do',
        priority: 'Low',
        isPrivate: false,
        comments: [],
    },
    {
        id: crypto.randomUUID(),
        name: 'VALID TASK 6',
        description: 'TASK DESCRIPTION...',
        createdAt: new Date(),
        assignee: 'TASK CREATOR',
        status: 'To Do',
        priority: 'Low',
        isPrivate: false,
        comments: [],
    },
    {
        id: crypto.randomUUID(),
        name: 'INVALID TASK 8',
        description: 'TASK DESCRIPTION...',
        createdAt: new Date(),
        assignee: '',
        status: 'To Do',
        priority: 'Low',
        isPrivate: false,
        comments: [],
    },
];
console.log('\n\nNow add all tasks...');
const returnedTasks = taskcollection.addAll(differentTasks);
console.log('Our tasks now look as:');
console.log(taskcollection.tasklist);
console.log('Returned tasks:');
console.log(returnedTasks);

console.log('\n\nAnd clear out tasks!');
taskcollection.clear();
console.log(taskcollection.tasklist);

console.log('\n\nAnd add different tasks again!');
taskcollection.addAll(differentTasks);
console.log(taskcollection.tasklist);
