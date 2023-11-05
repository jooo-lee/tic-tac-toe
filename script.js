// Create gameboard using module pattern
const gameboard = (() => {
    const board = [];
    const rows = 3;
    const columns = 3;

    // Initialize board array
    for (let i = 0; i < rows; i++) {
        board.push([]);
        for (let j = 0; j < columns; j++) {
            board[i].push("_");
        }
    }

    // Style board array for console output
    const gameboardOutput = board.map((row) => row.join(" ")).join("\n");
    console.log(gameboardOutput);
})();
