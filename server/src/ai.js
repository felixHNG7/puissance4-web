const Board = require('./game.js');

var ai = {};





twoEnd = function (oneEnd)//tell if a serie of coins is blocked from each sides
{
    if (oneEnd)
        return true;
    else
        return false;
}

comptHorizontal = function (i, j, board, player) {
    var one_End = false;//line blocked from one side
    var two_End = false;//line blocked from each sides, when a serie is black from each sides then this serie is worthless
    var count = 0;
    if (j == 0) //blocked by the border
        one_End = true;
    else if (board[i][j - 1] != player && board[i][j - 1] != 0)//if the left coin is not current player's coin
        one_End = true;
    for (var ii = 0; ii < 4; ii++) {
        if (j + ii <= 6 && board[i][j + ii] == player)//current player's serie
            count++;
        if (j + ii <= 6 && board[i][j + ii] != player && board[i][j + ii] != 0)//if the next coin is not current player's coin 
        {
            two_End = twoEnd(one_End); //if this serie is already block then this serie is worthless
            break;
        }
        if (j + ii <= 6 && board[i][j + ii] == 0)
            break;
    }

    

    if (two_End)
        return 0; //return weight of 0 for this serie

    if (one_End) { //returning the weight of the serie for a serie block from one side
        if (count < 3)
            return 0;
        if (count == 3)
            return count * 2;
        if (count == 4)
            return count * 100;
    }

    // not blocked serie
    if (count == 2)
        return count * 5;
    if (count == 3)
        return count * 10;
    if (count == 4)
        return count * 100;

    return count;
}

comptVertical = function (i, j, board, player) {
    var one_End = false;//line blocked from one side
    var two_End = false;//line blocked from each sides, when a serie is black from each sides then this serie is worthless
    var count = 0;
    if (i == 0) //blocked by the border
        one_End = true;
    else if (board[i - 1][j] != player && board[i - 1][j] != 0)//if the coin above is not current player's coin
        one_End = true;
    for (var ii = 0; ii < 4; ii++) {
        if (i + ii <= 5 && board[i + ii][j] == player)//current player's serie
            count++;
        if (i + ii <= 5 && board[i + ii][j] != player && board[i + ii][j] != 0)//if the next coin is not current player's coin 
        {
            two_End = twoEnd(one_End);//if this serie is already block then this serie is worthless
            break;
        }
        if (i + ii <= 5 && board[i + ii][j] == 0)
            break;
    }

    if (two_End)
        return 0;//return weight of 0 for this serie

    if (one_End) {//returning the weight of the serie for a serie block from one side
        if (count < 4)
            return 0;
        if (count == 4)
            return count * 2;
        if (count == 5)
            return count * 100;
    }

    // not blocked serie
    if (count == 3)
        return count * 5;
    if (count == 4)
        return count * 10;
    if (count == 5)
        return count * 100;

    return count;
}

comptDiag1 = function (i, j, board, player)//desc diag
{
    var one_End = false;//ligne bloqué à une extrémité
    var two_End = false;//ligne bloqué aux deux extremité
    var count = 0;
    if (i == 0 || j == 0) // bloqué par la bordure du plateau
        one_End = true;
    else if (board[i - 1][j - 1] != player && board[i - 1][j - 1] != 0)// si la case en haut à gauche est un pion
        one_End = true;
    for (var ii = 0; ii < 4; ii++) {
        if (i + ii <= 5 && j + ii <= 6 && board[i + ii][j + ii] == player)//si pion du player
            count++;
        if (i + ii <= 5 && j + ii <= 6 && board[i + ii][j + ii] != player && board[i + ii][j + ii] != 0)//si un pion adverse
        {
            two_End = twoEnd(one_End);
            break;
        }
        if (j + ii <= 6 && i + ii <= 5 && board[i + ii][j + ii] == 0)
            break;
    }
    if (two_End)
        return 0;

    if (one_End) {
        if (count < 4)
            return 0;
        if (count == 4)
            return count * 2;
        if (count == 5)
            return count * 100;
    }

    if (count == 3)
        return count * 5;
    if (count == 4)
        return count * 10;
    if (count == 5)
        return count * 100;

    return count;
}

