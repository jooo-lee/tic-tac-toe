// Create gameboard using module pattern
const gameboard = (() => {
    const gameboardArray = [];
    const rows = 3;
    const columns = 3;

    // Initialize gameboard array
    for (let i = 0; i < rows; i++) {
        gameboardArray.push([]);
        for (let j = 0; j < columns; j++) {
            gameboardArray[i].push("_");
        }
    }

    // Style gameboard array for console output
    const gameboardOutput = gameboardArray
        .map((row) => row.join(" "))
        .join("\n");
    console.log(gameboardOutput);
})();
