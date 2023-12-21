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

    const clearBoard = () => {
        for (let i = 0; i < rows; i++ ) {
            for (let j = 0; j < columns; j++) {
                board[i][j] = Cell();
            }
        }
    }

    const getBoard = () => board;

    const dropToken = (row, column, player) => {
        // check for valid move
        if (board[row][column].getValue() == 0) 
            board[row][column].addToken(player);
    };

    const printBoard = () => {
        for (let i = 0; i < rows; i++) {
            console.log(`${board[i][0].getValue()} ${board[i][1].getValue()} ${board[i][2].getValue()}`)
        }
    }

    return {getBoard, dropToken, printBoard, clearBoard};
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
    let won = false;

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

    const checkWon = () => won;

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]; 
    };

    const getActivePlayer = () => activePlayer;

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
            (board.getBoard()[0][1].getValue() === getActivePlayer().token &&
            board.getBoard()[1][1].getValue() === getActivePlayer().token &&
            board.getBoard()[2][1].getValue() === getActivePlayer().token) || 
            (board.getBoard()[0][2].getValue() === getActivePlayer().token &&
            board.getBoard()[1][2].getValue() === getActivePlayer().token &&
            board.getBoard()[2][2].getValue() === getActivePlayer().token) || 
            (board.getBoard()[1][0].getValue() === getActivePlayer().token &&
            board.getBoard()[1][1].getValue() === getActivePlayer().token &&
            board.getBoard()[2][2].getValue() === getActivePlayer().token)) {
                won = true;
                console.log(`${getActivePlayer().name} wins!`);
                return{playRound, getActivePlayer, getBoard: board.getBoard, checkWon: won};
            }
        switchPlayerTurn();
    };

    console.log(`Welcome to Tic Tac Toe!`);

    return {playRound, getActivePlayer, getBoard: board.getBoard, checkWon,
    players};
}

function ScreenController() { 
    const game = GameController();
    const turnHeader = document.querySelector('.turn');
    const boardDisplay = document.querySelector('.board');
    const form = document.querySelector('#names');
    const submitbutton = document.querySelector('#submit');
    const p1name = document.querySelector('#p1name');
    const p2name = document.querySelector('#p2name');
    const againButton = document.querySelector('#again');

    const updateScreen = () => { 
        // clear board
        boardDisplay.classList.remove('hidden');
        boardDisplay.textContent = '';

        //get most recent info
        const board = game.getBoard();
        const player = game.getActivePlayer();

        //display info
        turnHeader.textContent = `${player.name}\'s turn`;
        board.forEach((row,indexr) => {
            row.forEach((cell, indexc) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
                cellButton.dataset.column = indexc;
                cellButton.dataset.row = indexr;
                cellButton.textContent = cell.getValue();
                boardDisplay.appendChild(cellButton);
            })
        })
    }
    
    function initialScreen() {

        boardDisplay.classList.add('hidden');
        turnHeader.textContent = 'Welcome to Tic Tac Toe! Enter info for player 1 and player 2:';

        submitbutton.addEventListener('click', () => {
            game.players[0].name = p1name.value;
            game.players[1].name = p2name.value;
            
            form.classList.add('hidden');
            updateScreen();
        })
    }

    function clickHandlerBoard(e) {
        const selectedSpace = {
            row: e.target.dataset.row,
            column: e.target.dataset.column,
        }
        
        game.playRound(selectedSpace.row, selectedSpace.column);
        updateScreen();
        if (game.checkWon() == true) {
            turnHeader.textContent = `${game.getActivePlayer().name} won!`;
            boardDisplay.classList.add('hidden');
            againButton.classList.remove('hidden');
        }
    }

    function playAgain() {
        //clear board
        againButton.classList.add('hidden');
        for(let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                game.getBoard()[i][j].value = 0;
            }
        }
        updateScreen();
    }
    
    boardDisplay.addEventListener('click', clickHandlerBoard);
    againButton.addEventListener('click', playAgain);
    //initial screen
    initialScreen();
    return {initialScreen, updateScreen, game}
}
const screen = ScreenController();
