const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('statusMessage');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

// Winning combinations for Tic-Tac-Toe
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Handle cell click event
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    // Check if the cell is already taken or if the game is inactive
    if (board[clickedIndex] !== '' || !gameActive) {
        return;
    }

    // Update the game state and display
    updateCell(clickedCell, clickedIndex);
    checkForWinner();
}

// Update the clicked cell and change player turns
function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

// Check if there's a winner or a draw
function checkForWinner() {
    let roundWon = false;

    // Check each winning combination
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusMessage.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} Wins!`;
        gameActive = false;
        return;
    }

    // Check for a draw
    if (!board.includes('')) {
        statusMessage.textContent = "It's a Draw!";
        gameActive = false;
    }
}

// Restart the game
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    board = ['', '', '', '', '', '', '', '', ''];
    statusMessage.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
