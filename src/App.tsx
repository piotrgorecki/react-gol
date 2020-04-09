import React, { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";

import { getStartingBoard, getNextBoard, Board, getGameBoard } from "./engine";

const CellClassName = ["diedCell", "liveCell"];

function App() {
  const [generation, setGeneration] = useState<number>(0);

  const boardRef = useRef<Board>();
  boardRef.current = boardRef.current || getStartingBoard(1000, 100);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextBoard = getNextBoard(boardRef.current || []);
      boardRef.current = nextBoard;
      setGeneration((generation) => generation + 1);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleReset = useCallback(() => {
    boardRef.current = getStartingBoard(1000, 100);
    setGeneration(1);
  }, []);

  const gameBoard = getGameBoard(boardRef.current);

  return (
    <div className="App">
      <div className="board">
        {gameBoard.map((row) => {
          return (
            <div className="row">
              {row.map((cell) => (
                <div className={CellClassName[cell]} />
              ))}
            </div>
          );
        })}
      </div>
      <div className="sideMenu">
        <button type="reset" className="resetButton" onClick={handleReset}>
          Reset
        </button>
        <a>generation: {generation}</a>
      </div>
    </div>
  );
}

export default App;
