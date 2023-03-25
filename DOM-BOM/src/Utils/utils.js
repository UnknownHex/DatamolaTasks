/* eslint-disable no-unused-vars */
const isString = (param) => (typeof param === 'string');
const isNumber = (param) => (typeof param === 'number' && !Number.isFinite(param));
const isBoolean = (param) => (typeof param === 'boolean');
const isDate = (param) => (Object.prototype.toString.call(param) === '[object Date]' && !Number.isNaN(param));
const isNotEmpty = (param) => (param !== undefined && param !== '' && param !== null);
const isLengthValid = (str, maxLen) => (str.length <= maxLen);

const isValidKey = (key) => {
    try {
        const isValid = Object.keys(fieldKeys).includes(key);

        if (!isValid) {
            throw new CustomError({
                name: errorslist.errorTypes.validationError,
                message: errorslist.errorMessages.ignoredFiledMsg(key),
            });
        }

        return isValid;
    } catch (err) {
        console.warn(err.shortMessage);
        return false;
    }
};

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
    if (!isString(param)) {
        throw new CustomError({
            name: errorslist.errorTypes.validationError,
            message: fieldKeys.status.tip,
        });
    }

    const status = param.toLowerCase();
    const validStatuses = Object.values(taskStatus).map((st) => st.toLowerCase());

    return validStatuses.includes(status);
};

const isRightPriority = (param) => {
    if (!isString(param)) {
        throw new CustomError({
            name: errorslist.errorTypes.validationError,
            message: fieldKeys.priority.tip,
        });
    }

    const priority = param.toLowerCase();
    const validPriorities = Object.values(taskPriority).map((pr) => pr.toLowerCase());

    return validPriorities.includes(priority);
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
    const filterEnt = Object.entries(filterOpt).filter((opt) => {
        const [key] = opt;
        return isValidKey(key);
    });

    const filteredTasks = tasks.filter((task) => {
        const filterResults = {};

        filterEnt.forEach((opt) => {
            const [key, value] = opt;

            if (key.includes(fieldKeys.assignee.key)
                || key.includes(fieldKeys.description.key)) {
                filterResults[key] = task[key].includes(value);
            }

            if (key.includes(fieldKeys.status.key)
                || key.includes(fieldKeys.priority.key)
                || key.includes(fieldKeys.isPrivate.key)) {
                filterResults[key] = Array.isArray(value) ? value.includes(task[key]) : task[key] === value;
            }

            if (key.includes(fieldKeys.dateFrom.key)) filterResults[key] = task.createdAt > value;
            if (key.includes(fieldKeys.dateTo.key)) filterResults[key] = task.createdAt < value;
        });

        return checkAppropriate(filterResults);
    });

    return filteredTasks;
};

const orderByDate = (tasklist, isAsc = true) => {
    const sorted = [...tasklist].sort((task1, task2) => task1.createdAt - task2.createdAt);
    return isAsc ? sorted : sorted.reverse();
};

const formatDate = (dateInst) => {
    const addZeroTo = (number) => (number > 9 ? number : `0${number}`);

    const date = addZeroTo(dateInst.getDate());
    const month = MONTHS[dateInst.getMonth()];
    const year = dateInst.getFullYear();
    const hours = addZeroTo(dateInst.getHours());
    const minutes = addZeroTo(dateInst.getMinutes());

    return `${date} ${month} ${year}, ${hours}:${minutes}`;
};
