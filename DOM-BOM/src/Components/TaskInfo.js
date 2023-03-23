/*
    <div class="task-info">
        <span class="ico iprivate-lock"></span>
        <span class="h-priority">H</span>
        <div class="task-comments">
            <span class="ico icomment"></span>
            <span class="badge" attr-comments="43"></span>
        </div>
    </div>
*/

class TaskInfo extends BaseElement {
    constructor(task) {
        super();

        this.task = task;
        this.attrComments = 'attr-comments';

        this.init();
    }

    init() {
        const taskInfoFragment = document.createDocumentFragment();
        const privacyIcon = document.createElement('span');
        const priorityIcon = document.createElement('span');
        const fullCommentsIcon = document.createElement('div');
        const commentIcon = document.createElement('span');
        const badge = document.createElement('span');

        this.node.classList.add(styles.taskInfo);

        const privacyIconStyle = this.task.isPrivate ? styles.icons.iprivateLock : styles.icons.ipublicEarth;
        privacyIcon.classList.add(styles.ico);
        privacyIcon.classList.add(privacyIconStyle);

        const [prioritySymbol] = this.task.priority.split('');
        priorityIcon.textContent = prioritySymbol.toUpperCase();

        switch (this.task.priority) {
        case taskPriority.low:
            priorityIcon.classList.add(styles.lPriority);
            break;
        case taskPriority.medium:
            priorityIcon.classList.add(styles.mPriority);
            break;
        case taskPriority.high:
            priorityIcon.classList.add(styles.hPriority);
            break;
        default:
            break;
        }

        fullCommentsIcon.classList.add(styles.taskComments);

        commentIcon.classList.add(styles.ico);
        commentIcon.classList.add(styles.icons.icomment);

        badge.classList.add(styles.badge);
        badge.setAttribute(this.attrComments, this.task.comments.length);

        taskInfoFragment.appendChild(this.node);

        fullCommentsIcon.appendChild(commentIcon);
        fullCommentsIcon.appendChild(badge);

        this.node.appendChild(privacyIcon);
        this.node.appendChild(priorityIcon);
        this.node.appendChild(fullCommentsIcon);
    }
}
