import {
  getEmptyBoard,
  CellState,
  Board,
  populateEmptyBoard,
  getStartingBoard,
  getNumberOfLiveNeighbors
} from "./engine";

const d = CellState.Die;
const l = CellState.Live;

describe("engine", () => {
  test("getEmptyBoard", () => {
    expect(getEmptyBoard(2)).toEqual([d, d, d, d]);
  });

  test("populateEmptyBoard", () => {
    const board: Board = [d, d, d, d];

    expect(board.length).toEqual(4);
    expect(
      populateEmptyBoard(2, board).reduce((acc, cell) => (acc += cell), 0)
    ).toEqual(2);
  });

  test("getStartingBoard", () => {
    const board = getStartingBoard(4, 3);

    expect(board.length).toEqual(9);
    expect(board.reduce((acc, cell) => (acc += cell), 0)).toEqual(4);
  });

  test("getNumberOfLiveNeighbors", () => {
    expect(getNumberOfLiveNeighbors([d, d, d, d, l, d, d, d, d], 4)).toEqual(0);
    expect(getNumberOfLiveNeighbors([d, l, d, l, l, l, d, l, d], 4)).toEqual(4);
    expect(getNumberOfLiveNeighbors([l, l, l, l, l, l, l, l, l], 4)).toEqual(8);
    expect(getNumberOfLiveNeighbors([d, d, d, d, d, d, d, d, d], 4)).toEqual(0);
    expect(getNumberOfLiveNeighbors([d, d, l, d, d, d, d, l, d], 4)).toEqual(2);
  });
});
