const boar = require('./game.js');
const bot = require('./ai.js');
const inputReader = require('wait-console-input')

var t = boar.initBoard();


for (var i = 0; i < 30; i++) {
    var col = inputReader.readInteger("col : ");
    boar.place(t,col,1);
    console.log("bot : "+bot.decision(t, 7));
    console.table(t);
}







//boar.place(t,col);

// console.table(t);
// console.log(col);
//console.log(bot.terminalTest(t));

//console.log(boar.isFull(t));