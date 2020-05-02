import React, { Component } from 'react'
import './App.css';

import BoardCell from './BoardCell';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      player: '1',
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ],
      winner: '',
    };
  }



  async isOver() {

    await fetch("http://localhost:8070/over", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.board),
    })
      .then((response) => response.text())
      .then(response => this.setState({ winner: response }))
      .catch((error) => console.error(error));

    if (this.state.winner === '1') {
      alert("You won");

    }
    else if (this.state.winner === '2') {
      alert("Computer won");
    }

  }


  async playbleCol(column) {
    var playable = '';
    await fetch("http://localhost:8070/playable/" + column, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.board),
    })
      .then((response) => response.text())
      .then((text) => playable = text)
      .catch((error) => console.error(error));

    return playable;
  }

  newGame() {
    const newBoard = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];

    this.setState({
      board: newBoard,
      winner: '0',
    });

  }

  async test() {
    var array = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 3, 0, 0],
      [0, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 2],
    ];

    await fetch("http://localhost:8070/array", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(array),
    })
      .then((response) => response.text())
      .catch((error) => console.error(error));


  }


  async sendPlaceCoin(column) {

    var test = await this.playbleCol(column);

    if (test === "true") {

      //send player's move and get bot's move
      
      await fetch("http://localhost:8070/place/" + column, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.board),
      })
        .then((response) => response.text())
        .then((response) => this.setState({board:JSON.parse(response)}))
        .catch((error) => console.error(error));

      await this.isOver();


    }
  }

  render() {
    const cells = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        console.log()
        row.push(<BoardCell key={j} j={j} i={i} board={this.state.board} winner={this.state.winner} onClick={this.sendPlaceCoin.bind(this, j)} />);
      }
      cells.push(<div className="row" key={i}>{row}</div>)
    }

    return (
      <div className="App" >

        <div className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" />
        <div className="board">{cells}</div>
        <button id="button" onClick={this.newGame.bind(this)}>New game</button>
       

      </div>
    );
  }

}




export default App;
