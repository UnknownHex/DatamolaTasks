class BaseView {
    constructor(containerId) {
        this.containerId = containerId;
    }

    render(fragment) {
        document.querySelector(`#${this.containerId}`).appendChild(fragment);
    }
}
