class NotificationView extends BaseView {
    static notifylist = [];
    static notiBox = document.createElement('aside');

    constructor(containerId) {
        super(containerId);

        this.init();
    }

    init() {
        const frag = document.createDocumentFragment();
        NotificationView.notiBox.classList.add(styles.notificationBox);
        NotificationView.notiBox.classList.add(styles.hidden);
        frag.appendChild(NotificationView.notiBox);

        this.render(frag);
    }

    static createNotifly({ type, message }) {
        const noti = new Notification({ type, message });

        NotificationView.notifylist = [...NotificationView.notifylist, noti];
        NotificationView.notiBox.appendChild(noti.node);
        NotificationView.notiBox.classList.remove(styles.hidden);
    }

    static removeNoti(id) {
        const idx = NotificationView.notifylist.findIndex((noti) => noti.id === id);
        const head = NotificationView.notifylist.slice(0, idx);
        const tail = NotificationView.notifylist.slice(idx + 1);

        NotificationView.notifylist = [...head, ...tail];

        if (NotificationView.notifylist < 1) {
            NotificationView.notiBox.classList.add(styles.hidden);
        }
    }
}
