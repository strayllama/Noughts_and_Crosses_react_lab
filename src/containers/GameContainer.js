import React, {Component} from 'react';
import GameBoard from '../components/GameBoard.js';

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      turn: 1,
      gameWonYet: false,
      crossesScore: 0,
      noughtsScore: 0
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  } // end constructor

  changeTurn() {
    if (this.state.turn === 1) {
      this.setState({ turn: 2 }); // turn = 2 means 0 go
    } else {
      this.setState({ turn: 1 }); // turn = 1 means X go
    }
  }


  winCheck() {
    const winCombos = [
      (this.state.buttons[0] + this.state.buttons[1] + this.state.buttons[2]),
      (this.state.buttons[3] + this.state.buttons[4] + this.state.buttons[5]),
      (this.state.buttons[6] + this.state.buttons[7] + this.state.buttons[8]),
      (this.state.buttons[0] + this.state.buttons[3] + this.state.buttons[6]),
      (this.state.buttons[1] + this.state.buttons[4] + this.state.buttons[7]),
      (this.state.buttons[2] + this.state.buttons[5] + this.state.buttons[8]),
      (this.state.buttons[0] + this.state.buttons[4] + this.state.buttons[8]),
      (this.state.buttons[2] + this.state.buttons[4] + this.state.buttons[6]),
    ];
    for(const combo of winCombos){
      if (combo === 3 || combo === 30){
        //this.setState({ gameWonYet: true }); // WHHHY
        this.state.gameWonYet = true;
        if (combo === 3) {
          this.setState(({ crossesScore }) => ({ crossesScore: crossesScore + 1 }))
        }
      }
    }
    this.setMessageBox()
  } // end winCheck


  setMessageBox() {
    let total = 0;
    for(let button of this.state.buttons) {
      total += button;
    }
    const messageBox = document.getElementById('message-box');
    if (!this.state.gameWonYet) {
      if (total === 45){
        messageBox.textContent = "A Draw, you both lose!";
      } else if (this.state.turn === 1) {
        messageBox.textContent = "Player 0's go";
      } else {
        messageBox.textContent = "Player X's go";
      }
    } else {
      messageBox.textContent = "WELL DONE, you won!";
    }
  }


  setButtonClickChoice(index) {
    const newButtons = this.state.buttons;
    if (this.state.turn === 1) {
      newButtons[index] = 1;
    } else {
      newButtons[index] = 10;
    }
    this.setState({buttons: newButtons});
  }


  handleButtonClick(value, index) {
    console.log('HANDLE click function has been executed');
    if (value === 0 && this.state.gameWonYet === false) {
      this.setButtonClickChoice(index);
      this.changeTurn();
      this.winCheck();
    }
  }


  handleResetClick() {
    const newButtons = this.state.buttons;
    for(let i = 0 ; i < 9 ; i++) {
      newButtons[i] = 0;
    }
    this.setState({buttons: newButtons, turn: 1, gameWonYet: false});
    console.log(this.state.buttons);
    console.log(this.state.turn);
    console.log(this.state.gameWonYet);
    // this.state.buttons = newButtons;
    // this.state.turn = 1;
    // this.state.gameWonYet = false;
    this.setMessageBox();
  }


  render() {
    return (
      <div className="game-container">
        <header><h1>n0ughts and Xrosses</h1></header>
        <p id="scoreboard">Scores Crosses-{this.state.crossesScore}, Noughts-{this.state.noughtsScore}</p>
        <p id="message-box">GAME READY: player of X's goes first!</p>
        <button
          type="button"
          onClick={this.handleResetClick}
          >Re-set Game</button>
          <GameBoard
            buttons={this.state.buttons}
            turn={this.state.turn}
            handle={this.handleButtonClick}
          />
        </div>
      ); // end return()
    } // end render()


  } // end class GameContainer


  export default GameContainer
