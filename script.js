// For keeping track of the markers on the board
const gameboard = (() => {
    const board = [];
    const rows = 3;
    const columns = 3;
    let moveCount = 0;

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
        moveCount++;
    };

    // Check for a win or a tie
    const checkGameOver = () => {
        // Check for horizontal 3-in-a-rows
        for (let i = 0; i < rows; i++) {
            // Make sure the matching markers aren't empty markers
            if (board[i][0] == "_") continue;

            if (board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
                console.log(`horizontal winner: ${board[i][0]} in row ${i}`);
                return true;
            }
        }

        // Check for vertical 3-in-a-rows
        for (let j = 0; j < columns; j++) {
            // Make sure the matching markers aren't empty markers
            if (board[0][j] == "_") continue;

            if (board[0][j] == board[1][j] && board[1][j] == board[2][j]) {
                console.log(`vertical winner: ${board[j][0]} in column ${j}`);
                return true;
            }
        }

        // Check for diagonal 3-in-a-row
        if (
            board[0][0] == board[1][1] &&
            board[1][1] == board[2][2] &&
            board[0][0] != "_"
        ) {
            console.log(`diagonal winner: ${board[0][0]}`);
            return true;
        }

        // Check for anti-diagonal 3-in-a-row
        if (
            board[0][2] == board[1][1] &&
            board[1][1] == board[2][0] &&
            board[0][2] != "_"
        ) {
            console.log(`anti-diagonal winner: ${board[0][2]}`);
            return true;
        }

        // Check for tie
        if (moveCount == 9) {
            console.log("tie");
            return true;
        }

        // Game not over
        return false;
    };

    return { displayBoard, chooseSquare, checkGameOver };
})();

function createPlayer(name, marker) {
    return { name, marker };
}

// For controlling the flow of the game
const gameController = (() => {
    const p1 = createPlayer("playerOne", "X");
    const p2 = createPlayer("playerTwo", "O");

    const players = [p1, p2];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const takeTurn = () => {
        const chosenRow = prompt(
            `${getActivePlayer().name} - (${
                getActivePlayer().marker
            }), enter a row (0-2):`
        );

        const chosenColumn = prompt(
            `${getActivePlayer().name} - (${
                getActivePlayer().marker
            }), enter a column (0-2):`
        );

        gameboard.chooseSquare(
            getActivePlayer().marker,
            chosenRow,
            chosenColumn
        );

        gameboard.displayBoard();
        switchTurn();
    };

    // Displaying initial board
    gameboard.displayBoard();

    // Keep playing until there is a win or a tie
    while (!gameboard.checkGameOver()) {
        takeTurn();
    }
})();
