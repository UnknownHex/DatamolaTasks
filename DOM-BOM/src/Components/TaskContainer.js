/*
    <div class="task-container">
        <div class="task">
            <div class="task-header">
                                                    <div class="task-info">
                                                        <span class="ico iprivate-lock"></span>
                                                        <span class="h-priority">H</span>
                                                        <div class="task-comments">
                                                            <span class="ico icomment"></span>
                                                            <span class="badge" attr-comments="43"></span>
                                                        </div>
                                                    </div>
                <div>
                    <div class="task-title" contenteditable="true">Lorem, hic excepturi dolorem autem!</div>
                    <div class="task-caption">Lorem iommodi dicta earum.</div>
                </div>
            </div>
            <div class="task-panel">
                                                    <div class="userinfo">
                                                        <div class="avatar">
                                                            <img src="./assets/images/user-photo.avif"></img>
                                                        </div>
                                                        <div class="userinfo-data">
                                                            <div class="user-name">Erin Schleifer</div>
                                                            <div class="user-date">24.05.2023 14:24</div>
                                                        </div>
                                                    </div>
                <div class="task-actions">
                    <button type="button" class="btn secondary onlyicon"><span class="ico idelete"></span></button>
                    <button type="button" class="btn primary onlyicon"><span class="ico iedit"></span></button>
                </div>
            </div>
        </div>
    </div>

    #id;
    #createdAt;
    #name;
    #description;
    #assignee;
    #status;
    #priority;
    #isPrivate;
    #comments;
*/

class TaskContainer extends BaseElement {
    constructor({ task }) {
        super();

        this.taskEnt = task;
    }

    init() {
        const taskFragment = document.createDocumentFragment();
        const task = document.createElement('div');
        const taskHeader = document.createElement('div');
        const taskPanel = document.createElement('div');
        const taskTitle = document.createElement('div');
        const taskCaption = document.createElement('div');
        const taskTextBlock = document.createElement('div');
        const taskActions = document.createElement('div');
        // <button type="button" class="btn secondary onlyicon"><span class="ico idelete"></span></button>
        // <button type="button" class="btn primary onlyicon"><span class="ico iedit"></span></button>
        const editBtn = new Button({
            classNames: [
                styles.btn,
                styles.primary,
                styles.onlyicon,
            ],
            icon: styles.icons.iedit,
        });

        const deleteBtn = new Button({
            classNames: [
                styles.btn,
                styles.secondary,
                styles.onlyicon,
            ],
            icon: styles.icons.idelete,
        });

        this.node.classList.add(styles.taskContainer);
        task.classList.add(styles.task);
        taskHeader.classList.add(styles.taskHeader);
        taskPanel.classList.add(styles.taskPanel);
        taskTitle.classList.add(styles.taskTitle);
        taskCaption.classList.add(styles.taskCaption);
        taskActions.classList.add(styles.taskActions);

        taskTitle.textContent = this.taskEnt.name;
        taskCaption.textContent = this.taskEnt.description;

        taskFragment.appendChild(this.node);

        this.node.appendChild(task);

        task.appendChild(taskHeader);
        task.appendChild(taskPanel);

        taskTextBlock.appendChild(taskTitle);
        taskTextBlock.appendChild(taskCaption);

        taskHeader.appendChild(taskTextBlock);

        taskPanel.appendChild(taskActions);
    }
}
