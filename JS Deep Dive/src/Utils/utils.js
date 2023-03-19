/* eslint-disable no-unused-vars */
const validStatuses = ['to do', 'in progress', 'complete'];
const validPriority = ['low', 'medium', 'high'];

const isString = (param) => (typeof param === 'string');
const isNumber = (param) => (typeof param === 'number' && !Number.isFinite(param));
const isBoolean = (param) => (typeof param === 'boolean');
const isDate = (param) => (Object.prototype.toString.call(param) === '[object Date]' && !Number.isNaN(param));
const isNotEmpty = (param) => (param !== undefined && param.trim() !== '' && param !== null);
const isLengthValid = (str, maxLen) => (str.length <= maxLen);
const isCurrentUser = (user, assignee) => {
    const isAllow = user === assignee;

    if (!isAllow) {
        const error = {
            name: errorslist.errorTypes.accessDeny,
            message: errorslist.errorMessages.wrongUser,
        };

        try {
            throw new CustomError(error);
        } catch (err) {
            console.warn(err.shortMessage);
        }
    }

    return isAllow;
};

const isRightStatus = (param) => {
    const status = param.toLowerCase();

    return validStatuses.includes(status);
};

const isRightPriority = (param) => {
    const priority = param.toLowerCase();

    return validPriority.includes(priority);
};

const checkAppropriate = (obj) => (!Object.values(obj).includes(false));

const analizeObjErrors = (obj) => {
    const objEnt = Object.entries(obj);

    const result = objEnt.map((entry) => {
        const [key, value] = entry;
        if (!value) {
            const error = {
                name: errorslist.errorTypes.validationError,
                message: fieldKeys[key]?.tip ?? errorslist.errorMessages.wrongFieldMsg(key),
            };
            try {
                throw new CustomError(error);
            } catch (err) {
                console.warn(err.shortMessage);
            }
        }

        const validationInfo = {
            fieldName: key,
            isValid: value,
            fieldTip: fieldKeys[key]?.tip,
        };

        return validationInfo;
    });

    return result;
};

const filterTasks = (tasklist, filterOpt) => {
    const tasks = tasklist.slice();
    const filterEnt = Object.entries(filterOpt);

    const filteredTasks = tasks.filter((task) => {
        const filterResults = {};

        filterEnt.forEach((opt) => {
            const [key, value] = opt;

            if (key.includes(fieldKeys.assignee.key)
                || key.includes(fieldKeys.status.key)
                || key.includes(fieldKeys.description.key)
                || key.includes(fieldKeys.priority.key)) filterResults[key] = task[key].includes(value);

            if (key.includes(fieldKeys.dateFrom.key)) filterResults[key] = task.createdAt > value;
            if (key.includes(fieldKeys.dateTo.key)) filterResults[key] = task.createdAt < value;

            if (key.includes(fieldKeys.isPrivate.key)) filterResults[key] = task[key] === value;
        });

        return checkAppropriate(filterResults);
    });

    return filteredTasks;
};

const orderByDate = (tasklist, isAsc = true) => {
    const sorted = [...tasklist].sort((task1, task2) => task1.createdAt - task2.createdAt);
    return isAsc ? sorted : sorted.reverse();
};
