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
    constructor(task, isFullpriority = false) {
        super();

        this.task = task;
        this.attrComments = 'attr-comments';
        this.isFullPriority = isFullpriority;

        this.init();
    }

    init() {
        const taskInfoFragment = document.createDocumentFragment();
        const privacyIcon = document.createElement('span');
        const priorityIcon = document.createElement('span');
        const commentIcon = new TaskComments(this.task.comments);

        this.node.classList.add(styles.taskInfo);

        const privacyIconStyle = this.task.isPrivate ? styles.icons.iprivateLock : styles.icons.ipublicEarth;
        privacyIcon.classList.add(styles.ico);
        privacyIcon.classList.add(privacyIconStyle);

        const [prioritySymbol] = this.task.priority.split('');
        priorityIcon.textContent = this.isFullPriority
            ? this.task.priority.toUpperCase()
            : prioritySymbol.toUpperCase();

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

        taskInfoFragment.appendChild(this.node);

        this.node.appendChild(privacyIcon);
        this.node.appendChild(priorityIcon);
        this.node.appendChild(commentIcon.node);
    }
}
