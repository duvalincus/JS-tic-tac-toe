function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++ ) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const dropToken = (row, column, player) => {
        // check for valid move
        if (board[row][column].getValue() !== 0) console.log(`That space is taken!`);
        board[row][column].addToken(player);
    };

    const printBoard = () => {
        for (let i = 0; i < rows; i++) {
            console.log(`${board[i][0].getValue()} ${board[i][1].getValue()} ${board[i][2].getValue()}`)
        }
    }

    return {getBoard, dropToken, printBoard};
}

// Same thing, 0 is nobody's cell, 1 is player 1's, 2 is player 2's
function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

function GameController(playerOneName = "Player One",
            playerTwoName = "Player Two") {
    const board = GameBoard();

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]; 
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} chooses space (${row}, ${column})`);
        board.dropToken(row, column, getActivePlayer().token);
        
        // check for win
        if ((board.getBoard()[0][0].getValue() === getActivePlayer().token &&
            board.getBoard()[0][1].getValue() === getActivePlayer().token &&
            board.getBoard()[0][2].getValue() === getActivePlayer().token) ||
            (board.getBoard()[1][0].getValue() === getActivePlayer().token &&
            board.getBoard()[1][1].getValue() === getActivePlayer().token &&
            board.getBoard()[1][2].getValue() === getActivePlayer().token) || 
            (board.getBoard()[2][0].getValue() === getActivePlayer().token &&
            board.getBoard()[2][1].getValue() === getActivePlayer().token &&
            board.getBoard()[2][2].getValue() === getActivePlayer().token) ||
            (board.getBoard()[0][0].getValue() === getActivePlayer().token &&
            board.getBoard()[1][1].getValue() === getActivePlayer().token &&
            board.getBoard()[2][2].getValue() === getActivePlayer().token) || 
            (board.getBoard()[2][0].getValue() === getActivePlayer().token &&
            board.getBoard()[1][1].getValue() === getActivePlayer().token &&
            board.getBoard()[0][2].getValue() === getActivePlayer().token) ||
            (board.getBoard()[0][0].getValue() === getActivePlayer().token &&
            board.getBoard()[1][0].getValue() === getActivePlayer().token &&
            board.getBoard()[2][0].getValue() === getActivePlayer().token) || 
            (board.getBoard()[1][0].getValue() === getActivePlayer().token &&
            board.getBoard()[1][1].getValue() === getActivePlayer().token &&
            board.getBoard()[1][2].getValue() === getActivePlayer().token) || 
            (board.getBoard()[2][0].getValue() === getActivePlayer().token &&
            board.getBoard()[2][1].getValue() === getActivePlayer().token &&
            board.getBoard()[2][2].getValue() === getActivePlayer().token)) {
                console.log(`${getActivePlayer().name} wins!`);
                return;
            }
        switchPlayerTurn();
        printNewRound();
    };

    console.log(`Welcome to Tic Tac Toe!`);
    printNewRound();

    return {playRound, getActivePlayer};
}

const game = GameController();