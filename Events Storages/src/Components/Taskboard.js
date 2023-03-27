class Taskboard extends BaseElement {
    constructor({ caption }) {
        super('section');

        this.boardStatus = caption;
        this.taskboardContent = document.createElement('div');
        this.fragmentWithTasks = document.createDocumentFragment();
        this.noDataHere = 'No data here yet...';

        this.init();
    }

    init() {
        const taskboardFragment = document.createDocumentFragment();
        const taskboardHeader = document.createElement('div');
        const taskboardCaption = document.createElement('span');
        const expander = document.createElement('span');

        this.node.classList.add(styles.taskboard);
        taskboardHeader.classList.add(styles.taskboardHeader);
        taskboardCaption.classList.add(styles.taskboardCaption);
        expander.classList.add(styles.ico);
        expander.classList.add(styles.icons.iexpand);
        this.taskboardContent.classList.add(styles.taskboardContent);

        taskboardFragment.appendChild(this.node);

        this.node.appendChild(taskboardHeader);
        this.node.appendChild(this.taskboardContent);

        taskboardHeader.appendChild(taskboardCaption);
        taskboardHeader.appendChild(expander);

        taskboardCaption.textContent = this.boardStatus;

        if (this.taskboardContent.childNodes.length < 1) {
            this.taskboardContent.append(this.noDataHere);
        }
    }

    drawTask(task, isAllow) {
        const taskView = new TaskContainer(task, isAllow);
        this.fragmentWithTasks.appendChild(taskView.node);
    }

    update() {
        if (this.taskboardContent.childNodes.length < 1) {
            this.taskboardContent.append(this.noDataHere);
        }

        this.node.appendChild(this.taskboardContent);
    }

    clear() {
        this.taskboardContent.remove();

        this.taskboardContent = document.createElement('div');
        this.taskboardContent.appendChild(this.fragmentWithTasks);
        this.taskboardContent.classList.add(styles.taskboardContent);
    }
}
