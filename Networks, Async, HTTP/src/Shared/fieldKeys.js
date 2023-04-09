// eslint-disable-next-line no-unused-vars
const fieldKeys = {
    id: {
        key: 'id',
        tip: 'ID must be a not empty string!',
    },
    name: {
        key: 'name',
        tip: 'NAME must be a not empty string and less than 100 characters;',
    },
    assignee: {
        key: 'assignee',
        tip: 'ASSIGNEE must be a not empty and string;',
    },
    dateFrom: {
        key: 'dateFrom',
        tip: 'DATE must be a Date;',
    },
    dateTo: {
        key: 'dateTo',
        tip: 'DATE must be a Date;',
    },
    status: {
        key: 'status',
        tip: 'STATUS can be only "To Do", "In Progress" or "Complete";',
    },
    priority: {
        key: 'priority',
        tip: 'PRIORITY can be only "Low", "Medium" or "High";',
    },
    isPrivate: {
        key: 'isPrivate',
        tip: 'PRIVATE - it\'s only boolean type;',
    },
    description: {
        key: 'description',
        tip: 'DESCRIPTION - not empty and less than 280 characters;',
    },

    text: {
        key: 'text',
        tip: 'TEXT must be a not empty and less than 280 characters;',
    },

    username: {
        tip: 'USERNAME NAME must be a not empty string and less than 32 characters;',
    },
    login: {
        key: 'login',
        tip: 'LOGIN must consist only cyrylic simbols and _;',
    },
    password: {
        tip: 'PASSWORD must greater than 4;',
    },
    passwordConfirm: {
        tip: 'PASSWORDS is not simple!',
    },
};
