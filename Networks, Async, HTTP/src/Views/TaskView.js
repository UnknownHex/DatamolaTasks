class TaskView extends BaseView {
    constructor(containerId) {
        super(containerId);

        this.container = new Container();

        this.comments = [];
    }

    init(task, currentUser) {
        const taskViewFragmen = document.createDocumentFragment();
        this.container.innerHTML = '';

        this.task = task;
        const assigneeInfo = new UserData({
            user: task.assignee,
            createdAt: task.createdAt,
            isInfo: true,
            avatara: currentUser?.photo,
        });
        const userinfo = new UserData({
            user: currentUser,
            createdAt: task.createdAt,
            isInfo: true,
            avatara: currentUser?.photo,
        });

        const taskInfo = new TaskInfo(task, true);
        const taskComments = new TaskComments(task.comments);

        const brBar = document.createElement('div');
        const backToFeedLink = document.createElement('a');

        brBar.appendChild(backToFeedLink);
        brBar.classList.add(styles.brBar);
        backToFeedLink.classList.add(styles.link);

        backToFeedLink.textContent = 'Back to TaskFeed';
        backToFeedLink.setAttribute('href', '');

        backToFeedLink.addEventListener('click', (event) => {
            event.preventDefault();
            event.target.dispatchEvent(customEvents.showTaskFeed.action);
        });

        const spoiler = document.createElement('div');
        spoiler.classList.add(styles.spoiler);
        spoiler.innerHTML = `
            <div class="${styles.taskHeader}">
                Comments
                ${taskComments.outerHTML}
            </div>
            <span class="${styles.ico} ${styles.icons.iexpand}"></span>
        `;

        spoiler.addEventListener('click', (event) => {
            if (event.target.closest(`.${styles.spoiler}`)) {
                event.target.closest(`.${styles.spoiler}`).classList.toggle(styles.hide);
            }
        });

        this.commentsSection = document.createElement('div');
        this.commentsSection.classList.add(styles.commentsSection);
        this.commentsSection.innerHTML = this.showComments({ comments: task.comments });

        const commentToTask = document.createElement('div');
        commentToTask.classList.add(styles.inp);
        commentToTask.classList.add(styles.textarea);
        const textarea = document.createElement('textarea');
        textarea.required = true;
        textarea.name = 'comment';
        const label = document.createElement('label');
        label.textContent = 'Your comment...';
        label.classList.add(styles.inpCaption);
        commentToTask.appendChild(textarea);
        commentToTask.appendChild(label);

        const addCommentBtn = new Button({
            caption: 'Add comment',
            name: 'comment-submit',
            classNames: [styles.btn, styles.primary],
            icon: styles.icons.icomment,
            onClick: (event) => {
                const data = {
                    text: textarea.value,
                    taskId: this.task.id,
                };
                event.target.dispatchEvent(customEvents.addComment.action(data));
            },
        });

        const addCommentBlock = document.createElement('div');
        addCommentBlock.classList.add('add-comment-block');
        const commentData = document.createElement('div');
        commentData.classList.add('comment-data');
        commentData.appendChild(userinfo.node);
        commentData.appendChild(addCommentBtn.node);

        addCommentBlock.appendChild(commentData);
        addCommentBlock.appendChild(commentToTask);

        const commentsContainer = document.createElement('div');
        commentsContainer.classList.add(styles.commentsContainer);
        commentsContainer.appendChild(spoiler);
        commentsContainer.appendChild(this.commentsSection);
        commentsContainer.appendChild(addCommentBlock);

        const wrapperShInfo = document.createElement('div');
        wrapperShInfo.classList.add(styles.wrapperShortInfo);

        const taskStatus = document.createElement('div');
        taskStatus.classList.add(styles.todoType);
        taskStatus.textContent = task.status;

        wrapperShInfo.appendChild(taskStatus);
        wrapperShInfo.appendChild(taskInfo.node);
        wrapperShInfo.appendChild(assigneeInfo.node);

        const editBtn = new Button({
            caption: 'edit',
            classNames: [
                styles.btn,
                styles.primary,
            ],
            icon: styles.icons.iedit,
            name: 'edit',
        });

        const deleteBtn = new Button({
            classNames: [
                styles.btn,
                styles.secondary,
                styles.onlyicon,
            ],
            icon: styles.icons.idelete,
            name: 'remove',
        });

        const textInfo = document.createElement('div');
        textInfo.classList.add(styles.textInfo);
        textInfo.innerHTML = `
                <span class="${styles.taskTitle}">${task.name}</span>
                <span class="${styles.taskDescription}">${task.description}</span>
        `;

        const fullInfo = document.createElement('div');
        fullInfo.classList.add(styles.fullInfo);
        fullInfo.appendChild(wrapperShInfo);
        fullInfo.appendChild(textInfo);

        const taskActions = document.createElement('div');
        taskActions.classList.add(styles.taskActions);
        if (isCurrentUser(task.creator.id, currentUser.id)) {
            taskActions.appendChild(editBtn.node);
            taskActions.appendChild(deleteBtn.node);
        }

        taskActions.addEventListener('click', (event) => {
            event.stopPropagation();
            event.target.closest('[name="edit"]')
                && event.target.dispatchEvent(customEvents.showTaskModal.action(this.task.id));
            event.target.closest('[name="remove"]')
                && event.target.dispatchEvent(customEvents.deleteTask.action(this.task.id));
        });

        wrapperShInfo.appendChild(taskActions);

        this.container.node.appendChild(brBar);
        this.container.node.appendChild(fullInfo);
        this.container.node.appendChild(commentsContainer);

        taskViewFragmen.appendChild(this.container.node);
        this.render(taskViewFragmen);
    }

    showComments({ comments }) {
        if (comments.length < 1) return '';
        this.comments = comments.map((comment) => {
            const userinfo = new UserData({
                isInfo: true,
                createdAt: comment.createdAt,
                user: comment.creator,
                avatara: comment.creator?.photo,
            });

            return `
                <article class="${styles.userComment}">
                   ${userinfo.node.outerHTML}
                    <div class="${styles.commentText}">
                        ${comment.text}
                    </div>
                </article>
            `;
        });

        return this.comments.join('');
    }

    updateComments() {
        console.log(this.commentsSection);
    }

    display({ task, currentUser }) {
        this.init(task, currentUser);
    }

    clear() {
        this.container.node.remove();
    }
}
