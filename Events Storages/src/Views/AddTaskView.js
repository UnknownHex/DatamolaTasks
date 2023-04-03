class AddTaskView extends BaseView {
    constructor(containerId, { userlist, assignee }) {
        super(containerId);

        this.authForm = document.createElement('form');
        this.userlist = userlist;
        this.assignee = assignee;

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
        title.textContent = 'Add task';
        const closeForm = document.createElement('span');
        closeForm.classList.add(styles.ico);
        closeForm.classList.add(styles.icons.iclose);
        closeForm.classList.add(styles.close);
        formCaption.appendChild(title);
        formCaption.appendChild(closeForm);

        const taskName = new CustomInput({
            name: 'name',
            label: 'Task name',
            isRequired: true,
        });

        const description = new CustomInput({
            name: 'description',
            label: 'Task description',
            isRequired: true,
        });

        const assignee = new Select({
            avaliableUsers: this.userlist,
            assignee: this.assignee,
            name: fieldKeys.assignee.key,
        });

        const publicBtn = new Button({
            classNames: [styles.btn, styles.primary],
            icon: styles.icons.ipublicEarth,
            name: fieldKeys.isPrivate.key,
            dataset: 'false',
        });
        const privateBtn = new Button({
            classNames: [styles.btn, styles.primary],
            icon: styles.icons.iprivateLock,
            name: fieldKeys.isPrivate.key,
            dataset: 'true',
        });
        const privacyGroupBtn = new ButtonGroup({ 
            buttons: [publicBtn, privateBtn],
            commonStyle: styles.btnGroup,
        });



        const submit = new Button({
            caption: 'Create task',
            type: 'sumbit',
            classNames: [styles.primary, styles.btn, styles.filled],
        });

        const signUpLink = document.createElement('a');
        signUpLink.classList.add(styles.link);
        signUpLink.textContent = 'Sign UP';
        signUpLink.href = 'null';

        this.authForm.appendChild(formCaption);
        this.authForm.appendChild(taskName.node);
        this.authForm.appendChild(description.node);
        this.authForm.appendChild(assignee.node);
        this.authForm.appendChild(privacyGroupBtn.node);
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

        signUpLink.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('link');
        });

        this.render(template);
    }
}
