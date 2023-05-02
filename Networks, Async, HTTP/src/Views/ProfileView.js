class ProfileView extends BaseView {
    constructor(containerId) {
        super(containerId);

        this.isEditable = false;
        this.fragment = document.createDocumentFragment();
        this.userLogin = document.createElement('p');
        this.userName = document.createElement('p');

        this.nameValue = '';
        this.passValue = '';
        this.confirmValue = '';
        this.selectedImage = '';
    }

    linkToTaskfeed() {
        const brBar = document.createElement('div');
        const backToFeedLink = document.createElement('a');

        brBar.appendChild(backToFeedLink);
        brBar.classList.add(styles.brBar);
        backToFeedLink.classList.add(styles.link);

        backToFeedLink.textContent = 'Back to TaskFeed';
        backToFeedLink.setAttribute('href', '');

        backToFeedLink.addEventListener('click', (event) => {
            event.preventDefault();
            event.target.dispatchEvent(customEvents.showTaskFeed.action);
        });

        return brBar;
    }

    loginHeader(userLogin) {
        const login = document.createElement('div');
        login.classList.add(styles.loginHeader);
        login.appendChild(this.userLogin);
        this.userLogin.textContent = userLogin;

        return login;
    }

    userNameText(userName) {
        const userDiv = document.createElement('div');
        userDiv.appendChild(this.userName);
        this.userName.textContent = userName;

        return userDiv;
    }

    controlBlock(userObj, container) {
        const controlBlock = document.createElement('div');
        const imageBlock = document.createElement('div');

        const btnBlock = document.createElement('div');
        btnBlock.classList.add(styles.btnBlock);

        const selectedImage = document.createElement('img');
        selectedImage.src = decodePhoto(userObj);
        selectedImage.classList.add(styles.selectedImage);

        const selectImgFantom = document.createElement('input');
        selectImgFantom.type = 'file';
        selectImgFantom.accept = 'image/png, image/jpeg';

        const cancelBtn = new Button({
            caption: 'cancel',
            onClick: () => {
                container.node.remove();
                this.display(userObj, false);
            },
        });

        selectImgFantom.addEventListener('change', (event) => {
            const [file] = event.target.files;
            const reader = new FileReader();
            reader.onload = (rEvent) => {
                this.selectedImage = btoa(rEvent.target.result);
                selectedImage.src = rEvent.target.result;
                selectedImage.classList.remove(styles.emptyAvatar);
                selectedImage.classList.remove(styles.icons.iavatar);
            };
            reader.readAsDataURL(file);
        });

        const selectImgBtn = new Button({
            caption: 'select image',
            onClick: () => selectImgFantom.click(),
        });
        const confirmBtn = new Button({
            caption: 'confirm',
            type: 'submit',
            classNames: [styles.btn, styles.primary],
        });
        confirmBtn.node.disabled = true;

        const resetBtn = new Button({
            caption: 'reset',
            classNames: [styles.btn, styles.secondary],
            icon: styles.icons.iclear,
            onClick: () => {
                container.node.remove();
                this.display(this.user, true);
            },
        });
        btnBlock.appendChild(selectImgBtn.node);
        btnBlock.appendChild(resetBtn.node);
        btnBlock.appendChild(cancelBtn.node);
        btnBlock.appendChild(confirmBtn.node);

        imageBlock.classList.add(styles.imageFrame);
        imageBlock.appendChild(selectedImage);

        controlBlock.classList.add(styles.controlBlock);
        controlBlock.appendChild(imageBlock);
        controlBlock.appendChild(btnBlock);

        this.editForm.addEventListener('input', () => {
            const hasEmpty = this.hasEmptyFields();
            confirmBtn.node.disabled = hasEmpty;
        });

        this.editForm.addEventListener('submit', (event) => {
            event.preventDefault();
            event.target.dispatchEvent(customEvents.editProfile.action({
                id: this.user.id,
                userName: this.nameValue,
                password: this.passValue,
                retypedPassword: this.confirmValue,
                photo: this.selectedImage,
            }));
        });

        return controlBlock;
    }

    initForm() {
        this.editForm = document.createElement('form');
        this.editForm.method = 'POST';
        this.editForm.classList.add(styles.regForm);
    }

    showReadMode(userObj) {
        const container = new Container();
        const brBar = this.linkToTaskfeed();
        const readMode = document.createElement('div');
        readMode.classList.add('read-mode');
        const texts = document.createElement('div');
        const loginHeader = this.loginHeader(userObj.login);
        const userName = this.userNameText(userObj.userName);
        const imageBlock = document.createElement('div');
        const selectedImage = document.createElement('img');
        selectedImage.classList.add(styles.selectedImage);
        selectedImage.src = decodePhoto(userObj);
        imageBlock.classList.add(styles.imageFrame);
        imageBlock.appendChild(selectedImage);

        const editBtn = new Button({
            caption: 'edit',
            classNames: [styles.btn, styles.secondary],
            icon: styles.icons.iedit,
            onClick: () => {
                container.node.remove();
                this.display(this.user, true);
            },
        });

        texts.appendChild(loginHeader);
        texts.appendChild(userName);
        texts.appendChild(editBtn.node);

        readMode.appendChild(imageBlock);
        readMode.appendChild(texts);

        container.node.appendChild(brBar);
        container.node.appendChild(readMode);

        this.fragment.appendChild(container.node);
    }

    showEditMode(userObj) {
        this.initForm();
        console.log(userObj);
        this.selectedImage = userObj.photo;
        this.nameValue = userObj.userName;
        const container = new Container();
        const brBar = this.linkToTaskfeed();
        const loginHeader = this.loginHeader(userObj.login);
        const controls = this.controlBlock(userObj, container);

        const name = new CustomInput({
            name: 'name',
            label: 'Name',
            isRequired: true,
            value: userObj.userName,
            onChange: (e) => { this.nameValue = e.target.value; },
        });

        const password = new CustomInput({
            name: 'password',
            type: 'password',
            label: 'Password',
            isRequired: true,
            icon: styles.icons.ieyeSlash,
            onChange: (e) => { this.passValue = e.target.value; },
        });

        const confirmationPass = new CustomInput({
            name: 'confirmPass',
            type: 'password',
            label: 'Password confirmation',
            isRequired: true,
            icon: styles.icons.ieyeSlash,
            onChange: (e) => { this.confirmValue = e.target.value; },
        });

        this.editForm.appendChild(name.node);
        this.editForm.appendChild(password.node);
        this.editForm.appendChild(confirmationPass.node);

        container.node.appendChild(brBar);
        container.node.appendChild(loginHeader);
        container.node.appendChild(this.editForm);
        this.editForm.appendChild(controls);

        this.fragment.appendChild(container.node);
    }

    display(user, mode) {
        this.user = user;
        mode ? this.showEditMode(user) : this.showReadMode(user);
        this.render(this.fragment);
    }

    hasEmptyFields() {
        const formData = new FormData(this.editForm);
        const isLocked = Array.from(formData.values()).includes('');

        return isLocked;
    }
}
