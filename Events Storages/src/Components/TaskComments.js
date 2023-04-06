class TaskComments extends BaseElement {
    constructor(comments) {
        super();
        console.log(comments);
        this.template = `
                <span class="${styles.ico} ${styles.icons.icomment}"></span>
                <span class="${styles.badge}" attr-comments="${comments.length}"></span>
        `;

        this.init();
    }

    init() {
        this.node.classList.add(styles.taskComments);
        this.node.innerHTML = this.template;
    }
}
