const taskModule = (function() {
    const mainState = {
        user: 'Карэнт Йусер',
        tasklist: [
            {
                id: '000001',
                name: 'Создать логотип приложения',
                description: 'Формат изображения – svg, размеры - 100х100px',
                createdAt: new Date('2023-03-11T23:00:00'),
                assignee: 'Иванов Иван',
                status: 'To Do',
                priority: 'High',
                isPrivate: false,
                comments: [],  
            },
            {
                id: '000002',
                name: 'Переименовать константу DELAY_TIME',
                description: 'Необходимо переименовать константу с DELAY_TIME на DELAY_API_TIME',
                createdAt: new Date('2023-03-09T23:10:00'),
                assignee: 'Карэнт Йусер',
                status: 'To Do',
                priority: 'Medium',
                isPrivate: false,
                comments: [{
                    id: '753958',
                    text: 'Будет сделано!',
                    createdAt: new Date('2023-03-09T23:00:05'),
                    author: 'Карэнт Йусер',
                }],
            },
            {
                id: '000003',
                name: 'Подтереть комментарии в коде',
                description: 'Срочно нужно очистить код от комментов!!!',
                createdAt: new Date('2023-03-10T15:02:40'),
                assignee: 'Константина Гон',
                status: 'In progress',
                priority: 'High',
                isPrivate: false,
                comments: [{
                    id: '868634',
                    text: 'Уже бягу!',
                    createdAt: new Date('2023-03-10T15:02:42'),
                    author: 'Константина Гон',
                }],
            },
            {
                id: '000004',
                name: 'Показать мидлу, где раки зимуют',
                description: 'Объяснить человеку как работать!',
                createdAt: new Date('2023-03-10T15:12:20'),
                assignee: 'Синьёр Петя',
                status: 'To Do',
                priority: 'Low',
                isPrivate: true,
                comments: [],
            },
            {
                id: '000005',
                name: 'Написать фунцкию сортировки списков в списке списков.',
                description: 'Реализовать сортировку подмассивов в массивах.)',
                createdAt: new Date('2023-03-10T16:22:40'),
                assignee: 'Лида Тим',
                status: 'To Do',
                priority: 'High',
                isPrivate: false,
                comments: [],
            },
            {
                id: '000006',
                name: 'Поменять хэдэр с футтером!',
                description: 'Буквально. Поменять хэдэр и футтер местами!',
                createdAt: new Date('2023-03-10T16:47:13'),
                assignee: 'Йосиф Программилла',
                status: 'In Progress',
                priority: 'Medium',
                isPrivate: true,
                comments: [{
                    id: '179842',
                    text: 'А я бы так не делал...',
                    createdAt: new Date('2023-03-10T16:51:17'),
                    author: 'Йосиф Программилла',
                }],
            },
            {
                id: '000007',
                name: 'Изобрести необыкновенную кнопку!',
                description: 'Нужно сделать кнопку, которую пользователь не сможет проигнорировать.',
                createdAt: new Date('2023-03-11T00:07:10'),
                assignee: 'Игорёша',
                status: 'Complete',
                priority: 'High',
                isPrivate: false,
                comments: [],
            },
            {
                id: '000008',
                name: 'Сделать кнопку кликабельной.',
                description: 'Сделать кнопку, изобретенную Игорёшей, кликабельной и меняющей стиль!',
                createdAt: new Date('2023-03-12T15:14:52'),
                assignee: 'Синьёр Петя',
                status: 'To Do',
                priority: 'Medium',
                isPrivate: false,
                comments: [{
                    id: '976267',
                    text: 'Фигней всякой заниматься! Придумайте задачу поинтересней!',
                    createdAt: new Date('2023-03-12T16:26:59'),
                    author: 'Синьёр Петя',
                }],
            },
            {
                id: '000009',
                name: 'Добавить кнопке тенюшку.',
                description: 'Сделать кнопку, изобретенную Игорёшей, и менющей стиль благодаря Синьёру Пете, немного более естественной с тенями!',
                createdAt: new Date('2023-03-12T16:54:52'),
                assignee: 'Инна Катеринина',
                status: 'To Do',
                priority: 'Low',
                isPrivate: false,
                comments: [{
                    id: '348452',
                    text: 'Это я могу запросто',
                    createdAt: new Date('2023-03-17T05:06:19'),
                    author: 'Инна Катеринина',
                }],
            },
            {
                id: '000010',
                name: 'Заказать пиццу на всех!',
                description: 'Необходимо накормить всю команду мегаразработчиков!!!',
                createdAt: new Date('2023-03-12T12:24:52'),
                assignee: 'Джун-Курьер',
                status: 'In progress',
                priority: 'High',
                isPrivate: false,
                comments: [{
                    id: '643037',
                    text: 'Какие брать?',
                    createdAt: new Date('2023-03-12T12:24:53'),
                    author: 'Джун-Курьер',
                },
                {
                    id: '590364',
                    text: 'за веганскую!',
                    createdAt: new Date('2023-03-12T12:24:55'),
                    author: 'Инна Катеринина',
                },
                {
                    id: '147390',
                    text: 'Я как все',
                    createdAt: new Date('2023-03-12T12:24:56'),
                    author: 'Иванов Иван',
                },
                {
                    id: '984920',
                    text: 'Мне любую... Но ТРИ!',
                    createdAt: new Date('2023-03-12T12:24:57'),
                    author: 'Йосиф Программилла',
                },
                {
                    id: '650371',
                    text: 'А я сам съезжу! Инна гоу со мной!',
                    createdAt: new Date('2023-03-12T12:24:59'),
                    author: 'Синьёр Петя',
                },
                
            ],
            },
            {
                id: '000011',
                name: 'Разработать сверхновый алгоритм блокчейнов.',
                description: 'Создать сверхновый, сверх быстрый, сверх надежный алгоритм работы блокчейна.',
                createdAt: new Date('2023-03-13T09:07:54'),
                assignee: 'Джун-Курьер',
                status: 'To Do',
                priority: 'High',
                isPrivate: false,
                comments: [{
                    id: '535812',
                    text: 'Почему не мне интересная задача?! ТТ',
                    createdAt: new Date('2023-03-17T10:21:19'),
                    author: 'Синьёр Петя',
                }],
            },
            {
                id: '000012',
                name: 'Почистить клавиатуру всем.',
                description: 'Пробежать всех и почистить им клавиатуры.',
                createdAt: new Date('2023-03-13T20:15:08'),
                assignee: 'Константина Гон',
                status: 'To Do',
                priority: 'High',
                isPrivate: false,
                comments: [{
                    id: '407615',
                    text: 'Неее, я только что новый маник сдалала!',
                    createdAt: new Date('2023-03-13T21:21:19'),
                    author: 'Константина Гон',
                }],
            },
            {
                id: '000013',
                name: 'Проверить домашку своего менти!',
                description: 'Проверить домашку и дать фидбэк!',
                createdAt: new Date('2023-03-14T08:00:02'),
                assignee: 'Синьёр Петя',
                status: 'In progress',
                priority: 'High',
                isPrivate: true,
                comments: [{
                    id: '472605',
                    text: 'ё-маё! совсем забыл!',
                    createdAt: new Date('2023-03-14T23:28:51'),
                    author: 'Синьёр Петя',
                }],
            },
            {
                id: '000014',
                name: 'Изменить именование переменных во вем проекте!!!',
                description: 'Переделать все кебаб-кейс в кэмэл-кейсы! СРОЧНО!',
                createdAt: new Date('2023-03-15T01:10:07'),
                assignee: 'Константина Гон',
                status: 'To Do',
                priority: 'High',
                isPrivate: true,
                comments: [],
            },
            {
                id: '000015',
                name: 'Уменьшить нагрузку на сервера прилаги!',
                description: 'Добавить еще пару нод в каждый кластер k8s\'a, иначе апишка от запросов лопнет.',
                createdAt: new Date('2023-03-15T04:54:22'),
                assignee: 'Игорёша',
                status: 'To Do',
                priority: 'Med',
                isPrivate: true,
                comments: [{
                    id: '658321',
                    text: 'Игорёша',
                    createdAt: new Date('2023-03-14T09:37:01'),
                    author: 'Ребята, я ж не ДевОпс! Я только вчера на мидла сдал.',
                },
                {
                    id: '784521',
                    text: 'Сочувствую, чел. Придется разбираться...',
                    createdAt: new Date('2023-03-14T13:42:17'),
                    author: 'Константина Гон',
                }],
            },
            {
                id: '000016',
                name: 'Подчистить старые коммиты и брэнчи!!!',
                description: 'Подчистить старые коммиты и брэнчи в системе хранения версий проекта.',
                createdAt: new Date('2023-03-15T08:13:51'),
                assignee: 'Джун-Курьер',
                status: 'To Do',
                priority: 'Low',
                isPrivate: false,
                comments: [],
            },
            {
                id: '000017',
                name: 'Сделать иконку приложения.',
                description: 'Сделать иконку приложения на основе логотипа.',
                createdAt: new Date('2023-03-15T09:26:43'),
                assignee: 'Игорёша',
                status: 'To Do',
                priority: 'Medium',
                isPrivate: false,
                comments: [],
            },
            {
                id: '000018',
                name: 'Крестики для модалок!',
                description: 'Добавить модалкам крестики для закрытия!',
                createdAt: new Date('2023-03-15T11:39:23'),
                assignee: 'Йосиф Программилла',
                status: 'To Do',
                priority: 'Medium',
                isPrivate: false,
                comments: [],
            },
            {
                id: '000019',
                name: 'Добавить подписи инпутам и контролам!',
                description: 'Добавить отсутствующие подписи инпутам',
                createdAt: new Date('2023-03-15T12:40:15'),
                assignee: 'Джун-Курьер',
                status: 'To Do',
                priority: 'Low',
                isPrivate: false,
                comments: [],
            },
            {
                id: '000020',
                name: 'Добавить картинку на эррор-пэйдж!',
                description: 'Добавить картинку чтобы пользователь не так расстраивался',
                createdAt: new Date('2023-03-15T12:46:45'),
                assignee: 'Йосиф Программилла',
                status: 'To Do',
                priority: 'High',
                isPrivate: false,
                comments: [],
            },
            {
                id: '000021',
                name: 'Изменить контраст на тоггл-барах!',
                description: 'Изменить контраст на тоггл-барах и добавить паддингов, чтобы били покрупнее.',
                createdAt: new Date('2023-03-15T13:16:16'),
                assignee: 'Константина Гон',
                status: 'To Do',
                priority: 'Medium',
                isPrivate: false,
                comments: [],
            },
            {
                id: '000022',
                name: 'Сделать авторизацию модалкой!',
                description: 'Сделать модалкой, а не страницей. В соответствии с ТЗ',
                createdAt: new Date('2023-03-15T13:18:22'),
                assignee: 'Игорёша',
                status: 'To Do',
                priority: 'Medium',
                isPrivate: false,
                comments: [],
            },
            {
                id: '000023',
                name: 'Реализовать основные методы для работы приложения!',
                description: 'В JavaScript файле создать массив для хранения списка задач. Заполнить массив объектами task (минимум 20 задач).',
                createdAt: new Date('2023-03-15T14:44:42'),
                assignee: 'Синьёр Петя',
                status: 'To Do',
                priority: 'Medium',
                isPrivate: false,
                comments: [],
            },
            {
                id: '000024',
                name: 'Добавить задачу в таск менеджер.',
                description: 'Придумать любую задачу и попробовать добавить ее к существующим.',
                createdAt: new Date('2023-03-03T13:27:42'),
                assignee: 'Карэнт Йусер',
                status: 'In Progress',
                priority: 'Medium',
                isPrivate: false,
                comments: [],
            },
        ],
    };

    const ASSIGNEE_KEY = 'assignee';
    const DATEFROM_KEY = 'dateFrom';
    const DATETO_KEY = 'dateTo';
    const STATUS_KEY = 'status';
    const PRIORITY_KEY = 'priority';
    const PRIVATE_KEY = 'isPrivate';
    const DESCRIPTION_KEY = 'description';

    const isString = (param) => (typeof param === 'string');
    const isNumber = (param) => (typeof param === 'number');
    const isBoolean = (param) => (typeof param === 'boolean');
    const isDate = (param) => (Object.prototype.toString.call(param) === "[object Date]" && !isNaN(param));
    const isNotEmpty = (param) => (param !== undefined && param !== '' && param !== null);
    const isCurrentUser = (user) => (user === mainState.user);
    
    const isRightStatus = (param) => {
        const status = param.toLowerCase();

        return status === 'to do' || status === 'in progress' || status === 'complete';
    };
    
    const isRightPriority = (param) => {
        const priority = param.toLowerCase();

        return priority === 'low' || priority === 'medium' || priority === 'high';
    };
    
    const checkAppropriate = (obj) => (!Object.values(obj).includes(false));

    const orderByDate = (tasklist, isAsc = true) => {
        const sorted = tasklist.slice().sort((task1, task2) => task1.createdAt - task2.createdAt);
        return isAsc ? sorted : sorted.reverse();
    };

    const filterTasks = (tasklist, filterOpt) => {
        const tasks = tasklist.slice();
        const filterEnt = Object.entries(filterOpt);

        const filteredTasks = tasks.filter((task) => {
            const filterResults = {};

            filterEnt.map((opt) => {
                const [key, value] = opt;

                if (key.includes(ASSIGNEE_KEY) ||
                    key.includes(STATUS_KEY) ||
                    key.includes(DESCRIPTION_KEY) ||
                    key.includes(PRIORITY_KEY)) filterResults[key] = task[key].includes(value);
                
                if (key.includes(DATEFROM_KEY)) filterResults[key] = task.createdAt > value;
                if (key.includes(DATETO_KEY)) filterResults[key] = task.createdAt < value;

                if (key.includes(PRIVATE_KEY)) filterResults[key] = task[key] === value;

            });

            return checkAppropriate(filterResults);
        });

        return filteredTasks;
    };

    const validateTask = (taskObj) => {
        const titleMaxLen = 100;
        const descrMaxLen = 280;

        const {
            id,
            name,
            assignee,
            description,
            createdAt,
            status,
            priority,
            isPrivate,
            comments,
        } = taskObj;

        const verified = {
            id: isString(id),
            assignee: isNotEmpty(assignee),
            name: isString(name) && isNotEmpty(name) && name.length <= titleMaxLen,
            description: isString(description) && isNotEmpty(description) && description.length <= descrMaxLen,
            createdAt: isDate(createdAt),
            status: isRightStatus(status),
            priority: isRightPriority(priority),
            isPrivate: isBoolean(isPrivate),
            comments: Array.isArray(comments),
        };

        return checkAppropriate(verified);
    };

    const getTasks = (skip = 0, top = 10, filterOpt) => {
        const tasklist = mainState.tasklist.slice();
        const filteredTasks = filterOpt ? filterTasks(tasklist, filterOpt) : null;
        const tasks = filterOpt ? filteredTasks : tasklist;
        const sortedTasks = orderByDate(tasks);

        return sortedTasks.splice(skip, top);
    };

    const getTask = (id) => {
        const [taskByID] = mainState.tasklist.filter((task) => task.id === id);
        return taskByID ?? null;
    };

    const addTask = (name, description, assignee, status, priority, isPrivate) => {
        const id = crypto.randomUUID();
        const taskObj = {
            id,
            name,
            description,
            status,
            priority,
            isPrivate,
            assignee: mainState.user,
            createdAt: new Date(),
            comments: [],
        };

        const isTaskValid = validateTask(taskObj);

        if (isTaskValid) {
            mainState.tasklist = [...mainState.tasklist, taskObj];
            return true;
        }
        
        return false;
    };

    const editTask = (id, name, description, assignee, status, priority, isPrivate = false) => {
        let [editableTask] = mainState.tasklist.filter((task) => task.id === id);

        const updatedTask = {
            ...editableTask,
            name: name ?? editableTask.name,
            description: description ?? editableTask.description,
            assignee: assignee ?? editableTask.assignee,
            status: status ?? editableTask.status,
            priority: priority ?? editableTask.priority,
            isPrivate: isPrivate ?? editableTask.isPrivate,
        };

        const isValid = validateTask(updatedTask);

        if (isValid && isCurrentUser(editableTask.assignee)) {
            editableTask.name = updatedTask.name;
            editableTask.description = updatedTask.description;
            editableTask.assignee = updatedTask.assignee;
            editableTask.status = updatedTask.status;
            editableTask.priority = updatedTask.priority;
            editableTask.isPrivate = updatedTask.isPrivate;
            return true;
        };

        return false;
    };

    const removeTask = (id) => {
        const [removableTask] = mainState.tasklist.filter((task) => task.id === id);
        const indexOfRemTask = mainState.tasklist.indexOf(removableTask);

        if (isNotEmpty(removableTask) && isCurrentUser(removableTask.assignee)) {
            mainState.tasklist = [...mainState.tasklist.slice(0, indexOfRemTask), ...mainState.tasklist.slice(indexOfRemTask + 1)]
            return true;
        };

        return false;
    };

    const changeUser = (usr) => {
        mainState.user = usr;
    };

    return { 
        getTasks,
        getTask,
        addTask,
        editTask,
        removeTask,
        changeUser,
    };
})();

