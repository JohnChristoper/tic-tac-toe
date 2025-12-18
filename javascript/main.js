document.addEventListener('DOMContentLoaded',() => {
    const cells = document.querySelectorAll(".cell");
    const reset = document.querySelector(".reset-button");

    let gameActive = true;
    let currentPlayer = 'O';
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function handleRestartGame() {
        // 1. Reset the game variables
        gameActive = true;
        currentPlayer = "O";
        gameState = ["", "", "", "", "", "", "", "", ""];

        // 2. Clear the images from the cells
        cells.forEach(cell => {
            cell.style.backgroundImage = "";
        });

        console.log("Game Reset!");
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "O" ? "X" : "O";
    }

    function handleResultValidation() {
    let roundWon = false;

        // Check each winning pattern
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            // If any position in the pattern is empty, no one won this pattern
            if (a === '' || b === '' || c === '') {
                continue;
            }

            // If all three match, we have a winner!
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            alert(`Player ${currentPlayer} has won!`);
            gameActive = false;
            return;
        }

        // Check for a draw (no empty spaces left)
        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            alert("Game ended in a draw!");
            gameActive = false;
            return;
        }

        // If no win or draw, change player
        handlePlayerChange();
    }

    const handleCellClicked = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.index);

        if(gameState[clickedCellIndex] !== "" || !gameActive){
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;

        clickedCell.style.backgroundImage = `url('../assets/images/${currentPlayer}.png')`;

        handleResultValidation();
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClicked);
    });

    reset.addEventListener('click', handleRestartGame);
});