import React, { Component } from 'react'

class BoardCell extends Component {

    render() {
        const board = this.props.board;
        const status = this.props.winner;//game is over not
        const j = this.props.j;
        const i = this.props.i;
        let classes = "cell";
        if (board[j][i] !== undefined) {

            if (board[j][i] === "1")
                classes += " player";
            else
                classes += " bot";

        }
        console.log(status);
        if (status !== '' && status !== '0') {
            classes += " over";
        }

        return (
            <div className={classes} disabled onClick={() => this.props.onClick(this.props.j)}>

            </div>
        )
    }
}

export default BoardCell;