const showAllTasks = () => taskModule.getTasks(0, 50);


console.log('getTasks() - show tasks from 0');
const tasksFrom0 = taskModule.getTasks();
console.log(tasksFrom0);
console.log('-----------------------------------\n');


console.log('getTasks(10, 5) - show tasks from 10');
const tasksBy5From10 = taskModule.getTasks(10, 5);
const tasksBy5From15 = taskModule.getTasks(15, 5);
console.log(tasksBy5From10);
console.log(tasksBy5From15);
console.log('-----------------------------------\n');


console.log('Use filter and show results.');
// FILTER OPTIONS
const filterOpt = {
    // assignee: 'Тим',
    dateFrom: new Date('2023-03-10T00:00:00'),
    dateTo: new Date('2023-03-10T23:59:59'),
    // status: 'To Do',
    priority: 'High',
    // isPrivate: false,
    // description: 'svg',
}
const tasksWithFilter = taskModule.getTasks(0, 5, filterOpt);
console.log(tasksWithFilter);
console.log('-----------------------------------\n');


console.log('getTask(\'000010\') - show task with id 000010');
const taskByID = taskModule.getTask('000010');
console.log(taskByID);
console.log('-----------------------------------\n');


console.log('addTask(...) - create new task');
console.log(showAllTasks());
const addValidTask = taskModule.addTask(
    'Организовать пользователям доступ к файловым хранилищам',
    'Открыть на доступ все общие папки для пользователей.',
    'user',
    'To Do',
    'High',
    false
);
console.log(`addValidTask() - return ${addValidTask}`);

const addInvalidTask = taskModule.addTask(
    'wefwfwef',
    'fwefwfwefwef',
    'user',
    'Complete',
    'High',
    'false'
);
console.log(`addInvalidTask() - return ${addInvalidTask}`);

console.log(showAllTasks());
console.log('-----------------------------------\n');


console.log('editTask(\'0000003\', ...) - edit task with id 000003');
console.log('changeUser(...) - set new name and try to edit task.');
taskModule.changeUser('Константина Гон');

const afterEditTaskWithID2 = taskModule.getTask('000003');
console.log(afterEditTaskWithID2);
taskModule.editTask('000003', 'new name', 'updated description', 'assignee', 'In progress', 'Low');
const beforeEditTaskWithID2 = taskModule.getTask('000003');
console.log(beforeEditTaskWithID2);
console.log('-----------------------------------\n');


console.log('removeTask(\'0000002\') - set out user and remove task id 000002');
taskModule.changeUser('Карэнт Йусер');
taskModule.removeTask('000002');
console.log(showAllTasks());
console.log('-----------------------------------\n');
