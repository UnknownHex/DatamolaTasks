const consts = {
    appName: 'APPLICATION',
};

const customEvents = {
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
    inProgress: 'In Progress',
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
        taskAdded: (name, assignee) => (`
            Task "<span class="${styles.focusSucc}">${name}</span>"
             <span class="${styles.focusSucc}">added</span> by "
             <span class="${styles.focusSucc}">${assignee}</span>"!`),
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

    },
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
