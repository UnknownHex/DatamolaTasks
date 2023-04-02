class UserCollector {
    #user;
    #userlist;

    constructor(userlist) {
        this.#user = null;
        this.#userlist = userlist;
    }

    get user() {
        return this.#user;
    }

    set user(user) {
        try {
            if (isString(user) || user === null) {
                this.#user = user;
            } else {
                throw new CustomError({
                    name: errorslist.errorTypes.validationError,
                    message: errorslist.errorMessages.wrongFieldMsg('user'),
                });
            }
        } catch (err) {
            if (!(err instanceof CustomError)) console.warn(err);
        }
    }

    get userlist() {
        return this.#userlist;
    }

    set userlist(list) {
        this.userlist = list;
    }

    get(id) {
        try {
            if (!isString(id) || !isNotEmpty(id)) {
                const error = {
                    name: errorslist.errorTypes.validationError,
                    message: fieldKeys.id.tip,
                };

                throw new CustomError(error);
            }

            const [user] = this.#userlist.filter((userEl) => (userEl.id === id));

            if (!user) {
                const error = {
                    name: errorslist.errorTypes.notFound,
                    message: errorslist.errorMessages.idNotFound(id),
                };

                throw new CustomError(error);
            }

            return user;
        } catch (err) {
            console.warn(err.shortMessage);
            return null;
        }
    }

    static verify(obj) {
        const checkData = User.validate(obj);
        const isValid = checkAppropriate(checkData.verified);

        return { isValid, checkData };
    }

    add(username, login, password, img) {
        const userObj = new User({
            username, login, password, img,
        });

        const isValid = UserCollector.verify(userObj);
        const isFree = isLoginFree(login, this.#userlist);

        if (isValid && isFree) {
            this.#userlist = [...this.#userlist, userObj];
        }

        return isValid;
    }

    edit(id, { username, newPass, img }) {
        const editableUser = this.get(id);

        if (!editableUser || !isCurrentUser(this.user, editableUser.name, false)) return false;

        const updatedTask = {
            id: editableUser.id,
            createdAt: editableUser.createdAt,
            username: username ?? editableUser.username,
            password: newPass ?? editableUser.password,
            img: img ?? editableUser.img,
        };

        const isValid = TaskCollector.verify(updatedTask);

        if (isValid) {
            editableUser.username = updatedTask.username;
            editableUser.newPass = updatedTask.newPass;
            editableUser.img = updatedTask.img;
        }

        return isValid;
    }

    remove(id) {
        const removableUser = this.get(id);
        if (!removableUser || !isCurrentUser(this.#user, removableUser.username, false)) return false;

        const indexOfRemUser = this.#userlist.indexOf(removableUser);
        this.#userlist = [...this.#userlist.slice(0, indexOfRemUser), ...this.#userlist.slice(indexOfRemUser + 1)];

        return true;
    }

    addAll(users) {
        const invalidUsers = users.filter((user) => {
            const isUserValid = UserCollector.verify(user);
            const isFree = isLoginFree(user.login, this.#userlist);

            if (isUserValid && isFree) {
                this.#userlist = [...this.userlist, user];
            }

            return !isUserValid && !isFree;
        });
        return invalidUsers;
    }

    clear() {
        this.#userlist = [];
    }
}
