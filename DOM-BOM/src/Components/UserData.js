/*
    <div class="user-data">
        <div class="avatar">
            <img src="./assets/images/user-photo.avif" alt="user avatar">
        </div>
        <span class="user-name">Erin Schleifer</span>
    </div>
*/
class UserData extends BaseElement {
    constructor({ user, avatara }) {
        super();
        this.user = user;
        this.avatara = avatara ?? `./assets/base-avas/body-${Math.floor(Math.random() * 4) + 1}.png`;

        this.init();
    }

    init() {
        const userDataFragment = document.createDocumentFragment();
        const avatarDiv = document.createElement('div');
        const img = document.createElement('img');
        const span = document.createElement('span');

        this.node.classList.add(styles.userData);
        avatarDiv.classList.add(styles.avatar);
        span.classList.add(styles.userName);
        span.textContent = this.user;
        img.setAttribute('src', this.avatara);
        img.setAttribute('alt', 'User image');

        avatarDiv.appendChild(img);

        userDataFragment.appendChild(avatarDiv);
        userDataFragment.appendChild(span);

        this.avatarImg = img;
        this.userName = span;

        this.node.appendChild(userDataFragment);
    }
}
