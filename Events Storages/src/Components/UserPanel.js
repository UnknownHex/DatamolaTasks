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
    constructor({ user }) {
        super();

        this.user = user ?? null;

        this.init();
    }

    init() {
        this.node.classList.add(styles.userPanel);

        if (this.user) {
            const [avatara] = fakeUsers.filter((user) => (this.user === user.name));
            const userPanelFragment = document.createDocumentFragment();
            const notification = document.createElement('div');
            const userData = new UserData({ user: this.user, avatara: avatara?.img });
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

            userPanelFragment.appendChild(notification);
            userPanelFragment.appendChild(userData.node);
            userPanelFragment.appendChild(logoutBtn.node);

            this.node.append(userPanelFragment);
        } else {
            const promptUserName = () => {
                console.log('U can choose from this registered persons:');
                fakeUsers.forEach((user) => console.log('\t', user.name));
                const tmpUser = prompt('Enter user name. (See in debugpanel)', ['Карэнт Йусер']);
                setCurrentUser(tmpUser);
            };
            const signInBtn = new Button({
                caption: 'sign in',
                classNames: [styles.btn, styles.primary],
                onClick: promptUserName,
            });

            this.node.appendChild(signInBtn.node);
        }
    }

    update({ user, avatara }) {
        this.user = user ?? null;

        while (this.node.firstChild) {
            this.node.firstChild.remove();
        }

        this.init();
    }
}