comptDiag2 = function (i, j, board, player)//asc diag
{
    var two_End = false;//ligne bloqué à une extrémité
    var two_End = false;//ligne bloqué aux deux extremité
    var count = 0;
    if (i == 5 || j == 0) // bloqué par la bordure du plateau
        two_End = true;
    else if (board[i + 1][j - 1] != player && board[i + 1][j - 1] != 0)// si la case en bas à gauche est un pion
        two_End = true;
    for (var ii = 0; ii < 5; ii++) {
        if (i - ii >= 0 && j + ii <= 6 && board[i - ii][j + ii] == player)//si pion du player
            count++;
        if (i - ii >= 0 && j + ii <= 6 && board[i - ii][j + ii] != player && board[i - ii][j + ii] != 0)//si un pion adverse
        {
            two_End = twoEnd(two_End);// fonction qui return true si y a déjà une des extrémités de bloqué
            break;
        }
        if (j + ii <= 6 && i - ii >= 0 && board[i - ii][j + ii] == 0)
            break;
    }
    if (two_End)
        return 0;
    if (two_End)//attribution de la valeur d'un coup en fonction de sa position
    {
        if (count < 3)
            return 0;
        if (count == 3)
            return count * 2;
        if (count == 4)
            return count * 100;
    }
    if (count == 2)
        return count * 5;
    if (count == 3)
        return count * 10;
    if (count == 4)
        return count * 100;

    return count;
}

aligned = function (board) {

    var nb_series = [0, 0]; //serie of aligned coins for each player
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var player = board[i][j];
            if (player != 0) {
                nb_series[player - 1] += comptHorizontal(i, j, board, player);
                nb_series[player - 1] += comptVertical(i, j, board, player);
                nb_series[player - 1] += comptDiag1(i, j, board, player);
                nb_series[player - 1] += comptDiag2(i, j, board, player);
                
            }
        }
    }
    return nb_series;
}

utility = function (board) // returns the weight of a move
{
    var winner = Board.terminalTest(board); 
    if (winner != 0) { //giving infite weight to a winning move
        if (winner == 2)//winning move
            return 10000;
        if (winner == 1)//losing move
            return -10000;
        else
            return 0;
    }
    
    var nb_series = aligned(board);
    
    return nb_series[0] - nb_series[1];

}



//Min-Max
max_value = function (depth, alpha, beta, board) {

    if (depth == 0 || Board.terminalTest(board) != 0) {
        return utility(board);
    }

    var v = -10000;
    for (var j = 0; j < board[0].length; j++) {
        if (board[0][j] == 0) // Actions
        {
            Board.place(board, j, 2);
            var min = min_value(depth - 1, alpha, beta, board);
            v = Math.max(min, v);
            Board.cancelMove(board,j);
            if (v >= beta)
                return v;
            alpha = Math.max(alpha, v);

        }

    }

    return v;
}

min_value = function (depth, alpha, beta, board) {
    if (depth == 0 || Board.terminalTest(board) != 0) {
        return utility(board);
    }
    var v = 10000;

    for (var j = 0; j < board[0].length; j++) {
        if (board[0][j] == 0) // Actions
        {
            Board.place(board,j,1);
            var max = max_value(depth - 1, alpha, beta, board);
            v = Math.min(max, v);

            Board.cancelMove(board,j);
            if (v <= alpha)
                return v;
            alpha = Math.min(beta, v);

        }


    }
    return v;
}


// AI decision
ai.decision = function (board, depth) {
    var v = 10000;
    var maxj;
    var max;

    for (var j = 0; j < board[0].length; j++) {

        if (board[0][j] == 0)//Actions
        {
            Board.place(board, j, 1);
            max = max_value(depth - 1, -10000, 10000, board);
            if (v >= max) {
                v = max;
                maxj = j;
            }
            Board.cancelMove(board,j);
        }


    }

    Board.place(board, maxj, 2); //best computer move
    return board; //returns the best move's column
}


module.exports = ai;
