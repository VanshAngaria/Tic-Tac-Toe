const boxes = document.querySelectorAll('.box');
const button = document.querySelector('.btn');
const gameInfo = document.querySelector('.game-info');

let currentPlayer;
let gameBoard;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the game
function initGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    boxes.forEach((box) => {
        box.innerText = '';
        box.style.pointerEvents = 'all';
        box.style.backgroundColor = ''; // Reset background color
    });
    gameInfo.textContent = `Player ${currentPlayer}'s turn`;
    button.classList.remove("active");
}

initGame();

// Handle box click
function handleClick(index) {
    if (gameBoard[index] === "") {
        boxes[index].textContent = currentPlayer;
        gameBoard[index] = currentPlayer;
        boxes[index].style.pointerEvents = 'none';
        // Check for winner or draw
        if (!checkWinner()) {
            swapTurn();
        }
    }
}

// Check for winner
function checkWinner() {
    let winner = false;
    winningCombos.forEach((combo) => {
        if (
            gameBoard[combo[0]] === gameBoard[combo[1]] &&
            gameBoard[combo[1]] === gameBoard[combo[2]] &&
            gameBoard[combo[0]] !== ''
        ) {
            winner = true;
            gameInfo.textContent = `Player ${gameBoard[combo[0]]} wins!`;
            combo.forEach((index) => {
                boxes[index].style.backgroundColor = 'green'; // Highlight winning boxes
            });
            boxes.forEach((box) => {
                box.style.pointerEvents = 'none';
            });
            button.classList.add("active");
        }
    });

    if (!winner && gameBoard.every((cell) => cell !== '')) {
        gameInfo.textContent = "It's a draw!";
        button.classList.add("active");
        winner = true; // Stop further actions
    }

    return winner;
}

// Swap the player's turn
function swapTurn() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameInfo.textContent = `Player ${currentPlayer}'s turn`;
}

// Add event listeners to each box
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});

// Reset game on button click
button.addEventListener('click', initGame);
