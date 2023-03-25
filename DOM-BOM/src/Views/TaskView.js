class TaskView extends BaseView {
    constructor(containerId) {
        super(containerId);

        this.container = new Container();
        this.taskViewFragmen = document.createDocumentFragment();
    }

    init(task, isAllow) {
        const [avatara] = fakeUsers.filter((user) => (task.assignee === user.name));
        const [myAva] = fakeUsers.filter((user) => (user.name === 'Карэнт Йусер'));
        const assigneeInfo = new UserData({
            user: task.assignee,
            createdAt: task.createdAt,
            isInfo: true,
            avatara: avatara.img,
        });
        const userinfo = new UserData({
            user: 'Карэнт Йусер',
            createdAt: task.createdAt,
            isInfo: true,
            avatara: myAva.img,
        });

        const taskInfo = new TaskInfo(task, true);

        const taskComments = new TaskComments(task.comments);

        this.container.node.innerHTML = `
            <div class="br-bar">
                <a href="/" class="link">Back to main page</a>
            </div>

            <div class="${styles.fullInfo}">

                <div class="${styles.wrapperShortInfo}">
                    <div class="${styles.todoType}">${task.status}</div>
 
                    ${taskInfo.outerHTML}
                    ${assigneeInfo.outerHTML}

                    ${isAllow ? `
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

                <div class="add-comment-block">
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
                </div>
            </div>
        `;

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

    display({ task, isAllow }) {
        this.init(task, isAllow);
    }

    clear() {
        this.container.node.remove();
    }
}
