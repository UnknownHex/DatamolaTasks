// import { users, currentUser } from '../shared/userprofles.js';
// import { tasklist } from '../shared/tasklist.js';

const taskModule = (function() {
    const user = 'Карэнт Йусер';
    const tasklist = [
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
            assignee: 'Иванов Иван',
            status: 'To Do',
            priority: 'Medium',
            isPrivate: false,
            comments: [{
                id: '753958',
                text: 'Будет сделано!',
                createdAt: new Date('2023-03-09T23:00:05'),
                author: 'Иванов Иван',
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
            name: 'Подтереть комментарии в коде',
            description: 'Срочно нужно очистить код от комментов!!!',
            createdAt: new Date('2023-03-10T16:22:40'),
            assignee: 'Игорёша',
            status: 'To Do',
            priority: 'High',
            isPrivate: false,
            comments: [{
                id: '260854',
                text: 'И ничего не пропусти!',
                createdAt: new Date('2023-03-10T16:53:31'),
                author: 'Лида Тим',
            }],
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
    ];

    const orderByDate = (tasklist, isAsc = true) => {
        const res = tasklist.sort((task1, task2) => task1.createdAt - task2.createdAt);
        return isAsc ? res : res.reverse();
    };

    const getTasks = (skip = 0, top = 10, filterConfig) => {
        const taskListSorted = orderByDate(tasklist);
        const taskListSpliced = [...taskListSorted].splice(skip, top);
        return taskListSpliced;
    };

    const getTask = (id) => {
        const [taskByID] = tasklist.filter((task) => task.id === id);
        return taskByID ?? null;
    };

    return { 
        getTasks,
        getTask,
    };
})();

console.log('getTasks() - show tasks from 0');
const tasksFrom0 = taskModule.getTasks();
console.log(tasksFrom0);
console.log('-----------------------------------');


console.log('\ngetTasks(10) - show tasks from 10');
const tasksFrom10 = taskModule.getTasks(10);
console.log(tasksFrom10);
console.log('-----------------------------------');

console.log('\ngetTask(\'000010\') - show task width id 000010');
const taskByID = taskModule.getTask('000010');
console.log(taskByID);
console.log('-----------------------------------');
