document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const turnBox = document.querySelector('.bg');
    const results = document.getElementById('results');
    const playAgainButton = document.getElementById('Play-again');
    
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    // Winning combinations
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Handle cell click
    function handleCellClick(clickedCell, clickedCellIndex) {
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerText = currentPlayer;
        checkResult();
    }

    // Check game result
    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                highlightWinningCells(winCondition);
                break;
            }
        }

        if (roundWon) {
            results.innerText = `${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }

        // Check for draw
        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            results.innerText = "Draw!";
            gameActive = false;
            return;
        }

        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        moveBackground();
    }

    // Highlight winning cells
    function highlightWinningCells(winCondition) {
        winCondition.forEach(index => {
            boxes[index].classList.add('winning-cell');
        });
    }

    // Move background to indicate the current player's turn
    function moveBackground() {
        if (currentPlayer === 'X') {
            turnBox.style.transform = 'translateX(0px)';
        } else {
            turnBox.style.transform = 'translateX(85px)';
        }
    }

    // Restart game
    function restartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ["", "", "", "", "", "", "", "", ""];
        boxes.forEach(cell => {
            cell.innerText = "";
            cell.classList.remove('winning-cell');
        });
        results.innerText = '';
        moveBackground();
    }

    // Add event listeners to cells
    boxes.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(cell, index));
    });

    // Add event listener to the play again button
    playAgainButton.addEventListener('click', restartGame);
});
