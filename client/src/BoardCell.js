import React, { Component } from 'react'

class BoardCell extends Component {

    render() {
        const board = this.props.board;
        const status = this.props.winner;//game is over not
        const j = this.props.j;
        const i = this.props.i;
        var classes = "cell";
        if (board[i][j] !== 0) {

            if (board[i][j] === 1)
                classes += " player";
            else
                classes += " bot";

        }
        if (status !== '' && status !== '0') {
            classes += " over";
        }

        return (
            <div className={classes} onClick={() => this.props.onClick(this.props.j)}>

            </div>
        )
    }
}

export default BoardCell;