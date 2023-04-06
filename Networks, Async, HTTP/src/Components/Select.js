class Select extends BaseElement {
    constructor({
        avaliableUsers, assignee, onChange, name, withHidden,
    }) {
        super('div');

        this.avaliableUsers = avaliableUsers;
        this.assignee = assignee || '';
        this.onChange = onChange;
        this.name = name;
        this.withHidden = withHidden ?? true;

        this.init();
    }

    init() {
        this.node.classList.add(styles.inp);
        this.node.classList.add(styles.sel);

        this.select = document.createElement('select');
        this.select.name = this.name || '';
        this.select.required = true;
        const optoinsTemplate = document.createElement('template');
        optoinsTemplate.innerHTML = `
            ${this.withHidden ? `
                <option value="" disabled>
                    ${this.assignee || 'All greatest team'}
                </option>
                <option default value="" ${!this.assignee ? 'selected' : ''}>
                    All greatest team
                </option>
                ` : null}
            ${this.avaliableUsers.map((user) => (`
                <option value=${user.id} ${user.id === this.assignee ? 'selected' : ''}>${user.name}</option>
            `)).join('')}
        `;
        this.select.appendChild(optoinsTemplate.content);

        if (this.onChange) {
            this.select.addEventListener('change', this.onChange.bind(this));
        }

        this.node.innerHTML = `
            <button class="${styles.ico} ${styles.icons.iexpand}"></button>
            <span class="${styles.border}"></span>
            <label class="${styles.inpCaption}">Select ASSIGNEE...</label>
        `;

        this.node.prepend(this.select);
    }
}
