// eslint-disable-next-line no-unused-vars
class TaskCollector {
    #user;
    #tasklist;

    constructor(tasklist) {
        // this.#user = 'Карэнт Йусер';
        this.#user = 'Константина Гон';
        this.#tasklist = tasklist;
    }

    get tasklist() {
        return this.#tasklist;
    }

    get user() {
        return this.#user;
    }

    getPage(skip = 0, top = 10, filterOpt = null) {
        const filteredTasks = filterOpt ? filterTasks(this.tasklist, filterOpt) : null;
        const tasks = filterOpt ? filteredTasks : this.tasklist;
        const sortedTasks = orderByDate(tasks);

        const resTasks = sortedTasks.splice(skip, top);

        return resTasks;
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

            const [task] = this.tasklist.filter((taskElem) => (taskElem.id === id));

            if (!task) {
                const error = {
                    name: errorslist.errorTypes.notFound,
                    message: errorslist.errorMessages.idNotFound(id),
                };

                throw new CustomError(error);
            }

            return task;
        } catch (err) {
            console.warn(err.shortMessage);
            return null;
        }
    }

    static #verify(obj) {
        const verified = Task.validate(obj);
        const isValid = checkAppropriate(verified);

        return isValid;
    }

    add(name, description, assignee, status, priority, isPrivate) {
        const taskObj = new Task(name, description, assignee, status, priority, isPrivate);

        const isValid = TaskCollector.#verify(taskObj);

        if (isValid) {
            this.#tasklist = [...this.tasklist, taskObj];
        }

        return isValid;
    }

    edit(id, name, description, assignee, status, priority, isPrivate) {
        const editableTask = this.get(id);

        if (!editableTask || !isCurrentUser(this.user, editableTask.assignee)) return false;

        const updatedTask = {
            ...editableTask,
            name: name ?? editableTask.name,
            description: description ?? editableTask.description,
            assignee: assignee ?? editableTask.assignee,
            status: status ?? editableTask.status,
            priority: priority ?? editableTask.priority,
            isPrivate: isPrivate ?? editableTask.isPrivate,
        };

        const isValid = TaskCollector.#verify(updatedTask);

        if (isValid) {
            editableTask.name = updatedTask.name;
            editableTask.description = updatedTask.description;
            editableTask.assignee = updatedTask.assignee;
            editableTask.status = updatedTask.status;
            editableTask.priority = updatedTask.priority;
            editableTask.isPrivate = updatedTask.isPrivate;
        }

        return isValid;
    }

    remove(id) {
        const removableTask = this.get(id);
        if (!removableTask || !isCurrentUser(this.user, removableTask.assignee)) return false;

        const indexOfRemTask = this.tasklist.indexOf(removableTask);
        this.#tasklist = [...this.tasklist.slice(0, indexOfRemTask), ...this.tasklist.slice(indexOfRemTask + 1)];

        return true;
    }

    addComment(id, text) {
        const task = this.get(id);

        if (!task) return false;

        const commentObj = new Comment(text, this.user);

        const verified = Comment.validate(commentObj);
        const isValid = checkAppropriate(verified);

        if (isValid) {
            task.comments = [...task.comments, commentObj];
        }

        return isValid;
    }

    addAll(tasks) {
        const invalidTasks = tasks.filter((task) => {
            const isTaskValid = TaskCollector.#verify(task);

            if (isTaskValid) {
                this.#tasklist = [...this.tasklist, task];
            }

            return !isTaskValid;
        });

        return invalidTasks;
    }

    clear() {
        this.#tasklist = [];
    }
}
