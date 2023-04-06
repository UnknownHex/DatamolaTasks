class FooterView extends BaseView {
    constructor(containerId) {
        super(containerId);

        this.init();
    }

    init() {
        const template = document.createElement('template');

        template.innerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-wrapper">
                    <div class="appname">
                        <div>
                            <span class="caption">${consts.appName}</span>
                            <span class="version">v${consts.version} (${consts.update})</span>
                        </div>
                        <a class="contact" href="mailto:Koti4Matroskin@gmail.com">
                            <span class="mailto"></span>Koti4Matroskin@gmail.com
                        </a>
                    </div>
                    <div class="copyright">
                        <p>Rostislav Vadimovich © 2023</p>
                    </div>
                </div>
            </div>
        </footer>
        `;

        this.render(template.content);
    }
}
