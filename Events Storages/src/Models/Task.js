// eslint-disable-next-line no-unused-vars
class Task {
    #id;
    #createdAt;
    #name;
    #description;
    #assignee;
    #status;
    #priority;
    #isPrivate;
    #comments;
    static titleMaxLength = 100;
    static descriptionMaxLength = 280;

    constructor(name, description, assignee, status, priority, isPrivate) {
        this.#id = crypto.randomUUID();
        this.#createdAt = new Date();
        this.#comments = [];
        this.#name = name;
        this.#description = description;
        this.#assignee = assignee;
        this.#status = status;
        this.#priority = priority;
        this.#isPrivate = isPrivate;
    }

    get id() {
        return this.#id;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get comments() {
        return this.#comments;
    }

    set comments(commentObj) {
        this.#comments = [...this.comments, commentObj];
    }

    get name() {
        return this.#name;
    }

    set name(nameStr) {
        this.#name = nameStr;
    }

    get description() {
        return this.#description;
    }

    set description(descrStr) {
        this.#description = descrStr;
    }

    get assignee() {
        return this.#assignee;
    }

    set assignee(assigneer) {
        this.#assignee = assigneer;
    }

    get status() {
        return this.#status;
    }

    set status(statusStr) {
        this.#status = statusStr;
    }

    get priority() {
        return this.#priority;
    }

    set priority(priorityStr) {
        this.#priority = priorityStr;
    }

    get isPrivate() {
        return this.#isPrivate;
    }

    set isPrivate(privateBool) {
        this.#isPrivate = privateBool;
    }

    static validate(taskObj) {
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
            id: isString(id) && isNotEmpty(id),
            assignee: isNotEmpty(assignee) && isString(assignee),
            name: isString(name) && isNotEmpty(name) && isLengthValid(name, Task.titleMaxLength),
            description:
                isString(description)
                && isNotEmpty(description)
                && isLengthValid(description, Task.descriptionMaxLength),
            createdAt: isDate(createdAt),
            status: isRightStatus(status),
            priority: isRightPriority(priority),
            isPrivate: isBoolean(isPrivate),
            comments: Array.isArray(comments),
        };

        analizeObjErrors(verified);

        return verified;
    }
}
