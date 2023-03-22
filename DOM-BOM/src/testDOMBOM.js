const headerView = new HeaderView('main-mount-point');

setTimeout(() => {
    headerView.display({ user: 'Grenkaji Pania' });
}, 3000);

const taskFeedView = new TaskFeedView('main-mount-point', { caption: 'Complete' });

const editBtn = new Button({
    classNames: [
        styles.btn,
        styles.primary,
        styles.onlyicon,
    ],
    icon: styles.icons.iedit,
});

const deleteBtn = new Button({
    classNames: [
        styles.btn,
        styles.secondary,
        styles.onlyicon,
    ],
    icon: styles.icons.idelete,
});

document.body.appendChild(editBtn.node);
document.body.appendChild(deleteBtn.node);
