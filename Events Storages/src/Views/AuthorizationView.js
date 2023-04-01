class AuthorizationView extends BaseView {
    constructor(containerId) {
        super(containerId);

        this.authForm = document.createElement('form');

        this.init();
    }

    init() {
        this.authForm.method = 'POST';
        this.authForm.classList.add('modal-frame');
        const fieldContainer = document.createElement('div');
        fieldContainer.classList.add(styles.fieldContainer);

        const template = document.createDocumentFragment();

        const formCaption = fieldContainer.cloneNode();
        const title = document.createElement('h3');
        title.textContent = 'Authorization';
        const closeForm = document.createElement('span');
        closeForm.classList.add(styles.ico);
        closeForm.classList.add(styles.icons.iclose);
        closeForm.classList.add(styles.close);
        formCaption.appendChild(title);
        formCaption.appendChild(closeForm);

        const login = new CustomInput({
            name: 'login',
            label: 'Login',
            isRequired: true,
        });

        const password = new CustomInput({
            name: 'password',
            type: 'password',
            icon: styles.icons.ieyeSlash,
            label: 'Password',
            isRequired: true,
        });

        const submit = new Button({
            caption: 'login',
            type: 'sumbit',
            classNames: [styles.primary, styles.btn, styles.filled],
        });

        const signUpLink = document.createElement('a');
        signUpLink.classList.add(styles.link);
        signUpLink.textContent = 'Sign UP';
        signUpLink.href = '';

        this.authForm.appendChild(formCaption);
        this.authForm.appendChild(login.node);
        this.authForm.appendChild(password.node);
        this.authForm.appendChild(submit.node);
        this.authForm.appendChild(signUpLink);

        template.appendChild(this.authForm);

        this.authForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const data = {
                login,
                password,
            };

            event.target.dispatchEvent(customEvents.loginUser.action(data));
        });

        closeForm.addEventListener('click', (event) => {
            event.target.dispatchEvent(customEvents.closeModal.action);
        });

        this.render(template);
    }
}
