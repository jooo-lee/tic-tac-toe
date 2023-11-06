// For keeping track of the markers on the board
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

    // Output current board to console
    const displayBoard = () => {
        // Style board array for console output
        const gameboardOutput = board.map((row) => row.join(" ")).join("\n");
        console.log(gameboardOutput);
    };

    const chooseSquare = (marker, row, column) => {
        board[row][column] = marker;
    };

    return { displayBoard, chooseSquare };
})();

function createPlayer(name, marker) {
    return { name, marker };
}

// For controlling the flow of the game
const gameController = (() => {
    const p1 = createPlayer("playerOne", "X");
    const p2 = createPlayer("playerTwo", "O");

    const takeTurn = (player) => {
        const chosenRow = prompt(
            `${player.name} - (${player.marker}), enter a row (0-2):`
        );
        const chosenColumn = prompt(
            `${player.name} - (${player.marker}), enter a column (0-2):`
        );

        gameboard.chooseSquare(player.marker, chosenRow, chosenColumn);
        gameboard.displayBoard();
    };

    // Displaying initial board
    gameboard.displayBoard();

    takeTurn(p1);
    takeTurn(p2);
})();

// console.log empty board
// it will be p1's turn
// allow p1 to choose their square
// put p1's marker in said square
// switch turns
// allow p2 to choose their square
// put p2's marker in said square
// switch turns
// etc...
// until either there are no more empty squares available
// or either p1 or p2 has 3 markers in a row
