class APIService {
    constructor(host) {
        this.token = null;

        this.host = host || null;
    }

    async #request(urn, opt) {
        const path = `${this.host}${urn}`;
        const headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        this.token && headers.append('Authorization', `Bearer ${this.token}`);

        const options = {
            ...opt,
            headers,
        };

        console.log(options);

        const response = await fetch(path, options);
        const json = await response.json();

        const data = {
            json,
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
        };
        console.log(data);
        return data;
    }

    async register(params) {
        // const {
        //     login,
        //     userName,
        //     password,
        //     retypedPassword,
        //     photo,
        // } = params;
        const { urn } = API.endpoints.register;
        const opt = {
            method: API.endpoints.register.method,
            body: JSON.stringify(params),
        };
        try {
            const response = await this.#request(urn, opt);
            return response;
        } catch (err) {
            console.warn(err);
        }
    }

    async getAllUsers() {
        const { urn } = API.endpoints.allUsers;

        try {
            const response = await this.#request(urn);
            
            if (response.ok) {
                LocalStorage.updateTmpUsers(response.json);
            }

            return response;
        } catch (err) {
            console.warn(err);
        }
    }

    async getAllTasks() {
        const { urn } = API.endpoints.tasks;

        try {
            const response = await this.#request(urn);

            if (response.ok) {
                LocalStorage.updateTmpTasks(response.json);
            }

            return response;
        } catch (err) {
            console.warn(err);
        }
    }

    async getTaskById(id) {
        const { urn } = API.endpoints.getTaskById;
        const opt = {
            method: API.endpoints.getTaskById.method,
        };

        try {
            const response = await this.#request(urn(id), opt);
            return response;
        } catch (err) {
            console.warn(err);
        }
    }

    async authLogin(payload) {
        const { login, password } = payload;
        const { urn } = API.endpoints.authLogin;
        const opt = {
            method: API.endpoints.authLogin.method,
            body: JSON.stringify(payload),
        };

        try {
            const response = await this.#request(urn, opt);
            return response;
        } catch (err) {
            console.warn(err);
        }
    }

    async createTask(payload) {
        const {
            name,
            description,
            assignee,
            status,
            priority,
            isPrivate
        } = payload;
        const { urn } = API.endpoints.createTask;
        const opt = {
            method: API.endpoints.createTask.method,
            body: JSON.stringify(payload),
        };

        try {
            const response = await this.#request(urn, opt);
            return response;
        } catch (err) {
            console.warn(err);
        }
    }

    async editTask(id, payload) {
        const {
            name,
            description,
            assignee,
            status,
            priority,
            isPrivate
        } = payload;
        const { urn } = API.endpoints.editTask;
        const opt = {
            method: API.endpoints.editTask.method,
            body: JSON.stringify(payload),
        };

        try {
            const response = await this.#request(urn(id), opt);
            return response;
        } catch (err) {
            console.warn(err);
        }
    }

    async deleteTask(id) {
        const { urn } = API.endpoints.deleteTask;
        const opt = {
            method: API.endpoints.deleteTask.method,
        };

        try {
            const response = await this.#request(urn(id), opt);
            return response;
        } catch (err) {
            console.warn(err);
        }
    }
}
