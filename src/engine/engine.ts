import { getRandomInt } from "./helpers";

export enum CellState {
  Die = 0,
  Live = 1,
}
export type Board = Array<CellState>;

export const getEmptyBoard = (edgeSize: number): Board => {
  const board: Board = [];
  const size = edgeSize * edgeSize;

  for (let i = 0; i < size; i++) {
    board[i] = CellState.Die;
  }

  return board;
};

export const populateEmptyBoard = (
  numberOfCells: number,
  board: Board
): Board => {
  let cell, cellIdx;

  for (let i = 0; i < numberOfCells; i++) {
    do {
      cellIdx = getRandomInt(0, board.length);
      cell = board[cellIdx];
    } while (cell === CellState.Live);

    board[cellIdx] = CellState.Live;
  }

  return board;
};

export const getStartingBoard = (
  numberOfCells: number,
  edgeSize: number
): Board => {
  const emptyBoard = getEmptyBoard(edgeSize);
  const startingBoard: Board = populateEmptyBoard(numberOfCells, emptyBoard);

  return startingBoard;
};

/**
 * Uses Moore Neighborhood's definition of the cell neighborhood
 */
export const getNumberOfLiveNeighbors = (
  board: Board,
  position: number
): number => {
  let numberOfLiveNeighbors = 0;
  const rowLength = Math.sqrt(board.length);

  numberOfLiveNeighbors += board[position - 1] || 0;
  numberOfLiveNeighbors += board[position + 1] || 0;
  numberOfLiveNeighbors += board[position - rowLength] || 0;
  numberOfLiveNeighbors += board[position + rowLength] || 0;
  numberOfLiveNeighbors += board[position - rowLength - 1] || 0;
  numberOfLiveNeighbors += board[position - rowLength + 1] || 0;
  numberOfLiveNeighbors += board[position + rowLength - 1] || 0;
  numberOfLiveNeighbors += board[position + rowLength + 1] || 0;

  return numberOfLiveNeighbors;
};

const computeNextCellState = (
  numberOfLiveNeighbors: number,
  cell: CellState
): CellState => {
  if (cell === CellState.Live) {
    if (numberOfLiveNeighbors < 2 || numberOfLiveNeighbors > 3) {
      return CellState.Die;
    }

    return CellState.Live;
  }

  if (numberOfLiveNeighbors === 3) return CellState.Live;

  return CellState.Die;
};

export const getNextBoard = (board: Board): Board => {
  const nextBoard: Board = [];
  board.forEach((cell, idx) => {
    const numberOfLiveNeighbors = getNumberOfLiveNeighbors(board, idx);
    const nextCellState = computeNextCellState(numberOfLiveNeighbors, cell);
    nextBoard[idx] = nextCellState;
  });

  return nextBoard;
};

export const getGameBoard = (board: Board): Array<Board> => {
  const edgeSize = Math.sqrt(board.length);
  let gameBoard: Array<Board> = [];

  for (let idx = 0; idx < board.length; idx += edgeSize) {
    gameBoard.push(board.slice(idx, idx + edgeSize));
  }

  return gameBoard;
};
