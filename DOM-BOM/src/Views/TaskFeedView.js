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
    constructor(containerId) {
        super(containerId);

        this.taskBoardsFragment = document.createDocumentFragment();
        this.taskboardWrapper = document.createElement('div');

        this.container = new Container();

        this.toDoBoard = new Taskboard({ caption: taskStatus.toDo });
        this.inProgressBoard = new Taskboard({ caption: taskStatus.inProgress });
        this.completeBoard = new Taskboard({ caption: taskStatus.complete });

        this.taskboardsGroup = [this.toDoBoard, this.inProgressBoard, this.completeBoard];

        this.init();
    }

    init() {
        const taskFeedFragment = document.createDocumentFragment();

        taskFeedFragment.appendChild(this.container.node);

        this.container.node.appendChild(this.taskboardWrapper);

        this.taskboardWrapper.classList.add(styles.boardWrapper);

        this.inProgressBoard.node.classList.add(styles.inprogressTask);
        this.completeBoard.node.classList.add(styles.completeTask);

        this.taskboardsGroup.forEach((tb) => this.taskBoardsFragment.appendChild(tb.node));

        this.taskboardWrapper.appendChild(this.taskBoardsFragment);

        this.render(taskFeedFragment);
    }

    chooseTable(task, isAllow) {
        switch (task.status.toLowerCase()) {
        case taskStatus.toDo.toLowerCase():
            this.toDoBoard.drawTask(task, isAllow);
            break;
        case taskStatus.inProgress.toLowerCase():
            this.inProgressBoard.drawTask(task, isAllow);
            break;
        case taskStatus.complete.toLowerCase():
            this.completeBoard.drawTask(task, isAllow);
            break;
        default:
            break;
        }
    }

    display({ tasklist, isTableView, currentUser }) {
        if (Array.isArray(tasklist) && tasklist.length > 0) {
            this.updateTasks(tasklist, currentUser);
        }

        this.clear();
        this.changeView(isTableView);

        const taskFeedFragment = document.createDocumentFragment();
        this.container = new Container();
        this.container.node.appendChild(this.taskboardWrapper);
        taskFeedFragment.appendChild(this.container.node);

        this.render(taskFeedFragment);
    }

    updateTasks(tasklist, currentUser) {
        tasklist.forEach((task) => {
            const isAllow = isCurrentUser(task.assignee, currentUser);
            this.chooseTable(task, isAllow);
        });

        this.taskboardsGroup.forEach((tb) => {
            tb.clear();
            tb.update();
        });
    }

    changeView(isTableView) {
        this.isTableView = isTableView;

        if (this.isTableView) {
            this.taskboardWrapper.classList.add(styles.asTable);
        } else {
            this.taskboardWrapper.classList.remove(styles.asTable);
        }
    }

    clear() {
        this.container.node.remove();
    }
}
