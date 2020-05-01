var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var Board = require('./src/game.js');
var Bot = require('./src/ai.js');


var board = {};
var depth = 20;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//Routes
app.get('/init', function (req, res, next) {
  board = Board.initBoard();
  console.table(board);
  res.send(board);
});

app.get('/over', function (req, res, next) {

  console.log("test : " + Board.terminalTest(board));
  res.send("" + Board.terminalTest(board));
});

//place users coin and send bot's move to client
app.get('/place/:col', function (req, res, next) {

  var col = req.params.col;
  Board.place(board, col, 1);

  if (Board.terminalTest(board) != "1") {
    var bot_move = Bot.decision(board, depth);
    console.table(board);
    console.log("move : " + bot_move);

    res.send("" + bot_move);
  }

  else{
    res.send("8");
  }


});

app.get('/playable/:col', function (req, res) {
  var col = req.params.col;
  res.send(Board.playableCol(board, col));
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
