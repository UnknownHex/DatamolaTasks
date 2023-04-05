class TaskView extends BaseView {
    constructor(containerId) {
        super(containerId);

        this.container = new Container();
        this.taskViewFragmen = document.createDocumentFragment();

        this.comments = [];
    }

    init(task, currentUser) {
        this.task = task;
        const assigneeInfo = new UserData({
            user: task.assignee,
            createdAt: task.createdAt,
            isInfo: true,
            avatara: currentUser?.img,
        });
        const userinfo = new UserData({
            user: currentUser.id,
            createdAt: task.createdAt,
            isInfo: true,
            avatara: currentUser?.img,
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
            console.log('sdfsdf');
            if (event.target.closest(`.${styles.spoiler}`)) {
                event.target.closest(`.${styles.spoiler}`).classList.toggle(styles.hide);
            }
        });

                // <div class="${styles.spoiler}">
                //     <div class="${styles.taskHeader}">
                //         Comments
                //         ${taskComments.outerHTML}
                //     </div>
                //     <span class="${styles.ico} ${styles.icons.iexpand}"></span>
                // </div>

        this.commentsSection = document.createElement('div');
        this.commentsSection.classList.add(styles.commentsSection);
        this.commentsSection.innerHTML = this.showComments({ comments: task.comments });

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

        const addCommentBlock = document.createElement('div');
        addCommentBlock.classList.add('add-comment-block');
        const commentData = document.createElement('div');
        commentData.classList.add('comment-data');
        commentData.appendChild(userinfo.node);
        commentData.appendChild(addCommentBtn.node);

        addCommentBlock.appendChild(commentData);
        addCommentBlock.appendChild(commentToTask);
        // `
        //     <div class="add-comment-block">
        //         // <div class="comment-data">

        //         //     ${userinfo.outerHTML}

        //         // // <button type="button" class="btn primary">
        //         // //     <span class="btn-caption">Add comment</span>
        //         // //     <span class="ico icomment"></span>
        //         // // </button>

        //         // </div>
                
        //         // <div class="inp textarea"> 
        //         //     <textarea required></textarea>
        //         //     <label class="inp-caption">You comment...</label>
        //         // </div>
        // </div>`;

        const commentsContainer = document.createElement('div');
        commentsContainer.classList.add(styles.commentsContainer);
        commentsContainer.appendChild(spoiler);
        commentsContainer.appendChild(this.commentsSection);
        commentsContainer.appendChild(addCommentBlock);

        this.container.node.innerHTML = `
            <div class="${styles.fullInfo}">

                <div class="${styles.wrapperShortInfo}">
                    <div class="${styles.todoType}">${task.status}</div>
 
                    ${taskInfo.outerHTML}
                    ${assigneeInfo.outerHTML}

                    ${isCurrentUser(task.assignee, currentUser.id) ? `
                        <div class="${styles.taskActions}">
                            <button type="button" class="btn secondary onlyicon">
                                <span class="ico idelete"></span>
                            </button>
                            <button type="button" class="btn primary">
                                <span class="btn-caption">Edit</span><span class="ico iedit">
                                </span>
                            </button>
                        </div>
                    ` : `
                        <div class="${styles.taskActions}">
                        </div>
                    `}
                    
                </div>

                <div class="${styles.textInfo}">
                    <span class="${styles.taskTitle}">${task.name}</span>
                    <span class="${styles.taskDescription}">${task.description}</span>
                </div>

            </div>
        `;

        this.container.node.prepend(brBar);
        this.container.node.appendChild(commentsContainer);

        this.taskViewFragmen.appendChild(this.container.node);
        this.render(this.taskViewFragmen);
    }

    // eslint-disable-next-line class-methods-use-this
    showComments({ comments }) {
        if (comments.length < 1) return '';
        this.comments = comments.map((comment) => {
            const userinfo = new UserData({
                isInfo: true,
                createdAt: comment.createdAt,
                user: comment.author,
                avatara: LocalStorage.getUser(comment.author).img,
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

    display({ task, currentUser }) {
        this.init(task, currentUser);
    }

    drawComment(commentEnt) {
        const userinfo = new UserData({
            isInfo: true,
            createdAt: commentEnt.createdAt,
            user: commentEnt.author,
            avatara: LocalStorage.getUser(commentEnt.author).img,
        });

        const comment = document.createElement('article');
        const commentText = document.createElement('div');
        commentText.classList.add(styles.commentText);
        commentText.textContent = commentEnt.text;
        comment.classList.add(styles.userComment);
        comment.appendChild(userinfo.node);
        comment.appendChild(commentText);


        this.comments = [...this.comments, comment];
        console.log(this.comments);
    }

    clear() {
        this.container.node.remove();
    }
}
