const isString = (param) => (typeof param === 'string');
const isNumber = (param) => (typeof param === 'number' && !Number.isFinite(param));
const isBoolean = (param) => (typeof param === 'boolean');
const isDate = (param) => (Object.prototype.toString.call(param) === '[object Date]' && !Number.isNaN(param));
const isNotEmpty = (param) => (param !== undefined && param !== '' && param !== null && param.trim(param) !== '');
const isLengthValid = (str, maxLen) => (str.length <= maxLen);
const isMinLenValid = (str, minLen) => (str.length > minLen);

const isLoginValid = (login) => {
    try {
        const regTmplt = /^[A-Za-z_]+/;
        const [found] = login.match(regTmplt) || [];
        const isValid = found === login;

        if (!isValid) {
            throw new CustomError({
                name: errorslist.errorTypes.validationError,
                message: errorslist.errorMessages.wrongLogin,
            });
        }

        return {
            status: 200,
            code: 'provisionally',
            isValid,
        };
    } catch (err) {
        if (err instanceof CustomError) {
            console.warn(err.shortMessage);
        } else {
            console.error(err);
        }

        return {
            status: 400,
            err: {
                message: err.message,
            },
            isValid: false,
        };
    }
};

const decodePhoto = (user) => {
    const ava = atob(user?.photo);
    if (ava.includes('data:image/')) {
        return ava;
    }

    return user?.photo ? `data:image/png;base64,${user?.photo}` : STANDARD_IMG;
};

const isLoginFree = (login, userlist) => {
    console.log(login, userlist);
    try {
        const index = userlist.findIndex((user) => user.login.toLowerCase() === login.toLowerCase());

        const isValid = index === -1;

        if (!isValid) {
            throw new CustomError({
                name: errorslist.errorTypes.validationError,
                message: errorslist.errorMessages.existingLogin(login),
            });
        }

        return {
            status: 200,
            code: 'provisionally',
            isValid,
        };
    } catch (err) {
        if (err instanceof CustomError) {
            console.warn(err.shortMessage);
        } else {
            console.error(err);
        }

        return {
            status: 400,
            err: {
                message: err.message,
            },
            isValid: false,
        };
    }
};

const isPassConfirmed = (fPass, sPass) => {
    try {
        const isConfirmed = fPass === sPass;

        if (!isConfirmed) {
            throw new CustomError({
                name: errorslist.errorTypes.validationError,
                message: errorslist.errorMessages.passDontMatch,
            });
        }

        return {
            status: 200,
            code: 'provisionally',
            isValid: isConfirmed,
        };
    } catch (err) {
        if (err instanceof CustomError) {
            console.warn(err.shortMessage);
        } else {
            console.error(err);
        }

        return {
            status: 400,
            err: {
                message: err.message,
            },
            isValid: false,
        };
    }
};

const isChangePassAllow = (curPass, newPass) => (curPass !== newPass);

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

const isCurrentUser = (user, assignee, silent = true) => {
    const isAllow = user === assignee;

    if (!isAllow && !silent) {
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

const filterByWord = (tasklist, filterString) => {
    const tasks = [...tasklist];
    const filtered = tasks.filter((task) => (
        task.description.includes(filterString) || task.name.includes(filterString)
    ));

    return filtered;
};

const filterTasks = (tasklist, filterOpt) => {
    const tasks = [...tasklist];
    const filterEnt = Object.entries(filterOpt).filter((opt) => {
        const [key] = opt;
        return isValidKey(key);
    });

    const filteredTasks = tasks.filter((task) => {
        const filterResults = {};

        filterEnt.forEach((opt) => {
            const [key, value] = opt;

            // console.log(key, value);

            if (key === fieldKeys.assignee.key) {
                filterResults[key] = !value || task[key].id === value;
            }

            if (key.includes(fieldKeys.status.key)
                || key.includes(fieldKeys.priority.key)
                || key.includes(fieldKeys.isPrivate.key)) {
                filterResults[key] = Array.isArray(value) && value.length > 0 ? value.includes(task[key]) : true;
            }

            if (key.includes(fieldKeys.dateFrom.key)) {
                filterResults[key] = value ? new Date(task.createdAt) > value : true;
            }
            if (key.includes(fieldKeys.dateTo.key)) {
                filterResults[key] = value ? new Date(task.createdAt) < new Date(value) : true;
            }
        });

        return checkAppropriate(filterResults);
    });

    return filteredTasks;
};

const orderByDate = (tasklist, isAsc = true) => {
    const sorted = [...tasklist].sort((task1, task2) => new Date(task1.createdAt) - new Date(task2.createdAt));
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
