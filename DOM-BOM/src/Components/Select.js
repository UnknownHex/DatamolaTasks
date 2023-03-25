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
            <option value="${this.assignee}" disabled selected ${this.assignee || 'hidden'}>${this.assignee}</option>
            ${this.avaliableUsers.map((user) => (`
                <option value=${user.login}>${user.name}</option>
            `)).join('')}
        </select>
        <button class="ico iexpand"></button>
        <span class="border"></span>
        <label class="inp-caption">Select ASSIGNEE</label>
        `;
    }
}
