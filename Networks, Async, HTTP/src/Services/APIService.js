class APIService {
    constructor(host) {
        this.token = null;

        this.host = host || null;
    }

    async init() {
        const apiUsers = await this.getAllUsers();
        const apiTasks = null;// await this.getAllTasks();

        if (apiTasks?.ok && apiUsers.ok) {
            // LocalStorage.updateTmpTasks(apiTasks.json);
            LocalStorage.updateTmpUsers(apiUsers.json);
        }

        // this.shortPolling();
    }

    shortPolling() {
        const timer = setTimeout(async () => {
            console.log('SHORT POILLING!');
            const apiUsers = await this.getAllUsers();
            const apiTasks = await this.getAllTasks();

            if (apiTasks.ok && apiUsers.ok) {
                LocalStorage.updateTmpTasks(apiTasks.json);
                LocalStorage.updateTmpUsers(apiUsers.json);
            }

            clearTimeout(timer);
            console.log('----------------------------------');
            this.shortPolling();
        }, 350000);
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
        // const { login, password } = payload;
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
        // const {
        //     name,
        //     description,
        //     assignee,
        //     status,
        //     priority,
        //     isPrivate,
        // } = payload;
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
        // const {
        //     name,
        //     description,
        //     assignee,
        //     status,
        //     priority,
        //     isPrivate,
        // } = payload;
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

    async getMyProfile() {
        const { urn } = API.endpoints.myProfile;
        const opt = {
            method: API.endpoints.myProfile.method,
        };

        try {
            const response = await this.#request(urn, opt);
            console.log('MyProfile:', response);
            return response;
        } catch (err) {
            console.warn(err);
        }
    }

    async deleteUser(id) {
        const urn = API.endpoints.deleteUser.urn(id);
        const opt = {
            method: API.endpoints.deleteUser.method,
        };

        try {
            const response = await this.#request(urn, opt);
            console.log('Delete user:', response);
            return response;
        } catch (err) {
            console.warn(err);
        }
    }

    async editUserProfile(id, { userName, password, retypedPassword, photo }) {
        const urn = API.endpoints.editUser.urn(id);
        const opt = {
            method: API.endpoints.editUser.method,
            body: JSON.stringify({
                userName,
                password,
                retypedPassword,
                photo,
            }),
        };

        try {
            const response = await this.#request(urn, opt);
            console.log('edit user:', response);
            return response;
        } catch (err) {
            console.warn(err);
        }
    }

    async postComment({ taskId, text }) {
        const urn = API.endpoints.createComment.urn(taskId);
        const opt = {
            method: API.endpoints.createComment.method,
            body: JSON.stringify({ text }),
        };

        try {
            const response = await this.#request(urn, opt);
            console.log('Post comment:', response);
            return response;
        } catch (err) {
            console.warn(err);
        }
    }
}
