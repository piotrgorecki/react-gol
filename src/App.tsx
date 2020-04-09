import React, { useEffect, useState, useRef } from "react";
import "./App.css";

import {
  getStartingBoard,
  getNextBoard,
  Board,
  CellState,
  getGameBoard,
} from "./engine";

function App() {
  const [generation, setGeneration] = useState<number>(0);

  const boardRef = useRef<Board>();
  boardRef.current = boardRef.current || getStartingBoard(1200, 140);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextBoard = getNextBoard(boardRef.current || []);
      boardRef.current = nextBoard;
      setGeneration((generation) => generation + 1);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const gameBoard = getGameBoard(boardRef.current);

  return (
    <div className="App">
      <div className="board">
        {gameBoard.map((row) => {
          return (
            <div className="row">
              {row.map((cell) => (
                <div
                  className={cell === CellState.Live ? "liveCell" : "diedCell"}
                />
              ))}
            </div>
          );
        })}
      </div>
      <a>generation: {generation}</a>
    </div>
  );
}

export default App;
