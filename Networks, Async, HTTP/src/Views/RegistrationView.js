class RegistrationView extends BaseView {
    constructor(containerId) {
        super(containerId);

        this.regForm = document.createElement('form');
        this.selectedImage = '';

        this.init();
    }

    init() {
        const template = document.createDocumentFragment();
        const container = new Container();
        const formCaption = document.createElement('h3');
        formCaption.textContent = 'Registration';
        this.regForm.method = 'POST';
        this.regForm.classList.add(styles.regForm);

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

        const login = new CustomInput({
            name: 'login',
            label: 'Login',
            isRequired: true,
        });

        const name = new CustomInput({
            name: 'name',
            label: 'Name',
            isRequired: true,
        });

        const password = new CustomInput({
            name: 'password',
            type: 'password',
            label: 'Password',
            isRequired: true,
            icon: styles.icons.ieyeSlash,
        });

        const confirmationPass = new CustomInput({
            name: 'confirmPass',
            type: 'password',
            label: 'Password confirmation',
            isRequired: true,
            icon: styles.icons.ieyeSlash,
        });

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
        selectImgFantom.accept = 'image/png, image/jpg';

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
            caption: 'register',
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

        imageBlock.classList.add(styles.imageFrame);
        imageBlock.appendChild(selectedImage);

        controlBlock.classList.add(styles.controlBlock);
        controlBlock.appendChild(imageBlock);
        controlBlock.appendChild(btnBlock);

        this.regForm.appendChild(formCaption);
        this.regForm.appendChild(login.node);
        this.regForm.appendChild(name.node);
        this.regForm.appendChild(password.node);
        this.regForm.appendChild(confirmationPass.node);
        this.regForm.appendChild(controlBlock);

        container.node.appendChild(brBar);
        container.node.appendChild(this.regForm);

        template.appendChild(container.node);

        this.regForm.addEventListener('input', (event) => {
            if (event.target.closest('input')) {
                const isLocked = this.hasEmptyFields();

                confirmBtn.node.disabled = isLocked;

                if (isLocked) {
                    confirmBtn.node.classList.remove(styles.filled);
                    confirmBtn.node.disabled = true;
                } else {
                    confirmBtn.node.classList.add(styles.filled);
                    confirmBtn.node.disabled = false;
                }
            }
        });

        this.regForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('ALL RIGHT!');
            // { login, name, pass, confirm, img, imgBlob }
            const formInputs = {
                login,
                name,
                pass: password,
                confirm: confirmationPass,
                img: this.selectedImage,
                imgBlob: this.selectedImage,
            };

            event.target.dispatchEvent(customEvents.registerUser.action(formInputs));
        });

        this.render(template);
    }

    hasEmptyFields() {
        const formData = new FormData(this.regForm);
        const isLocked = Array.from(formData.values()).includes('');

        return isLocked;
    }
}
