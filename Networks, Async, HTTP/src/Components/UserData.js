/*
    <div class="user-data">
        <div class="avatar">
            <img src="./assets/images/user-photo.avif" alt="user avatar">
        </div>
        <span class="user-name">Erin Schleifer</span>
    </div>

    <div class="userinfo">
        <div class="avatar">
            <img src="./assets/images/user-photo.avif">
        </div>
        <div class="userinfo-data">
            <div class="user-name">Erin Schleifer</div>
            <div class="user-date">24.05.2023 14:24</div>
        </div>
    </div>
*/
class UserData extends BaseElement {
    constructor({
        user,
        isInfo,
        createdAt,
    }) {
        super();

        this.user = user;
        this.isInfo = !!isInfo;
        this.createdAt = createdAt;
        this.avatara = this.decodePhoto(this.user?.photo) || STANDARD_IMG;
        this.init()
        // `data:image/png;base64,${atob(this.user?.photo)}`
        // console.log(btoa(this.user?.photo));
    }

    decodePhoto(photo) {
        const ava = atob(photo);
        if (ava.includes('data:image/')) {
            return ava;
        }

        return `data:image/png;base64,${this.user?.photo}`;
    }

    init() {
        const userDataFragment = document.createDocumentFragment();
        const avatarDiv = document.createElement('div');
        const img = document.createElement('img');
        const spanUserName = document.createElement('span');

        avatarDiv.classList.add(styles.avatar);
        spanUserName.classList.add(styles.userName);

        spanUserName.textContent = this.user?.userName;

        img.setAttribute('src', this.avatara);
        img.setAttribute('alt', 'User avatar');

        avatarDiv.appendChild(img);

        userDataFragment.appendChild(avatarDiv);

        switch (this.isInfo) {
        case true: {
            const divUserData = document.createElement('div');
            const spanTimestamp = document.createElement('span');
            const time = document.createElement('time');
            const dateFormat = formatDate(new Date(this.createdAt));

            divUserData.classList.add(styles.userinfoData);
            spanTimestamp.classList.add(styles.userDate);

            time.setAttribute('datetime', this.createdAt);
            time.textContent = dateFormat;

            spanTimestamp.appendChild(time);

            divUserData.appendChild(spanUserName);
            divUserData.appendChild(spanTimestamp);

            this.node.classList.add(styles.userinfo);
            userDataFragment.appendChild(divUserData);
            break;
        }
        case false:
            this.node.classList.add(styles.userData);
            userDataFragment.appendChild(spanUserName);
            break;
        default:
            this.node.appendChild(userDataFragment);
        }

        this.node.appendChild(userDataFragment);
    }
}
