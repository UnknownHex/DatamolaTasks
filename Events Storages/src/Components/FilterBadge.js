class FilterBadge extends BaseElement {
    constructor({ key, value }) {
        super();

        this.key = key;
        this.value = value;

        this.init();
    }

    init() {
        if (this.value === null || this.value.length < 1) return;

        const tmpl = document.createDocumentFragment();
        const ico = document.createElement('span');
        ico.classList.add(styles.ico);

        const text = document.createElement('span');
        text.textContent = this.value;

        if (this.key === fieldKeys.assignee.key) {
            ico.classList.add(styles.icons.iavatar);
        }

        if (this.key === fieldKeys.isPrivate.key) {
            const isPrivate = this.value.toString() === 'true';
            const icon = isPrivate ? styles.icons.iprivateLock : styles.icons.ipublicEarth;
            ico.classList.add(icon);
            text.textContent = '';
        }

        if (this.key === fieldKeys.priority.key) {
            if (this.value === taskPriority.low) {
                ico.classList.add(styles.lPriority);
            }
            if (this.value === taskPriority.medium) {
                ico.classList.add(styles.mPriority);
            }
            if (this.value === taskPriority.high) {
                ico.classList.add(styles.hPriority);
            }

            ico.classList.remove(styles.ico);
            ico.textContent = this.value.slice(0, 1);

            text.textContent = '';
        }

        if (this.key === fieldKeys.status.key) {
            ico.classList.add(styles.icons.iaddTask);
            text.textContent = this.value;
        }

        if ((this.key === fieldKeys.dateFrom.key
            || this.key === fieldKeys.dateTo.key)) {
            const date = new Date(this.value);
            ico.classList.add(styles.icons.idateTime);
            text.textContent = formatDate(date);
        }

        const close = document.createElement('span');
        close.classList.add(styles.ico);
        close.classList.add(styles.icons.iclose);

        tmpl.appendChild(ico);
        tmpl.appendChild(text);
        tmpl.appendChild(close);

        this.node.classList.add(styles.filterBadge);
        this.node.dataset.key = this.key;
        this.node.dataset.value = this.value;
        this.node.appendChild(tmpl);
    }

    appendIn(id) {
        document.querySelector(`#${id}`).appendChild(this.node);
    }
}
