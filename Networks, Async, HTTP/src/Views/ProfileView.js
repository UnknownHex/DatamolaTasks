class ProfileView extends BaseView {
    constructor(containerId) {
        super(containerId);

        this.isEditable = false;
        this.fragment = document.createDocumentFragment();
        this.userLogin = document.createElement('p');
        this.userName = document.createElement('p');

        this.defaultState = {};

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

    controlBlock() {
        const controlBlock = document.createElement('div');
        const imageBlock = document.createElement('div');

        const btnBlock = document.createElement('div');
        btnBlock.classList.add(styles.btnBlock);

        const selectedImage = document.createElement('img');
        selectedImage.classList.add(styles.emptyAvatar);
        selectedImage.classList.add(styles.icons.iavatar);
        selectedImage.classList.add(styles.selectedImage);

        const selectImgFantom = document.createElement('input');
        selectImgFantom.type = 'file';
        selectImgFantom.accept = 'image/png, image/jpeg';

        selectImgFantom.addEventListener('change', (event) => {
            const [file] = event.target.files;
            const reader = new FileReader();
            reader.onload = (rEvent) => {
                this.selectedImage = rEvent.target.result;
                selectedImage.src = this.selectedImage;
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
                this.regForm.reset();
                this.selectedImage = null;
                selectedImage.src = '';
                selectedImage.classList.add(styles.icons.iavatar);
                selectedImage.classList.add(styles.emptyAvatar);
                confirmBtn.node.classList.remove(styles.filled);
                confirmBtn.node.disabled = true;
            },
        });
        btnBlock.appendChild(selectImgBtn.node);
        btnBlock.appendChild(resetBtn.node);
        btnBlock.appendChild(confirmBtn.node);

        controlBlock.classList.add(styles.controlBlock);
        controlBlock.appendChild(imageBlock);
        controlBlock.appendChild(btnBlock);

        return controlBlock;
    }

    initForm() {
        this.regForm = document.createElement('form');
        this.regForm.method = 'POST';
        this.regForm.classList.add(styles.regForm);
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
                console.log('edit');
                this.showEditMode(userObj);
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
        const container = new Container();
        const brBar = this.linkToTaskfeed();
        const loginHeader = this.loginHeader(userObj.login);

        const name = new CustomInput({
            name: 'name',
            label: 'Name',
            isRequired: true,
            value: userObj.userName,
            onchange: (e) => { this.nameValue = e.target.value; },
        });

        const password = new CustomInput({
            name: 'password',
            type: 'password',
            label: 'Password',
            isRequired: true,
            icon: styles.icons.ieyeSlash,
            onchange: (e) => { this.passValue = e.target.value; },
        });

        const confirmationPass = new CustomInput({
            name: 'confirmPass',
            type: 'password',
            label: 'Password confirmation',
            isRequired: true,
            icon: styles.icons.ieyeSlash,
            onchange: (e) => { this.confirmValue = e.target.value; },
        });

        this.regForm.appendChild(name.node);
        this.regForm.appendChild(password.node);
        this.regForm.appendChild(confirmationPass.node);

        container.node.appendChild(this.regForm);
        container.node.appendChild(loginHeader);

        this.fragment.appendChild(container.node);

        this.render(this.fragment);
    }

    setDefaults(user) {
        this.defaultState = {
            photo: user.photo,
            userName: user.userName,
            password: '',
            confirm: '',
        };
    }

    display(user, mode) {
        this.showReadMode(user);
        this.render(this.fragment);
    }
}
