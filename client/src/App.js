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
      depth: 3,
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




  async sendPlaceCoin(column) {

    console.log("depth : " + this.state.depth);
    var test = await this.playbleCol(column);

    if (test === "true") {

      //send player's move and get bot's move

      await fetch("http://localhost:8070/place/" + column+"/"+this.state.depth, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.board),
      })
        .then((response) => response.text())
        .then((response) => this.setState({ board: JSON.parse(response) }))
        .catch((error) => console.error(error));

      await this.isOver();


    }
  }

  depthSelection(value) {
    console.log("depth : " + value.target.value);
    this.setState({ depth: value.target.value });
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

        <div className="param">
          <button id="button" onClick={this.newGame.bind(this)}>New game</button>
          <br />
          <br />
          Depth selection : 
          <br />
          <select id="depth-select" value={this.state.depth} onChange={this.depthSelection.bind(this)}>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>
      </div>
    );
  }

}




export default App;
