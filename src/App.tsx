import React, { useEffect, useState, useRef, useCallback } from "react";

import "./App.css";
import { getStartingBoard, getNextBoard, Board, getGameBoard } from "./engine";

const DiedCell = <div className="diedCell" />;
const LiveCell = <div className="liveCell" />;
const Cell = [DiedCell, LiveCell];

const BOARD_EDGE_SIZE = 120;
const STARTING_POPULATION_SIZE = 1400;
const INTERVAL = 150; //ms

function App() {
  const [generation, setGeneration] = useState<number>(0);

  const boardRef = useRef<Board>();
  boardRef.current =
    boardRef.current ||
    getStartingBoard(STARTING_POPULATION_SIZE, BOARD_EDGE_SIZE);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextBoard = getNextBoard(boardRef.current || []);
      boardRef.current = nextBoard;
      setGeneration((generation) => generation + 1);
    }, INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const handleReset = useCallback(() => {
    boardRef.current = getStartingBoard(
      STARTING_POPULATION_SIZE,
      BOARD_EDGE_SIZE
    );
    setGeneration(1);
  }, []);

  const gameBoard = getGameBoard(boardRef.current);

  return (
    <div className="App">
      <div className="board">
        {gameBoard.map((row) => {
          return <div className="row">{row.map((cell) => Cell[cell])}</div>;
        })}
      </div>
      <div className="sideMenu">
        <h2>The Game of Life</h2>
        <button type="reset" className="resetButton" onClick={handleReset}>
          Reset
        </button>
        <p>generation: {generation}</p>
      </div>
    </div>
  );
}

export default App;
