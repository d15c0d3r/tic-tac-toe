import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function Square(props) {
    return (
      <button className="square" onClick = {props.onClick} >
        {props.value}
      </button>
    )
  }

class Board extends React.Component {
  
  renderSquare(i) {
    return <Square 
    value = {this.props.squares[i]}
    onClick = {()=>this.props.onClick(i)}
    />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      history : [{squares : Array(9).fill(null)}],
      mark : true
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleReset = this.handleReset.bind(this);
  }
  handleReset(){
    this.setState({
      history : [{squares : Array(9).fill(null)}],
      mark : true
    })
  }
  handleClick(i){
    const curr = this.state.history[this.state.history.length-1];
    const squares = curr.squares.slice();
    if(calculateWinner(squares) || squares[i]){ return }
    squares[i] = this.state.mark? "X":"O";
    this.setState({
      history : [...this.state.history,{squares:squares}],
      mark : !this.state.mark, 
    })
  }
  render() {
    let status
    const history = this.state.history;
    const curr_squares = history[history.length-1].squares.slice();
    const winner = calculateWinner(curr_squares);
    if(winner){
      status = "WINNER: " + winner;
    }else{status = "Next Up:  " + (this.state.mark? "X" :"O")}
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares = {curr_squares}
            onClick = {(i)=>this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <Reset onClick = {this.handleReset}/>
          </div>
        </div>
      </div>
    );
  }
}

function Reset(props){
  return(
    <div>
      <button
        onClick = {props.onClick}      
      >RESET</button>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);
