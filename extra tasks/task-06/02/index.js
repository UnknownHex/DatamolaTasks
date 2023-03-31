class TicTacToe {
    constructor(id) {
        this.container = document.getElementById(id);
        this.cells = document.querySelectorAll('.cell');
        this.info = document.querySelector('.info');
        this.btn = document.querySelector('.negame');
        
        this.nought = 'nought';
        this.cross = 'cross';
        this.drop = 'drop';
        
        this.isPlayerTurn = true;
        this.endGameStatus = false;

        this.init();
    }

    init() {
        this.cells.forEach((cell, idx) => {
            cell.classList.add('cell-numb');
            cell.dataset.numb = idx;
        });

        this.container.addEventListener('click', (event) => {
            if (event.target.classList.contains('cell')) {
                this.isPlayerTurn && !this.endGameStatus && this.playerMove(event.target);
            }
        });

        this.btn.addEventListener('click', this.startNewGame.bind(this));
    }

    startNewGame() {
        this.endGameStatus = true;
        this.btn.disabled = true;
        
        const promiseList = [];
        this.cells.forEach((cell) => {
            if (!cell.classList.contains(this.cross) && !cell.classList.contains(this.nought)) return;
            const prom = new Promise((res) => {
                const generateTimeMs = Math.floor(Math.random() * 400) + 30;
                const timeout = setTimeout(() => {
                    const listener = () => {
                        cell.classList.remove(this.nought);
                        cell.classList.remove(this.cross);
                        cell.classList.remove(this.drop);
                        cell.removeEventListener('animationend', listener);
                    };
                    cell.classList.add(this.drop);
                    cell.addEventListener('animationend', listener);
                    res();
                    clearTimeout(timeout);
                    
                }, generateTimeMs);
            });

            promiseList.push(prom);
        });

        Promise.allSettled(promiseList).then(() => {
            setTimeout(() => {
                this.setDefaults();
            }, promiseList.length > 0 ? 400 : 20);
        });
    }

    setDefaults() {
        this.isPlayerTurn = true;
        this.endGameStatus = false;

        this.info.textContent = '';
        this.info.classList.remove(this.nought);
        this.info.classList.remove(this.cross);
        this.btn.disabled = false;
    }

    checkWin(move) {
        this.endGameStatus = 
            this.checkDiagonals(move)
            || this.checkRows(move)
            || this.checkColums(move);

        if (this.endGameStatus) {
            this.info.textContent = `${move}: winner!`;
            this.info.classList.add(move);
        };

        if (this.getFreeCells().length < 1 && !this.endGameStatus) {
            this.info.textContent = 'DRAW GAME!';
            this.endGameStatus = true;
        }
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

        return left || right;
    }

    checkRows(elem) {
        for (let i = 0; i <= 6; i += 3) {
            let isWin = true;
            for (let j = 0; j < 3; j++) {
                isWin = isWin && this.cells[i+j].classList.contains(elem);
            }
            if (isWin) return isWin;
        }
    }

    checkColums(elem) {
        for (let i = 0; i < 3; i++) {
            let isWin = true;
            for (let j = 0; j <= 6; j += 3) {
                isWin = isWin && this.cells[i+j].classList.contains(elem);
            }
            if (isWin) return isWin;
        }
    }

    changeTurn(move) {
        this.checkWin(move);
        if (!this.endGameStatus) {
            this.isPlayerTurn = !this.isPlayerTurn;
            !this.isPlayerTurn && this.randomMove();
        }
    }

    setPlayerLabel(target) {
        target.classList.add(this.isPlayerTurn ? 'cross' : 'nought');
    }

    playerMove(target) {
        this.setPlayerLabel(target);
        this.changeTurn(this.cross);
    }

    getFreeCells() {
        return this.container.querySelectorAll(`.cell:not(.${this.nought}):not(.${this.cross})`);
    }

    randomMove() {
        const freeCells = this.getFreeCells();
        if (!this.endGameStatus) {
            const uiChoose = Math.floor(Math.random() * freeCells.length);
            const timeout = setTimeout(() => {
                if (freeCells.length > 0) {
                    freeCells[uiChoose].classList.add(this.nought);
                }
    
                this.changeTurn(this.nought);
                clearTimeout(timeout);
            }, 400);
        }
    }
}
