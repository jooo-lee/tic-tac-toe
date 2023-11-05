// Create gameboard
const gameboard = (() => {
    const gameboardArray = [];
    const rows = 3;
    const columns = 3;

    // Fill gameboard array with empty strings
    for (let i = 0; i < rows; i++) {
        gameboardArray.push([]);
        for (let j = 0; j < columns; j++) {
            gameboardArray[i].push("");
        }
    }

    console.log(gameboardArray);
})();
