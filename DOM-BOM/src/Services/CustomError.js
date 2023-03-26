// eslint-disable-next-line no-unused-vars
class CustomError extends Error {
    constructor({ name, message }) {
        super(message);

        this.name = name;
    }

    get shortMessage() {
        return `${this.name}: ${this.message}`;
    }
}
