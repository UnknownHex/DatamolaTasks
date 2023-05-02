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
    constructor(user) {
        super();

        this.user = user ?? null;

        this.init();
    }

    init() {
        this.node.classList.add(styles.userPanel);

        if (this.user) {
            const userPanelFragment = document.createDocumentFragment();
            const notification = document.createElement('div');
            const userData = new UserData({ user: this.user });
            const linkToProfile = document.createElement('a');
            const logoutBtn = new Button({
                caption: 'logout',
                classNames: [styles.btn, styles.primary],
                type: 'button',
                onClick: (e) => {
                    e.target.dispatchEvent(customEvents.logoutUser.action);
                },
            });

            notification.classList.add(styles.notification);
            this.node.classList.add(styles.userPanel);

            linkToProfile.appendChild(userData.node);
            linkToProfile.href = '';
            linkToProfile.addEventListener('click', (event) => {
                event.preventDefault();
                event.target.dispatchEvent(customEvents.openProfile.action);
            });
            userPanelFragment.appendChild(notification);
            userPanelFragment.appendChild(linkToProfile);
            userPanelFragment.appendChild(logoutBtn.node);

            this.node.append(userPanelFragment);
        } else {
            const signInBtn = new Button({
                caption: 'sign in',
                classNames: [styles.btn, styles.primary],
                onClick: (event) => {
                    event.target.dispatchEvent(customEvents.showModal.action);
                },
            });

            this.node.appendChild(signInBtn.node);
        }
    }

    update(user) {
        this.user = user ?? null;

        while (this.node.firstChild) {
            this.node.firstChild.remove();
        }

        this.init();
    }
}
