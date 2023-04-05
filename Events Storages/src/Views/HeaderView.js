class HeaderView extends BaseView {
    constructor(containerId) {
        super(containerId);

        this.userPanel = new UserPanel();

        this.init();
    }

    init() {
        const headerFragment = document.createDocumentFragment();
        const header = document.createElement('header');
        const container = new Container();
        const headerWrapper = document.createElement('div');
        const logoWrapper = document.createElement('div');
        const logo = document.createElement('div');
        const h1 = document.createElement('h1');
        const burgerBtn = new Button({
            classNames: [
                styles.btn,
                styles.burger,
                styles.primary,
                styles.onlyicon,
            ],
            isBurger: true,
        });

        header.classList.add(styles.header);
        headerWrapper.classList.add(styles.headerWrapper);
        logoWrapper.classList.add(styles.logoWrapper);
        logo.classList.add(styles.logo);
        h1.classList.add(styles.appCaption);

        h1.textContent = consts.appName;

        headerWrapper.appendChild(logoWrapper);
        headerWrapper.appendChild(this.userPanel.node);
        headerWrapper.appendChild(burgerBtn.node);

        logoWrapper.appendChild(logo);
        logoWrapper.appendChild(h1);

        container.node.appendChild(headerWrapper);

        header.appendChild(container.node);

        headerFragment.appendChild(header);

        this.render(headerFragment);
    }

    display(params) {
        this.userPanel.update(params);
    }
}
