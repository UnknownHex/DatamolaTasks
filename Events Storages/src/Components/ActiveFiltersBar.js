class ActiveFiltersBar extends BaseElement {
    constructor(activeFilters) {
        super('section');

        this.activeFilters = activeFilters;

        this.init();
    }

    init() {
        this.node.classList.add(styles.activeFilters);
        const fragment = document.createDocumentFragment();

        Object.entries(this.activeFilters).forEach((option) => {
            const [key, value] = option;
            console.log(key, value);

            const badge = new FilterBadge({ key, value });

            fragment.appendChild(badge.node);
        });

        this.node.appendChild(fragment);
    }
}
