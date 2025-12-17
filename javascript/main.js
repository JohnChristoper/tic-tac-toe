document.addEventListener('DOMContentLoaded',() => {
    const cells = document.querySelectorAll(".cell");
    const reset = document.querySelector(".reset-button");

    let gameActive = true;
    let currentPlayer = 'O';
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const handleCellClicked = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.index);

        if(gameState[clickedCellIndex] !== "" || !gameActive){
            return
        }

        gameState[clickedCellIndex] = currentPlayer;

        clickedCell.style.backgroundImage = `url('../assets/images/${currentPlayer}.png')`;
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClicked);
    });
});