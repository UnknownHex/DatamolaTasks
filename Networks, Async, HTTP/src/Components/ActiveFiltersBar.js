class ActiveFiltersBar extends BaseElement {
    constructor(activeFilters, assignee) {
        super('section');

        this.activeFilters = activeFilters;
        this.assignee = assignee;

        this.init();
    }

    init() {
        this.node.classList.add(styles.activeFilters);
        const fragment = document.createDocumentFragment();

        Object.entries(this.activeFilters || []).forEach((option) => {
            const [key, value] = option;

            if (!value) return;

            if (Array.isArray(value)) {
                value.forEach((val) => {
                    const badge = new FilterBadge({ key, value: val });
                    fragment.appendChild(badge.node);
                });
            } else {
                const isAssigneeKey = key === fieldKeys.assignee.key;
                const badge = new FilterBadge({ key, value: isAssigneeKey ? this.assignee.name : value });
                fragment.appendChild(badge.node);
            }
        });

        this.node.appendChild(fragment);

        this.node.addEventListener('click', ({ target }) => {
            if (target.classList.contains(styles.icons.iclose)) {
                target.parentNode.dispatchEvent(customEvents.cancelFilterParam.action);
            }
        });
    }
}
