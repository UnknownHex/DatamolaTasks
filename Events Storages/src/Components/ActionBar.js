class ActionBar extends BaseElement {
    constructor(eventDelegation) {
        super('section');

        this.fragment = document.createDocumentFragment();

        this.init();
    }

    init() {
        this.node.classList.add(styles.actionBar);
        const searchGroup = document.createElement('div');
        searchGroup.classList.add(styles.barGroup);
        const actionGroup = searchGroup.cloneNode();

        this.fragment.appendChild(searchGroup);
        this.fragment.appendChild(actionGroup);

        const searchInp = new CustomInput({
            name: 'search',
            icon: styles.icons.isearch,
            label: 'Search',
            isRequired: true,
        });
        this.filterBtn = new Button({
            caption: 'Filter',
            icon: styles.icons.ifilter,
            classNames: [styles.btn, styles.primary],
            onClick: (e) => e.target.dispatchEvent(customEvents.showFilters.action),
        });
        const addTaskBtn = new Button({
            caption: 'Add task',
            icon: styles.icons.iaddTask,
            classNames: [styles.btn, styles.primary],
            onClick: (event) => event.target.dispatchEvent(customEvents.showTaskModal.action()),
        });
        searchGroup.appendChild(searchInp.node);
        searchGroup.appendChild(this.filterBtn.node);
        searchGroup.appendChild(addTaskBtn.node);

        const engBtn = new Button({ caption: 'eng', classNames: [styles.btn, styles.primary], name: 'eng-lang' });
        const rusBtn = new Button({ caption: 'rus', classNames: [styles.btn, styles.primary], name: 'rus-lang' });

        const langChange = (event) => {
            if (event.target.closest('button')) {
                const activeBtn = event.target.closest('button');
                const nodes = event.target.closest('button').parentNode.childNodes;
                nodes.forEach((node) => node.classList.remove(styles.active));
                activeBtn.classList.add(styles.active);
                console.log('Comming soon!');
            }
        };

        const langBtnGroup = new ButtonGroup({
            buttons: [engBtn, rusBtn],
            commonStyle: styles.btnGroup,
            onClick: langChange,
        });

        const tableViewBtn = new Button({
            icon: styles.icons.iviewVertical,
            classNames: [styles.btn, styles.primary, styles.onlyicon, styles.active],
            name: 'table-view',
        });
        const cardViewBtn = new Button({
            icon: styles.icons.iviewHorizontal,
            classNames: [styles.btn, styles.primary, styles.onlyicon],
            name: 'card-view',
        });

        actionGroup.appendChild(langBtnGroup.node);
        actionGroup.appendChild(tableViewBtn.node);
        actionGroup.appendChild(cardViewBtn.node);

        actionGroup.addEventListener('click', (event) => {
            if (event.target.closest('[name="card-view"]')
                || event.target.closest('[name="table-view"]')) {
                event.target.closest(`.${styles.barGroup}`).childNodes.forEach((child) => {
                    child.classList.remove(styles.active);
                });
                event.target.closest(`.${styles.btn}`).classList.add(styles.active);
                event.target.dispatchEvent(customEvents.changeTaskfeedView.action);
            };
        });

        this.node.appendChild(this.fragment);
    }
}
