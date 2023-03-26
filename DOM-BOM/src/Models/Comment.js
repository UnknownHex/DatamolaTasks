// eslint-disable-next-line no-unused-vars
class Comment {
    #id;
    #createdAt;
    #author;
    #text;
    static textMaxLength = 280;

    constructor(text, author) {
        this.#id = crypto.randomUUID();
        this.#createdAt = new Date();
        this.#author = author;
        this.#text = text;
    }

    get id() {
        return this.#id;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get author() {
        return this.#author;
    }

    get text() {
        return this.#text;
    }

    static validate(commentObj) {
        const {
            id,
            text,
            author,
            createdAt,
        } = commentObj;

        const verified = {
            id: isString(id) && isNotEmpty(id),
            author: isNotEmpty(author),
            text: isString(text) && isNotEmpty(text) && isLengthValid(text, Comment.textMaxLength),
            createdAt: isDate(createdAt),
        };

        analizeObjErrors(verified);

        return verified;
    }
}
