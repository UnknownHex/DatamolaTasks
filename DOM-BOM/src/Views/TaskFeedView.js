/*
    <div class="taskboard">
        <div class="taskboard-header">
            <div class="taskboard-caption">Complete</div>
            <span class="ico iexpand"></span>
        </div>

        <div class="taskboard-content">
            { A LOT OF TASKS }
        </div>
    </div>
*/

class TaskFeedView extends BaseView {
    constructor(containerId, { caption }) {
        super(containerId);

        this.tableCaption = caption;
        this.taskboardContent = document.createElement('div');
        this.fragmentWithTasks = document.createDocumentFragment();

        this.init();
    }

    init() {
        const taskboardFragment = document.createDocumentFragment();
        const taskboard = document.createElement('section');
        const taskboardHeader = document.createElement('div');
        const taskboardCaption = document.createElement('span');
        const expander = document.createElement('span');

        taskboard.classList.add(styles.taskboard);
        taskboardHeader.classList.add(styles.taskboardHeader);
        taskboardCaption.classList.add(styles.taskboardCaption);
        expander.classList.add(styles.ico);
        expander.classList.add(styles.iexpand);
        this.taskboardContent.classList.add(styles.taskboardContent);

        taskboardFragment.appendChild(taskboard);

        taskboard.appendChild(taskboardHeader);
        taskboard.appendChild(this.taskboardContent);

        taskboardHeader.appendChild(taskboardCaption);
        taskboardHeader.appendChild(expander);

        taskboardCaption.textContent = this.tableCaption;

        this.render(taskboardFragment);
    }

    update(tasklist) {
        this.taskboardContent.children.forEach((child) => child.remove());
    }
}
