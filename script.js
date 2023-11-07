// For keeping track of the markers on the board
const gameboard = (() => {
    const board = [];
    const rows = 3;
    const columns = 3;
    let moveCount = 0;
    let isGameOver = false;

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

    const checkValidSquare = (row, column) => {
        // User has pressed cancel or submitted without value
        if (row === null || column === null || row === "" || column === "") {
            return false;
        }

        // Value submitted is not a number
        if (isNaN(row) || isNaN(column)) {
            return false;
        }

        // Row and/or column picked is out of bounds
        if (row < 0 || row >= rows || column < 0 || column >= columns) {
            return false;
        }

        // Square has already been chosen before
        if (board[row][column] != "_") return false;

        // Square is valid
        return true;
    };

    const chooseSquare = (marker, row, column) => {
        board[row][column] = marker;
        moveCount++;
        checkGameOver(row, column);
    };

    // Check for a win or a tie
    const checkGameOver = (row, column) => {
        // Check for horizontal 3-in-a-row
        if (board[row][0] == board[row][1] && board[row][1] == board[row][2]) {
            console.log(`horizontal winner: ${board[row][0]} in row ${row}`);
            isGameOver = true;
            return;
        }

        // Check for vertical 3-in-a-row
        if (
            board[0][column] == board[1][column] &&
            board[1][column] == board[2][column]
        ) {
            console.log(
                `vertical winner: ${board[0][column]} in column ${column}`
            );
            isGameOver = true;
            return;
        }

        // Check for diagonal 3-in-a-row
        if (
            row == column &&
            board[0][0] == board[1][1] &&
            board[1][1] == board[2][2]
        ) {
            console.log(`diagonal winner: ${board[0][0]}`);
            isGameOver = true;
            return;
        }

        // Check for anti-diagonal 3-in-a-row
        if (
            board[1][1] != "_" &&
            board[0][2] == board[1][1] &&
            board[1][1] == board[2][0]
        ) {
            console.log(`anti-diagonal winner: ${board[0][2]}`);
            isGameOver = true;
            return;
        }

        // Check for tie
        if (moveCount == 9) {
            console.log("tie");
            isGameOver = true;
            return;
        }

        // Display gameboard if game over
        if (isGameOver) displayBoard();
    };

    const getGameOver = () => isGameOver;

    return {
        displayBoard,
        checkValidSquare,
        chooseSquare,
        checkGameOver,
        getGameOver,
    };
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

        if (!gameboard.checkValidSquare(chosenRow, chosenColumn)) {
            console.log(`${getActivePlayer().name}, invalid square!`);
            return;
        }

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
    while (!gameboard.getGameOver()) {
        takeTurn();
    }
})();
