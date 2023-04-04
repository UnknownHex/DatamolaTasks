class TaskModalView extends BaseView {
    constructor(containerId, { userlist, assignee, task }) {
        super(containerId);

        this.addTaskForm = document.createElement('form');
        this.userlist = userlist;
        this.assignee = assignee;
        this.task = task;

        this.taskState = {
            isPrivate: false,
            status: taskStatus.toDo,
            priority: taskPriority.medium,
        };

        this.init();
    }

    init() {
        this.addTaskForm.method = 'POST';
        this.addTaskForm.classList.add('modal-frame');
        const fieldContainer = document.createElement('div');
        const fieldCaption = document.createElement('p');
        fieldContainer.classList.add(styles.fieldContainer);
        fieldCaption.classList.add(styles.fieldCaption);

        const changeState = (event) => {
            if (event.target.closest('button')) {
                const targetBtn = event.target.closest('button');
                const btnGroup = event.target.closest(`.${styles.btnGroup}`);

                btnGroup.childNodes.forEach((node) => node.classList.remove(styles.active));
                targetBtn.classList.add(styles.active);
                const isPrivateName = targetBtn.name === 'isPrivate';
                this.taskState[targetBtn.name] = isPrivateName ? !!targetBtn.dataset.data : targetBtn.dataset.data;
            }
        };

        const template = document.createDocumentFragment();

        const formCaption = fieldContainer.cloneNode();
        const title = document.createElement('h3');
        title.textContent = this.task ? 'Edit task' : 'Add task';
        const closeForm = document.createElement('span');
        closeForm.classList.add(styles.ico);
        closeForm.classList.add(styles.icons.iclose);
        closeForm.classList.add(styles.close);
        formCaption.appendChild(title);
        formCaption.appendChild(closeForm);

        const taskName = new CustomInput({
            name: 'name',
            label: 'Task name',
            isRequired: true,
        });
        if (this.task?.name) {
            taskName.value = this.task.name;
        }

        const inpDescription = document.createElement('div');
        inpDescription.classList.add(styles.inp);
        inpDescription.classList.add(styles.textarea);
        const textarea = document.createElement('textarea');
        textarea.required = true;
        textarea.name = 'description';
        const label = document.createElement('label');
        label.textContent = 'Description';
        label.classList.add(styles.inpCaption);
        inpDescription.appendChild(textarea);
        inpDescription.appendChild(label);
        console.log(this.assignee);
        const assignee = new Select({
            avaliableUsers: this.userlist,
            assignee: this.assignee.id,
            name: fieldKeys.assignee.key,
            withHidden: false,
        });

        const publicBtn = new Button({
            classNames: [styles.btn, styles.primary, styles.active],
            icon: styles.icons.ipublicEarth,
            name: fieldKeys.isPrivate.key,
            dataset: 0,
        });
        const privateBtn = new Button({
            classNames: [styles.btn, styles.primary],
            icon: styles.icons.iprivateLock,
            name: fieldKeys.isPrivate.key,
            dataset: 1,
        });
        const privacyGroupBtn = new ButtonGroup({
            buttons: [publicBtn, privateBtn],
            commonStyle: styles.btnGroup,
        });

        const lowBtn = new Button({
            name: fieldKeys.priority.key,
            caption: taskPriority.low,
            classNames: [styles.btn, styles.primary, styles.lprio],
            dataset: taskPriority.low,
        });
        const medBtn = new Button({
            name: fieldKeys.priority.key,
            caption: taskPriority.medium,
            classNames: [styles.btn, styles.primary, styles.mprio, styles.active],
            dataset: taskPriority.medium,
        });
        const highBtn = new Button({
            name: fieldKeys.priority.key,
            caption: taskPriority.high,
            classNames: [styles.btn, styles.primary, styles.hprio],
            dataset: taskPriority.high,
        });
        const priorityGroupBtn = new ButtonGroup({
            buttons: [lowBtn, medBtn, highBtn],
            commonStyle: styles.btnGroup,
        });

        const toDoBtn = new Button({
            name: fieldKeys.status.key,
            caption: taskStatus.toDo,
            classNames: [styles.btn, styles.primary, styles.active],
            dataset: taskStatus.toDo,
        });
        const inProgBtn = new Button({
            name: fieldKeys.status.key,
            caption: taskStatus.inProgress,
            classNames: [styles.btn, styles.primary],
            dataset: taskStatus.inProgress,
        });
        const complBtn = new Button({
            name: fieldKeys.status.key,
            caption: taskStatus.complete,
            classNames: [styles.btn, styles.primary],
            dataset: taskStatus.complete,
        });
        const statusGroupBtn = new ButtonGroup({
            buttons: [toDoBtn, inProgBtn, complBtn],
            commonStyle: styles.btnGroup,
        });

        const submit = new Button({
            caption: 'Create task',
            type: 'sumbit',
            classNames: [styles.primary, styles.btn, styles.filled],
        });

        const privacyContainer = fieldContainer.cloneNode();
        const privacyName = fieldCaption.cloneNode();
        privacyName.textContent = 'Privacy:';
        privacyContainer.appendChild(privacyName);
        privacyContainer.appendChild(privacyGroupBtn.node);

        const priorityContainer = fieldContainer.cloneNode();
        const priorityName = fieldCaption.cloneNode();
        priorityName.textContent = 'Priority:';
        priorityContainer.appendChild(priorityName);
        priorityContainer.appendChild(priorityGroupBtn.node);

        const statusContainer = fieldContainer.cloneNode();
        const statusName = fieldCaption.cloneNode();
        statusName.textContent = 'Status:';
        statusContainer.appendChild(statusName);
        statusContainer.appendChild(statusGroupBtn.node);

        privacyGroupBtn.node.addEventListener('click', changeState);
        statusGroupBtn.node.addEventListener('click', changeState);
        priorityGroupBtn.node.addEventListener('click', changeState);

        this.addTaskForm.appendChild(formCaption);
        this.addTaskForm.appendChild(taskName.node);
        this.addTaskForm.appendChild(inpDescription);
        this.addTaskForm.appendChild(assignee.node);
        this.addTaskForm.appendChild(privacyContainer);
        this.addTaskForm.appendChild(priorityContainer);
        this.addTaskForm.appendChild(statusContainer);
        this.addTaskForm.appendChild(submit.node);

        template.appendChild(this.addTaskForm);

        this.addTaskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const data = {
                name: taskName,
                description: textarea,
                assignee: assignee.select.value,
                options: this.taskState,
            };

            event.target.dispatchEvent(customEvents.addTask.action(data));
        });

        closeForm.addEventListener('click', (event) => {
            event.target.dispatchEvent(customEvents.closeModal.action);
        });

        this.render(template);
    }
}
