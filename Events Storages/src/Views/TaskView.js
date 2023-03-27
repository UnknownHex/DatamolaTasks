class TaskView extends BaseView {
    constructor(containerId) {
        super(containerId);

        this.container = new Container();
        this.taskViewFragmen = document.createDocumentFragment();
    }

    init(task, currentUser) {
        const [avatara] = fakeUsers.filter((user) => (task.assignee === user.name));
        const [myAva] = fakeUsers.filter((user) => (user.name === currentUser));
        const assigneeInfo = new UserData({
            user: task.assignee,
            createdAt: task.createdAt,
            isInfo: true,
            avatara: avatara?.img,
        });
        const userinfo = new UserData({
            user: currentUser,
            createdAt: task.createdAt,
            isInfo: true,
            avatara: myAva?.img,
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
            showTaskFeedPage(taskCollection.tasklist, taskCollection.user);
        });

        this.container.node.innerHTML = `
            <div class="${styles.fullInfo}">

                <div class="${styles.wrapperShortInfo}">
                    <div class="${styles.todoType}">${task.status}</div>
 
                    ${taskInfo.outerHTML}
                    ${assigneeInfo.outerHTML}

                    ${isCurrentUser(task.assignee, currentUser) ? `
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

            <div class="${styles.commentsContainer}">
                <div class="${styles.spoiler}">
                    <div class="${styles.taskHeader}">
                        Comments
                        ${taskComments.outerHTML}
                    </div>
                    <span class="${styles.ico} ${styles.icons.iexpand}"></span>
                </div>

                <div class="${styles.commentsSection}">
                    ${this.showComments({ comments: task.comments })}
                </div>

        ${currentUser
        ? `<div class="add-comment-block">
                    <div class="comment-data">

                        ${userinfo.outerHTML}

                        <button type="button" class="btn primary">
                            <span class="btn-caption">Add comment</span>
                            <span class="ico icomment"></span>
                        </button>

                    </div>
                    
                    <div class="inp textarea"> 
                        <textarea required></textarea>
                        <label class="inp-caption">You comment...</label>
                    </div>
                </div>`
        : ''}

            </div>
        `;

        this.container.node.prepend(brBar);

        this.taskViewFragmen.appendChild(this.container.node);
        this.render(this.taskViewFragmen);
    }

    // eslint-disable-next-line class-methods-use-this
    showComments({ comments }) {
        if (comments.length < 1) return '';

        return comments.map((comment) => {
            const [avatara] = fakeUsers.filter((user) => (comment.author === user.name));
            const userinfo = new UserData({
                isInfo: true,
                createdAt: comment.createdAt,
                user: comment.author,
                avatara: avatara.img,
            });

            return `
                <article class="${styles.userComment}">
                   ${userinfo.node.outerHTML}
                    <div class="${styles.commentText}">
                    ${comment.text}
                    </div>
                </article>
            `;
        }).join('');
    }

    display({ task, currentUser }) {
        this.init(task, currentUser);
    }

    clear() {
        this.container.node.remove();
    }
}
