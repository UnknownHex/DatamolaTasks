class Select extends BaseElement {
    constructor({ avaliableUsers, assignee }) {
        super('div');

        this.avaliableUsers = avaliableUsers;
        this.assignee = assignee || '';

        this.init();
    }

    init() {
        this.node.classList.add(styles.inp);
        this.node.classList.add(styles.sel);

        this.node.innerHTML = `
            <select required>
                <option value="${this.assignee}" disabled selected ${this.assignee || 'hidden'}>
                    ${this.assignee}
                </option>
            ${this.avaliableUsers.map((user) => (`
                <option value=${user.login}>${user.name}</option>
            `)).join('')}
            </select>
            <button class="${styles.ico} ${styles.icons.iexpand}"></button>
            <span class="${styles.border}"></span>
            <label class="${styles.inpCaption}">Select ASSIGNEE...</label>
        `;
    }
}
