class User {
    #id;
    #login;
    #password;
    #createdAt;
    static passwordMinLen = 4;
    static usernameLen = 32;
    static loginLen = 32;

    constructor({ username, login, password, img }) {
        this.#id = crypto.randomUUID();
        this.#login = login;
        this.#password = password;
        this.name = username;
        this.img = img;
        this.#createdAt = new Date();
    }

    get info() {
        return {
            id: this.#id,
            name: this.name,
            login: this.#login,
            password: this.#password,
            createdAt: this.#createdAt,
            img: this.img,
        }
    }

    get id() {
        return this.#id;
    }

    get login() {
        return this.#login;
    }

    set login(login) {
        this.#login = login;
    }

    get password() {
        return this.#password;
    }

    set password(pass) {
        this.#password = pass;
    }

    get createdAt() {
        return this.#createdAt;
    }

    static validate({ id, name, login, password, img, createdAt }) {
        const verified = {
            id: isString(id) && isNotEmpty(id),
            name: isString(name) && isNotEmpty(name) && isLengthValid(name, User.usernameLen),
            login: isString(login) && isNotEmpty(login) && isLengthValid(login, User.loginLen) && isLoginValid(login),
            password: isString(password) && isNotEmpty(password) && isMinLenValid(password, User.passwordMinLen),
            createdAt: isDate(createdAt),
            image: isString(img),
        };

        const fullInfo = analizeObjErrors(verified);

        return { verified, fullInfo };
    }
}