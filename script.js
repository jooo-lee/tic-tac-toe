// For keeping track of the markers on the board
const gameboard = (() => {
    const board = [];
    const rows = 3;
    const columns = 3;
    let moveCount = 0;
    let isGameOver = false;
    let isTie = false;
    let winningMarker = "";

    // Initialize board array
    for (let i = 0; i < rows; i++) {
        board.push([]);
        for (let j = 0; j < columns; j++) {
            board[i].push("_");
        }
    }

    const getBoard = () => board;

    const checkValidSquare = (row, column) => {
        // Square has already been chosen before
        if (board[row][column] != "_") return false;

        // Square is valid
        return true;
    };

    const chooseSquare = (marker, row, column) => {
        board[row][column] = marker;
        moveCount++;
    };

    // Check for a win or a tie
    const checkGameOver = (row, column) => {
        // Check for horizontal 3-in-a-row
        if (board[row][0] == board[row][1] && board[row][1] == board[row][2]) {
            console.log(`horizontal winner: ${board[row][0]} in row ${row}`);
            isGameOver = true;
            winningMarker = `${board[row][0]}`;
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
            winningMarker = `${board[0][column]}`;
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
            winningMarker = `${board[0][0]}`;
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
            winningMarker = `${board[0][2]}`;
            return;
        }

        // Check for tie
        if (moveCount == 9) {
            console.log("tie");
            isGameOver = true;
            isTie = true;
            return;
        }
    };

    const getIsGameOver = () => isGameOver;

    const getIsTie = () => isTie;

    const getWinningMarker = () => winningMarker;

    const restart = () => {
        // Reset board array
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j] = "_";
            }
        }

        isGameOver = false;
        isTie = false;
        winningMarker = "";
        moveCount = 0;
    };

    return {
        getBoard,
        checkValidSquare,
        chooseSquare,
        checkGameOver,
        getIsGameOver,
        getIsTie,
        getWinningMarker,
        restart,
    };
})();

// For controlling the flow of the game
const gameController = (() => {
    const createPlayer = (name, marker) => {
        return { name, marker };
    };

    const p1 = createPlayer("Player X", "X");
    const p2 = createPlayer("Player O", "O");

    const players = [p1, p2];

    let activePlayer = players[0];

    const getActivePlayerName = () => activePlayer.name;
    const getActivePlayerMarker = () => activePlayer.marker;

    let winningPlayerName = "";

    const switchTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const takeTurn = (row, column) => {
        // Do not allow player to choose invalid square and do not switch turns
        if (!gameboard.checkValidSquare(row, column)) {
            console.log(`${getActivePlayerName()}, invalid square!`);
            return;
        }

        // Valid square chosen
        gameboard.chooseSquare(getActivePlayerMarker(), row, column);
        gameboard.checkGameOver(row, column);

        // Update winning marker if player has won
        if (gameboard.getIsGameOver()) {
            if (gameboard.getWinningMarker()) {
                // Get name of player whose marker matches the winning marker
                winningPlayerName = players.find(
                    (player) => player.marker === gameboard.getWinningMarker()
                ).name;
            }
            return;
        }

        switchTurn();
    };

    const getWinningPlayerName = () => winningPlayerName;

    const restart = () => {
        gameboard.restart();
        activePlayer = players[0];
        winningPlayerName = "";
    };

    return { takeTurn, getActivePlayerName, getWinningPlayerName, restart };
})();

// For handling display/DOM logic
const displayController = (() => {
    // Announce player turn, win or tie
    const announce = (playerName, isGameOver) => {
        const announcementDiv = document.querySelector("#announcement");
        announcementDiv.replaceChildren(); // Clear existing children nodes

        // If game in progress, announce whose turn it is
        // If game over, announce tie or winner
        const p = document.createElement("p");
        if (isGameOver && gameboard.getIsTie()) {
            p.textContent = "It's a tie!";
        } else if (isGameOver) {
            p.textContent = `The winner is: ${gameController.getWinningPlayerName()}!`;
        } else {
            p.textContent = `${playerName}, your turn!`;
        }
        announcementDiv.appendChild(p);
    };

    // Initial announcement
    announce(gameController.getActivePlayerName(), false);

    // Allow users to click to select square
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
        square.addEventListener("click", (e) => {
            // Do not allow gameboard to be changed if game is over
            if (gameboard.getIsGameOver()) return;

            console.log(gameboard.getBoard());

            const row = parseInt(e.target.dataset.row);
            const column = parseInt(e.target.dataset.column);

            gameController.takeTurn(row, column);
            updateSquare(row, column);
            announce(
                gameController.getActivePlayerName(),
                gameboard.getIsGameOver()
            );
        });
    });

    // Update DOM gameboard with marker in appropriate square
    const updateSquare = (row, column) => {
        const board = gameboard.getBoard();
        const chosenSquare = document.querySelector(
            `.square[data-row="${row}"][data-column="${column}"]`
        );
        chosenSquare.textContent = board[row][column];
    };

    const clearDOMBoard = () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.textContent = "";
        });
    };

    const restartBtn = document.querySelector("#restart-btn");
    restartBtn.addEventListener("click", () => {
        gameController.restart();
        clearDOMBoard();
        announce(gameController.getActivePlayerName(), false);
    });
})();
