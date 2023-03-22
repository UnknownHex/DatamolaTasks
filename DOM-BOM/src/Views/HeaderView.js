class HeaderView extends BaseElement {
    constructor(containerId) {
        super('header');
        this.containerId = containerId;
        this.userPanel = new UserPanel({});

        this.init();
    }

    init() {
        const container = new Container();
        const headerWrapper = document.createElement('div');
        const logoWrapper = document.createElement('div');
        const logo = document.createElement('div');
        const h1 = document.createElement('h1');
        const burgerBtn = new Button({
            caption: 'burger menu',
            classNames: ['btn', 'burger', 'primary', 'onlyicon'],
            isBurger: true,
        });

        this.node.classList.add(styles.header);
        headerWrapper.classList.add(styles.headerWrapper);
        logoWrapper.classList.add(styles.logoWrapper);
        logo.classList.add(styles.logo);
        h1.classList.add(styles.appCaption);
        h1.appendChild(document.createTextNode(consts.appName));

        headerWrapper.appendChild(burgerBtn.node);
        headerWrapper.appendChild(logoWrapper);
        headerWrapper.appendChild(this.userPanel.node);

        logoWrapper.appendChild(logo);
        logoWrapper.appendChild(h1);

        container.node.appendChild(headerWrapper);

        this.node.appendChild(container.node);

        document.querySelector(`#${this.containerId}`).appendChild(this.node);
    }

    display(params) {
        this.userPanel.update(params);
    }
}
