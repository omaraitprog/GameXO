import { useState } from 'react';
import './App.css';

function Square({ value, onClick }) {
  return (
    <button className="Square" onClick={onClick}>
      {value}
    </button>
  );
}

function App() {
  

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const currentSquares = history[stepNumber];
  const winner = calculateWinner(currentSquares);

  function handleClick(index) {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.slice();

    if (winner || squares[index]) return;

    squares[index] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, squares]);
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const status = winner
    ? `Winner: ${winner}`
    : stepNumber === 9
    ? "Match Drawn"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <>
    
      <h3>{status}</h3>

      <div className="board">
        {[0, 1, 2].map((row) => (
          <div className="board-row" key={row}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <Square
                  key={index}
                  value={currentSquares[index]}
                  onClick={() => handleClick(index)}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // horizontales
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // verticales
    [0, 4, 8],
    [2, 4, 6], // diagonales
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // X ou O
    }
  }

  return null;
}

export default App;
