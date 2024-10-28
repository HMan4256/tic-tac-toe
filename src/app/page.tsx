"use client"

import { useState } from "react";

function Square({ value, onSquareClick }: {value: string, onSquareClick: () => void}) {
  return (
    <button onClick={onSquareClick} className="text-4xl font-bold border-2 h-32 w-32 bg-slate-800">{value}</button>
  )
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null));
  const grid_buttons = Array.from({ length: 9 }, (_, index) => <Square value={squares[index]} onSquareClick={() => handleClick(index)} key={index+1}/>);

  let msg;
  const winner = calculateWinner(squares);
  if (winner) {
    msg = "Winner: " + winner;
  } else {
    msg = "Next move: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }

    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetBoard() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <>
      <div className="grid grid-rows-3 grid-cols-3 gap-x-0 gap-y-0 w-max h-max border-2 rounded">
        {grid_buttons}
      </div>
      <p className="text-xl p-5 text-white/75 uppercase">{msg}</p>
      <button onClick={resetBoard}>Reset</button>
    </>
  )
}

function calculateWinner(squares: number[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto">
      <h1 className="mb-10 text-center text-4xl font-bold bg-slate-800 p-5 px-24 w-fit rounded-xl">Tic-Tac-Toe</h1>
      <Board />
    </div>
  );
}
