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
    constructor(containerId, tasklist) {
        super(containerId);

        this.taskBoardsFragment = document.createDocumentFragment();
        this.toDoBoard = new Taskboard({ caption: taskStatus.toDo });
        this.inProgressBoard = new Taskboard({ caption: taskStatus.inProgress });
        this.completeBoard = new Taskboard({ caption: taskStatus.complete });
        this.tasklist = tasklist ?? [];

        this.init();
    }

    init() {
        const taskFeedFragment = document.createDocumentFragment();
        const taskboardWrapper = document.createElement('div');
        const main = document.createElement('main');
        const container = new Container();

        taskFeedFragment.appendChild(main);

        main.appendChild(container.node);
        container.node.appendChild(taskboardWrapper);

        taskboardWrapper.classList.add(styles.boardWrapper);

        this.inProgressBoard.node.classList.add(styles.inprogressTask);
        this.completeBoard.node.classList.add(styles.completeTask);

        this.taskBoardsFragment.appendChild(this.toDoBoard.node);
        this.taskBoardsFragment.appendChild(this.inProgressBoard.node);
        this.taskBoardsFragment.appendChild(this.completeBoard.node);

        taskboardWrapper.appendChild(this.taskBoardsFragment);

        this.render(taskFeedFragment);
    }

    chooseTable(task) {
        switch (task.status.toLowerCase()) {
        case taskStatus.toDo.toLowerCase():
            this.toDoBoard.drawTask(task);
            break;
        case taskStatus.inProgress.toLowerCase():
            this.inProgressBoard.drawTask(task);
            break;
        case taskStatus.complete.toLowerCase():
            this.completeBoard.drawTask(task);
            break;
        default:
            break;
        }
    }

    display({ tasklist, task }) {
        if (Array.isArray(tasklist) && tasklist.length > 0) {
            this.updateTasks(tasklist);
        }

        if (task instanceof Task) {
            this.addTask(task);
        }
    }

    addTask(task) {
        this.tasklist = [...this.tasklist, task];
        this.chooseTable(task);

        this.update();
    }

    updateTasks(tasklist) {
        this.tasklist = tasklist;

        this.tasklist.forEach((task) => {
            this.chooseTable(task);
        });

        this.toDoBoard.clear();
        this.inProgressBoard.clear();
        this.completeBoard.clear();

        this.update();
    }

    update() {
        const taskFeedFragment = document.createDocumentFragment();
        const taskboardWrapper = document.createElement('div');

        taskFeedFragment.appendChild(taskboardWrapper);
        taskboardWrapper.appendChild(this.taskBoardsFragment);

        this.toDoBoard.update();
        this.inProgressBoard.update();
        this.completeBoard.update();
    }
}
