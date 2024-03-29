class TaskModalView extends BaseView {
    init(task) {
        this.addTaskForm = document.createElement('form');
        this.task = task;

        this.taskState = {
            isPrivate: task ? task.isPrivate : false,
            status: task ? task.status : taskStatus.toDo,
            priority: task ? task.priority : taskPriority.medium,
        };
    }

    display(task, container) {
        this.init(task);
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
                const isPrivateName = targetBtn.name === fieldKeys.isPrivate.key;
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

        const assignee = new Select({
            avaliableUsers: this.userlist,
            assignee: this.task?.assignee.id || LocalStorage.findUser(fieldKeys.id.key, LocalStorage.getUser())?.id,
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

        if (this.task) {
            const setActiveClass = (btnArray, val) => {
                btnArray.forEach((btn) => {
                    btn.node.classList.remove(styles.active);
                    const btnName = btn.node.name;
                    const btnValue = btnName === fieldKeys.isPrivate.key
                        ? !!btn.node.dataset.data
                        : btn.node.dataset.data;
                    val === btnValue && btn.node.classList.add(styles.active);
                });
            };
            taskName.input.value = this.task.name;
            textarea.value = this.task.description;
            assignee.select.value = this.task.assignee.id;
            setActiveClass([publicBtn, privateBtn], this.task.isPrivate);
            setActiveClass([lowBtn, medBtn, highBtn], this.task.priority);
            setActiveClass([toDoBtn, inProgBtn, complBtn], this.task.status);
            submit.node.textContent = 'Edit task';
        }

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
                ...this.task,
                name: taskName,
                description: textarea,
                assignee: assignee.select.value,
                options: this.taskState,
            };

            this.task
                ? event.target.dispatchEvent(customEvents.editTask.action(data))
                : event.target.dispatchEvent(customEvents.addTask.action(data));
        });

        closeForm.addEventListener('click', (event) => {
            event.target.dispatchEvent(customEvents.closeModal.action);
        });

        container.appendChild(template);
    }
}
