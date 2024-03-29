const consts = {
    appName: 'OUTY',
    version: '0.6',
    update: '16.04.2023',
};

const API = {
    address: 'http://169.60.206.50:7777',
    endpoints: {
        authLogin: {
            method: 'POST',
            urn: '/api/auth/login',
        },
        allUsers: {
            method: 'GET',
            urn: '/api/user/allUsers',
        },
        myProfile: {
            method: 'GET',
            urn: '/api/user/myprofile',
        },
        register: {
            method: 'POST',
            urn: '/api/user/register',
        },
        editUser: {
            method: 'PATCH',
            urn: (id) => (`/api/user/${id}`),
        },
        deleteUser: {
            method: 'DELETE',
            urn: (id) => (`/api/user/${id}`),
        },
        tasks: {
            method: 'GET',
            urn: '/api/tasks',
        },
        getTaskById: {
            method: 'GET',
            urn: (id) => (`/api/tasks/${id}`),
        },
        createTask: {
            method: 'POST',
            urn: '/api/tasks',
        },
        editTask: {
            method: 'PATCH',
            urn: (id) => (`/api/tasks/${id}`),
        },
        deleteTask: {
            method: 'DELETE',
            urn: (id) => (`/api/tasks/${id}`),
        },
        comments: {
            method: 'GET',
            urn: (id) => (`/api/tasks/${id}/comments`),
        },
        createComment: {
            method: 'POST',
            urn: (id) => (`/api/tasks/${id}/comments`),
        },
    },
};

const STANDARD_IMG = './assets/icons/avatar.svg';

const customEvents = {
    setWordFilter: {
        caption: 'find-in-text',
        action: (text) => new CustomEvent('find-in-text', { bubbles: true, detail: { text } }),
    },
    editProfile: {
        caption: 'edit-profile',
        action: (payload) => new CustomEvent('edit-profile', { bubbles: true, detail: payload }),
    },
    openProfile: {
        caption: 'open-profile',
        action: new CustomEvent('open-profile', { bubbles: true }),
    },
    addComment: {
        caption: 'add-comment-to-task',
        action: (data) => new CustomEvent('add-comment-to-task', { bubbles: true, detail: { data } }),
    },
    changeTaskfeedView: {
        caption: 'change-taskfeed-view',
        action: new CustomEvent('change-taskfeed-view', { bubbles: true }),
    },
    closeModal: {
        caption: 'close-modal',
        action: new CustomEvent('close-modal', { bubbles: true }),
    },
    showRegistration: {
        caption: 'show-registration',
        action: new CustomEvent('show-registration', { bubbles: true }),
    },
    showTaskPage: {
        caption: 'show-task-id-page',
        action: (taskId) => new CustomEvent('show-task-id-page', { bubbles: true, detail: taskId }),
    },
    showTaskFeed: {
        caption: 'show-taskfeed',
        action: new CustomEvent('show-taskfeed', { bubbles: true }),
    },
    deleteTask: {
        caption: 'delete-task',
        action: (taskId) => new CustomEvent('delete-task', { bubbles: true, detail: taskId }),
    },
    editTask: {
        caption: 'edit-task',
        action: (taskData) => new CustomEvent('edit-task', { bubbles: true, detail: taskData }),
    },
    addTask: {
        caption: 'add-task',
        action: (taskData) => new CustomEvent('add-task', { bubbles: true, detail: taskData }),
    },
    showTaskModal: {
        caption: 'show-add-task-modal',
        action: (id = null) => new CustomEvent('show-add-task-modal', { bubbles: true, detail: id }),
    },
    showModal: {
        caption: 'show-modal',
        action: new CustomEvent('show-modal', { bubbles: true }),
    },
    registerUser: {
        caption: 'register-user',
        // { login, name, pass, confirm, img, imgBlob }
        action: (userdata) => new CustomEvent('register-user', {
            bubbles: true,
            detail: userdata,
        }),
    },
    loginUser: {
        caption: 'login-user',
        action: ({ login, password }) => new CustomEvent(
            'login-user',
            {
                bubbles: true,
                detail: { login, password },
            },
        ),
    },
    logoutUser: {
        caption: 'logout-system',
        action: new CustomEvent('logout-system', { bubbles: true }),
    },
    cancelFilterParam: {
        caption: 'cancel-filter-param',
        action: new CustomEvent(
            'cancel-filter-param',
            { bubbles: true },
        ),
    },
    confirmFilters: {
        caption: 'confirm-filters',
        action: new CustomEvent('confirm-filters', { bubbles: true }),
    },
    clearFilters: {
        caption: 'clear-filters',
        action: new CustomEvent('clear-filters', { bubbles: true }),
    },
    getFilterParam: {
        caption: 'get-filter-param',
        action: (target) => (
            new CustomEvent(
                'get-filter-param',
                { bubbles: true, detail: { dataset: target.dataset, name: target.name } },
            )
        ),
    },
    getSelectParam: {
        caption: 'get-select-data',
        action: (target) => (
            new CustomEvent('get-select-data', { bubbles: true, detail: { value: target.value, name: target.name } })
        ),
    },
    showFilters: {
        caption: 'show-filters',
        action: new CustomEvent('show-filters', { bubbles: true }),
    },
};

const taskStatus = {
    toDo: 'To Do',
    inProgress: 'In progress',
    complete: 'Complete',
};

const taskPriority = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
};

const notiflyVariants = {
    errNoti: 'err-noti',
    warnNoty: 'warn-noti',
    infoNoti: 'info-noti',
    succNoti: 'succ-noti',
};

const notiflyMessages = {
    info: {
        greeting: (user) => (`Greetings traveler, <span class="${styles.focusInfo}">${user}</span>!`),
        bye: (user) => (`See you letter, <span class="${styles.focusInfo}">${user}</span>!`),
    },
    success: {
        userEdited: (id) => (`User "#${id}" <span class="${styles.focusSucc}">successfully</span> updated!`),
        userAdded: `You're <span class="${styles.focusSucc}">successfully</span> registered.
            Please <span class="${styles.focusSucc}">SIGN IN</span> with your login and password!`,
        taskAdded: (name, creator) => (`
            Task "<span class="${styles.focusSucc}">${name}</span>"
             <span class="${styles.focusSucc}">added</span> by "
             <span class="${styles.focusSucc}">${creator}</span>"!`),
        taskUpdated: (id, user) => (`
            Task "<span class="${styles.focusSucc}">${id}</span>"
            <span class="${styles.focusSucc}">successfully updated</span> by
            "<span class="${styles.focusSucc}">${user}</span>"!
        `),
        taskRemoved: (id, user) => (`
            Task "<span class="${styles.focusSucc}">${id}</span>" 
            <span class="${styles.focusSucc}">successfully removed</span> by 
            "<span class="${styles.focusSucc}">${user}</span>"!`),
    },
    warn: {
        login: 'Log in to your account before using the service!',
        requiredRegistration: 'Registration is required to view tasks!',
    },
    err: {
        wrongLogin: 'Wrong login or password...',
        notSimplePasswors: 'Passwords are not simple.',
    },
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
