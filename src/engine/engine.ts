import { getRandomInt } from "./helpers";

export enum CellState {
  Die = 0,
  Live = 1,
}

export type Board = Array<Array<CellState>>;
export type Position = [number, number]; // row, col

export const getEmptyBoard = (edgeSize: number): Board => {
  let board: Board = [];
  for (let r = 0; r < edgeSize; r++) {
    board = [...board, new Array(edgeSize).fill(CellState.Die)];
  }
  return board;
};

export const populateEmptyBoard = (
  numberOfCells: number,
  board: Board
): Board => {
  let cell, row, col;
  const rows = board.length;
  const cols = board[0].length;

  for (let i = 0; i < numberOfCells; i++) {
    do {
      row = getRandomInt(0, rows);
      col = getRandomInt(0, cols);
      cell = board[row][col];
    } while (cell === CellState.Live);

    board[row][col] = CellState.Live;
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
  [row, col]: Position
): number => {
  const maxIndex = board.length - 1;

  const left = row - 1 >= 0 ? row - 1 : maxIndex;
  const right = row + 1 <= maxIndex ? row + 1 : 0;
  const up = col - 1 >= 0 ? col - 1 : maxIndex;
  const down = col + 1 <= maxIndex ? col + 1 : 0;

  let numberOfLiveNeighbors = 0;
  numberOfLiveNeighbors += board[left][col] || 0;
  numberOfLiveNeighbors += board[right][col] || 0;
  numberOfLiveNeighbors += board[row][up] || 0;
  numberOfLiveNeighbors += board[row][down] || 0;
  numberOfLiveNeighbors += board[left][up] || 0;
  numberOfLiveNeighbors += board[left][down] || 0;
  numberOfLiveNeighbors += board[right][up] || 0;
  numberOfLiveNeighbors += board[right][down] || 0;

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
  const nextBoard: Board = new Array(board.length)
    .fill(null)
    .map(() => new Array(board.length));

  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const numberOfLiveNeighbors = getNumberOfLiveNeighbors(board, [
        rowIndex,
        colIndex,
      ]);
      const nextCellState = computeNextCellState(numberOfLiveNeighbors, cell);
      nextBoard[rowIndex][colIndex] = nextCellState;
    });
  });

  return nextBoard;
};
