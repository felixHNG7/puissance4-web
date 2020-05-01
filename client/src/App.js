import React, { Component } from 'react'
import './App.css';

import BoardCell from './BoardCell';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      player: '1',
      board: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ],
      winner: '',
    };
  }

  componentDidMount() {
    fetch('http://localhost:8070/init')
      .catch((error) => console.error(error));
  }

  async isOver(player, j) {
    await fetch("http://localhost:8070/over")
      .then((response) => response.text())
      .then(response => this.setState({ winner: response }))
      .catch((error) => console.error(error));
  }


  async playbleCol(column) {
    var playable = '';
    await fetch("http://localhost:8070/playable/" + column)
      .then((response) => response.text())
      .then((text) => playable = text)
      .catch((error) => console.error(error));

    return playable;
  }

  newGame() {
    const newBoard =  [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];
    
    this.setState({
      board: newBoard,
      winner:'0',
    });
    fetch('http://localhost:8070/init')
      .catch((error) => console.error(error));
    
  }


  async sendPlaceCoin(column) {

    var test = await this.playbleCol(column);

    if (test === "true") {

      console.log("pla col : " + column);
      const col = this.state.board[column].concat('1');
      const newBoard = this.state.board.slice();
      newBoard[column] = col;
      this.setState({
        board: newBoard,
      });


      //send player's move and get bot's move
      var bot_move = '';
      await fetch("http://localhost:8070/place/" + column)
        .then((response) => response.text())
        .then((text) => bot_move = text)
        .catch((error) => console.error(error))

      await this.isOver(1, column);


      //place bot's move
      this.placeBot(bot_move)

      if (this.state.winner === '1') {
        alert("You won");

      }
      else if (this.state.winner === '2') {
        alert("Computer won");
      }
    }


  }

  placeBot(column) {
    if (column < 7) {
      console.log("b col : " + column);
      const col = this.state.board[column].concat('2');
      const newBoard = this.state.board.slice();
      newBoard[column] = col;


      this.setState({
        board: newBoard,
      });
    }
  }

  

  render() {
    const cells = [];

    for (let i = 5; i >= 0; i--) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        row.push(<BoardCell key={j} j={j} board={this.state.board} winner={this.state.winner} i={i} onClick={this.sendPlaceCoin.bind(this)} />);
      }
      cells.push(<div className="row" key={i}>{row}</div>)
    }

    return (
      <div className="App" >

        <div className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" />
        <div className="board">{cells}</div>
        <button id="newGame" onClick={this.newGame.bind(this)}>New game</button>

      </div>
    );
  }

}




export default App;
