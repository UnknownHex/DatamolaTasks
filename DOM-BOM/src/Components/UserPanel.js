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
        this.notification = document.createElement('div');

        this.init();
    }

    init() {
        if (this.user) {
            const userData = new UserData({ user: this.user, avatara: this.avatara });
            const logoutBtn = new Button({
                caption: 'logout',
                classNames: [styles.btn, styles.primary],
                type: 'button',
            });

            this.notification.classList.add(styles.notification);
            this.node.classList.add(styles.userPanel);

            this.node.appendChild(this.notification);
            this.node.appendChild(userData.node);
            this.node.appendChild(logoutBtn.node);
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
        console.log(this.node.childNodes);

        this.init();
    }
}
