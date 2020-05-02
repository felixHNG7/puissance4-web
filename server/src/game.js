
var Board = {}
/**
  * @desc Initialize an empty matrix corresponding to the game board
  * @return Matrix of integers - empty matrix
*/
Board.initBoard = function () {
    var initiatedBoard = [];
    for (var i = 0; i < 6; i++) {
        initiatedBoard[i] = [];
        for (var j = 0; j < 7; j++) {
            initiatedBoard[i][j] = 0;
        }
    }
    return initiatedBoard;
};


/**
  * @desc updates the game board with newly placed coin
  * @param {int[][]} game board
  * @param {int} column where the coin needs to be placed
  * @param {int} number corresponding to the player
*/
Board.place = function (board, col, player) {

    for (var i = board.length - 1; col >= 0; i--) {
        if (board[i][col] == 0) {
            board[i][col] = player;
            break;
        }
    }
}


/**
  * @desc check if the board is full
  * @param {int[][]} game board
  * @return bool 
*/
Board.isFull = function (board) {
    for (var i = 0; i < board[0].length; i++) {
        if (board[0][i] == 0) {
            return false;
        }
    }
    return true;
};

/**
  * @desc cancel last move corresponding to a column
  * @param {int[][]} game board
  * @param {int} column index to cancel last move
*/
Board.cancelMove = function (board, col) {
    for (var i = 0; i < 6; i++) {
        if (board[i][col] != 0) {
            board[i][col] = 0;
            break;
        }
    }
}

/**
  * @desc check if a column is playable
  * @param {int[][]} game board
  * @param {int} column index to verify
  * @return bool
*/
Board.playableCol = function (board, col) {
    return board[0][col] == 0;
}


//winning conditions

horizontalTest = function (board, i, j, player) {
    if (j > 3) //useless to check if the povar is further than 4th position
        return false;

    for (var ind = 0; ind < 4; ind++) {
        if (board[i][j + ind] != player)
            return false;
    }
    return true;
}
verticalTest = function (board, i, j, player) {

    if (i > 2)//useless to check if the povar is further than 3rd position
        return false;


    for (var ind = 0; ind < 4; ind++) {
        if (board[i + ind][j] != player) {
            return false;
        }

    }
    return true;
}

diag1Test = function (board, i, j, player) { // desc right
    if (i > 2 || j > 3)
        return false;

    for (var ind = 0; ind < 4; ind++) {
        if (board[i + ind][j + ind] != player)
            return false;
    }
    return true;
}

diag2Test = function (board, i, j, player) {// asc right
    if (i < 3 || j > 3)
        return false;

    for (var ind = 0; ind < 4; ind++) {
        if (board[i - ind][j + ind] != player)
            return false;
    }
    return true;
}

/**
  * @desc terminal test (check winning condition)
  * @param {int[][]} game board
  * @param {int} row index 
  * @param {int} column index 
  * @param {int} player
  * @return bool
*/
Board.terminalTest = function (board) {// asc right


    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++)//cross the board to check if 4 coins are connected
        {
            player = board[i][j];
            if (player != 0) {
                if (horizontalTest(board, i, j, player))
                    return player;
                if (verticalTest(board, i, j, player))
                    return player;
                if (diag1Test(board, i, j, player))
                    return player;
                if (diag2Test(board, i, j, player))
                    return player;

            }
        }
    }
    return 0;
}

/**
  * @desc looks for the row index of the last move
  * @param {int[][]} game board
  * @param {int} column index 
  * @return int row index
*/
findLastMove = function (board, j) {

    for (var i = 0; i < 6; i++) {
        if (board[i][j] != 0)
            return i;
    }
}


module.exports = Board;

