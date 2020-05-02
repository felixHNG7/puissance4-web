var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var Board = require('./src/game.js');
var Bot = require('./src/ai.js');


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
  res.send(board);
});

app.post('/over', function (req, res, next) {
  res.send("" + Board.terminalTest(req.body));
});

//place users coin and send bot's move to client
app.post('/place/:col/:depth', function (req, res, next) {
  var col = req.params.col;
  var newBoard = req.body;
  Board.place(newBoard, col, 1);
  if (Board.terminalTest(newBoard) != "1") {
    newBoard = Bot.decision(newBoard, req.params.depth);
    res.send(newBoard);
  }

  else{
    res.send(newBoard);
  }


});

app.post('/playable/:col', function (req, res) {
  var col = req.params.col;
  res.send(Board.playableCol(req.body, col));
});




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
