class Notification extends BaseElement {
    constructor({ type, message }) {
        super('article');

        this.id = crypto.randomUUID();
        this.type = type;
        this.message = message;
        this.dateTime = formatDate(new Date());

        this.init();
    }

    init() {
        const tmpElement = document.createElement('template');
        tmpElement.innerHTML = `
            <p>${this.message}</p>
            <time>${this.dateTime}</time>
        `;

        this.node.appendChild(tmpElement.content);
        this.node.classList.add(styles.notifly);

        switch (this.type) {
        case notiflyVariants.errNoti:
            this.node.classList.add(styles.errNoti);
            break;
        case notiflyVariants.warnNoty:
            this.node.classList.add(styles.warnNoti);
            break;
        case notiflyVariants.infoNoti:
            this.node.classList.add(styles.infoNoti);
            break;
        case notiflyVariants.succNoti:
            this.node.classList.add(styles.succNoti);
            break;
        default:
            break;
        }

        this.node.addEventListener('animationend', () => {
            this.node.remove();
            NotificationView.removeNoti(this.id);
            delete this;
        });
    }
}
