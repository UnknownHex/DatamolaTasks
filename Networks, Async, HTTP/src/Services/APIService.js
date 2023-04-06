class APIService {
    constructor(host) {
        this.token = null;

        this.host = host || null;
    }

    async #request(urn, opt) {
        const path = `${this.host}${urn}`;

        const options = {
            headers: {
                ...opt.headers,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
            },
        };

        const response = await fetch(path, options);
        const json = await response.json();

        const data = {
            json,
            status: response.status,
        };

        console.log(data);

        return data;
    }

    register(params) {
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
            return this.#request(urn, opt);
        } catch (err) {
            console.warn(err);
        }
    }

    async allUsers() {
        const { urn } = API.endpoints.allUsers;

        try {
            const response = await this.#request(urn);
            return response;
        } catch (err) {
            console.warn(err);
        }
    }

    test() {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            login: 'string',
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('http://169.60.206.50:7777/api/user/register', requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));
    }
}
