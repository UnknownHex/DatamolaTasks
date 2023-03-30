class FilterView extends BaseView {
    constructor(containerId) {
        super(containerId);

        this.filterFragment = document.createDocumentFragment();
        this.filter = document.createElement('form');
        this.blur = new Blur();
    }

    clear() {
        this.filter.remove();
        this.blur.node.remove();
    }

    display({ filterOpt, avaliableUsers }) {
        if (!filterOpt || !avaliableUsers) {
            console.warn(`FilterView example: 
                filterView.display({
                    filterOpt: { status: '${taskStatus.inProgress}' },
                    avaliableUsers: fakeUsers,
                })
            `);

            return;
        }

        this.clear();

        const {
            assignee,
            dateFrom,
            dateTo,
            status,
            priority,
            isPrivate,
        } = filterOpt;

        const activeStyle = (list, param) => (list?.includes(param) ? styles.active : 'off');

        this.blur = new Blur();
        this.filter = document.createElement('form');
        const selectInp = new Select({
            avaliableUsers,
            assignee,
            name: fieldKeys.assignee.key,
            onChange: (e) => e.target.dispatchEvent(customEvents.getSelectParam.action(e.target)),
        });
        const startDate = new CustomInput({
            name: fieldKeys.dateFrom.key,
            type: 'datetime-local',
            icon: styles.icons.idateTime,
            label: 'Start date',
            isDate: true,
            isRequired: true, // mind this
            value: new Date(dateFrom) || new Date('2000-01-01T00:00'),
            onChange: (e) => e.target.dispatchEvent(customEvents.getSelectParam.action(e.target)),
        });

        const endDate = new CustomInput({
            name: fieldKeys.dateTo.key,
            type: 'datetime-local',
            icon: styles.icons.idateTime,
            label: 'End date',
            isDate: true,
            isRequired: true, // mind this
            value: dateTo ? new Date(dateTo) : Date.now(),
            onChange: (e) => e.target.dispatchEvent(customEvents.getSelectParam.action(e.target)),
        });

        const fieldCaption = document.createElement('p');
        const fieldContainer = document.createElement('div');

        fieldContainer.classList.add(styles.fieldContainer);
        fieldCaption.classList.add(styles.fieldCaption);

        const privacyButtonGroup = document.createElement('div');
        const publicBtn = new Button({
            classNames: [styles.btn, styles.primary, activeStyle(isPrivate, false)],
            icon: styles.icons.ipublicEarth,
            name: fieldKeys.isPrivate.key,
            dataset: 0,
        });
        const privateBtn = new Button({
            classNames: [styles.btn, styles.primary, activeStyle(isPrivate, true)],
            icon: styles.icons.iprivateLock,
            name: fieldKeys.isPrivate.key,
            dataset: 1,
        });
        privacyButtonGroup.classList.add(styles.btnGroup);
        privacyButtonGroup.appendChild(publicBtn.node);
        privacyButtonGroup.appendChild(privateBtn.node);

        const priorityButtonGroup = document.createElement('div');
        const lowBtn = new Button({
            name: fieldKeys.priority.key,
            caption: taskPriority.low,
            classNames: [styles.btn, styles.primary, styles.lprio, activeStyle(priority, taskPriority.low)],
            dataset: taskPriority.low,
        });
        const medBtn = new Button({
            name: fieldKeys.priority.key,
            caption: taskPriority.medium,
            classNames: [styles.btn, styles.primary, styles.mprio, activeStyle(priority, taskPriority.medium)],
            dataset: taskPriority.medium,
        });
        const highBtn = new Button({
            name: fieldKeys.priority.key,
            caption: taskPriority.high,
            classNames: [styles.btn, styles.primary, styles.hprio, activeStyle(priority, taskPriority.high)],
            dataset: taskPriority.high,
        });
        priorityButtonGroup.classList.add(styles.btnGroup);
        priorityButtonGroup.appendChild(lowBtn.node);
        priorityButtonGroup.appendChild(medBtn.node);
        priorityButtonGroup.appendChild(highBtn.node);
        const priorityText = fieldCaption.cloneNode();
        const priorityContainer = fieldContainer.cloneNode();

        priorityText.textContent = 'Priority:';

        priorityContainer.appendChild(priorityText);
        priorityContainer.appendChild(priorityButtonGroup);

        const privacyText = fieldCaption.cloneNode();
        const privacyContainer = fieldContainer.cloneNode();

        privacyText.textContent = 'Privacy:';

        privacyContainer.appendChild(privacyText);
        privacyContainer.appendChild(privacyButtonGroup);

        const actionContainer = fieldContainer.cloneNode();
        const confirmBtn = new Button({
            caption: 'confirm',
            type: 'submit',
            classNames: [styles.btn, styles.primary, styles.filled],
        });
        const resetBtn = new Button({
            caption: 'reset',
            classNames: [styles.btn, styles.secondary],
            icon: styles.icons.iclear,
            onClick: (e) => {
                e.target.dispatchEvent(customEvents.clearFilters.action);
            },
        });
        actionContainer.appendChild(confirmBtn.node);
        actionContainer.appendChild(resetBtn.node);

        const statusButtonGroup = document.createElement('div');
        const toDoBtn = new Button({
            name: fieldKeys.status.key,
            caption: taskStatus.toDo,
            classNames: [styles.btn, styles.primary, activeStyle(status, taskStatus.toDo)],
            dataset: taskStatus.toDo,
        });
        const inProgBtn = new Button({
            name: fieldKeys.status.key,
            caption: taskStatus.inProgress,
            classNames: [styles.btn, styles.primary, activeStyle(status, taskStatus.inProgress)],
            dataset: taskStatus.inProgress,
        });
        const complBtn = new Button({
            name: fieldKeys.status.key,
            caption: taskStatus.complete,
            classNames: [styles.btn, styles.primary, activeStyle(status, taskStatus.complete)],
            dataset: taskStatus.complete,
        });
        statusButtonGroup.classList.add(styles.btnGroup);
        statusButtonGroup.appendChild(toDoBtn.node);
        statusButtonGroup.appendChild(inProgBtn.node);
        statusButtonGroup.appendChild(complBtn.node);
        const statusText = fieldCaption.cloneNode();
        const statusContainer = fieldContainer.cloneNode();

        statusText.textContent = 'Status:';

        statusContainer.appendChild(statusText);
        statusContainer.appendChild(statusButtonGroup);

        const formCaption = fieldCaption.cloneNode();
        const closeForm = document.createElement('span');
        closeForm.classList.add(styles.ico);
        closeForm.classList.add(styles.icons.iclose);
        closeForm.classList.add(styles.close);
        formCaption.textContent = 'Task filter';

        closeForm.addEventListener('click', this.clear.bind(this));

        this.filter.classList.add(styles.taskFilter);

        this.filter.appendChild(formCaption);
        this.filter.appendChild(closeForm);
        this.filter.appendChild(selectInp.node);
        this.filter.appendChild(privacyContainer);
        this.filter.appendChild(priorityContainer);
        this.filter.appendChild(statusContainer);
        this.filter.appendChild(startDate.node);
        this.filter.appendChild(endDate.node);
        this.filter.appendChild(actionContainer);

        // this.filterFragment.appendChild(this.filter);
        this.blur.node.appendChild(this.filter);
        this.filterFragment.appendChild(this.blur.node);

        this.filter.addEventListener('click', (e) => {
            if (e.target.closest('button[name]')) {
                e.target.closest('button')
                    .dispatchEvent(customEvents.getFilterParam.action(e.target.closest('button')));
                e.target.closest('button').classList.toggle(styles.active);
            }
        });

        this.filter.addEventListener('submit', (e) => {
            e.preventDefault();
            e.target.dispatchEvent(customEvents.confirmFilters.action);
        });

        this.render(this.filterFragment);
    }
}
