class TicTacToe {
    constructor(id) {
        this.container = document.getElementById(id);
        this.move = true;
        this.cells = document.querySelectorAll('.cell');

        this.nought = 'nought';
        this.cross = 'cross';

        this.crossIdxs = [];
        this.noughtIdxs = [];

        this.init();
    }

    init() {
        this.cells.forEach((cell, idx) => {
            cell.classList.add('cell-numb');
            cell.dataset.numb = idx;
        });


        this.container.addEventListener('click', (event) => {
            if (event.target.classList.contains('cell')) {
                this.playerMove(event.target);
            }
        });
    }

    checkWin() {
        this.checkDiagonals(this.nought);
        this.checkDiagonals(this.cross);
        this.checkRows(this.nought);
        this.checkRows(this.cross);
        this.checkColums(this.nought);
        this.checkColums(this.cross);
    }

    checkDiagonals(elem) {
        let left = true;
        let right = true;

        for (let i = 0; i <= 9; i += 4) {
            left = left && this.cells[i].classList.contains(elem);
        }


        for (let i = 2; i <= 7; i += 2) {
            right = right && this.cells[i].classList.contains(elem);
        }

        left || right && console.log('WIN', elem);
        return left || right;
    }

    checkRows(elem) {
        for (let i = 0; i <= 6; i += 3) {
            let isWin = true;
            for (let j = 0; j < 3; j++) {
                isWin = isWin && this.cells[i+j].classList.contains(elem);
            }

            isWin && console.log('WIN!', elem);
        }
    }

    checkColums(elem) {
        for (let i = 0; i < 3; i++) {
            let isWin = true;
            for (let j = 0; j <= 6; j += 3) {
                isWin = isWin && this.cells[i+j].classList.contains(elem);
            }

            isWin && console.log('WIN!', elem);
        }
    }

    changeTurn() {
        this.move = !this.move;
    }

    setPlayerLabel(target) {
        target.classList.add(this.move ? 'cross' : 'nought');
    }

    playerMove(target) {
        this.setPlayerLabel(target);
        this.changeTurn();

        this.checkWin();
    }
}
