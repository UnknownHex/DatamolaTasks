/*
    <div class="user-panel">
        <div class="notification"></div>
                                                <div class="user-data">
                                                    <div class="avatar">
                                                        <img src="./assets/images/user-photo.avif" alt="user avatar">
                                                    </div>
                                                    <span class="user-name">Erin Schleifer</span>
                                                </div>
        <button type="button" class="btn primary">Logout</button>
    </div>
*/

class UserPanel extends BaseElement {
    constructor({ user, avatara }) {
        super();
        this.user = user ?? null;
        this.avatara = avatara;

        this.init();
    }

    init() {
        this.node.classList.add(styles.userPanel);

        if (this.user) {
            const userPanelFragment = document.createDocumentFragment();
            const notification = document.createElement('div');
            const userData = new UserData({ user: this.user, avatara: this.avatara });
            const logoutBtn = new Button({
                caption: 'logout',
                classNames: [styles.btn, styles.primary],
                type: 'button',
            });

            notification.classList.add(styles.notification);
            this.node.classList.add(styles.userPanel);

            userPanelFragment.appendChild(notification);
            userPanelFragment.appendChild(userData.node);
            userPanelFragment.appendChild(logoutBtn.node);

            this.node.append(userPanelFragment);
        } else {
            const signInBtn = new Button({
                caption: 'sign in',
                classNames: [styles.btn, styles.primary],
                type: 'button',
            });

            this.node.appendChild(signInBtn.node);
        }
    }

    update({ user, avatara }) {
        this.user = user ?? '';
        this.avatara = avatara;

        while (this.node.firstChild) {
            this.node.firstChild.remove();
        }

        this.init();
    }
}
