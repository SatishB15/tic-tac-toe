let cells = Array(9).fill(null);
let xIsNext = true;

function handleClick(index) {
    if (cells[index] || calculateWinner(cells) || isDraw(cells)) {
        return;
    }

    cells[index] = xIsNext ? 'X' : 'O';
    render();
    xIsNext = !xIsNext;
}

/**
 * @description Function is used to calculate the results for winner
 * @param {*} cells 
 */
function calculateWinner(cells) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }

    return null;
}

/**
 * @description Function is used to check the draw condition
 * @param {*} cells 
 * @returns {boolean}
 */
function isDraw(cells) {
    return cells.every(cell => cell !== null);
}

/**
 * @description Function is used to render the board on scree
 */
function render() {
    const board = document.getElementById('board');
    for (let i = 0; i < cells.length; i++) {
        const cell = board.children[i];
        cell.innerText = cells[i];
    }

    const nextPlayer = xIsNext ? 'O' : 'X';
    const turnText = document.getElementById('turn');
    turnText.innerText = `Next Player Turn: ${nextPlayer}`;

    const winner = calculateWinner(cells);
    if (winner) {
        alert(`${winner} wins!`);
        resetGame();
    } else if (isDraw(cells)) {
        alert("It's a draw!");
        resetGame();
    }
}

/**
 * @description Function is used to reset the cells
 */
function resetGame() {
    cells = Array(9).fill(null);
    xIsNext = false;
    render();
}