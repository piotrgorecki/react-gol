import {
  getEmptyBoard,
  CellState,
  Board,
  populateEmptyBoard,
  getStartingBoard,
  getNumberOfLiveNeighbors,
} from "./engine";

const d = CellState.Die;
const l = CellState.Live;

describe("engine", () => {
  test("getEmptyBoard", () => {
    expect(getEmptyBoard(2)).toEqual([
      [d, d],
      [d, d],
    ]);
  });

  test("populateEmptyBoard", () => {
    const board: Board = [
      [d, d],
      [d, d],
    ];

    expect(board.length).toEqual(2);
    expect(board[0].length).toEqual(2);
    expect(
      populateEmptyBoard(2, board).reduce(
        (acc, row) => (acc += row.reduce((acc2, col) => acc2 + col, 0)),
        0
      )
    ).toEqual(2);
  });

  test("getStartingBoard", () => {
    const board = getStartingBoard(4, 3);

    expect(board.length).toEqual(3);
    expect(board[0].length).toEqual(3);

    expect(
      board.reduce(
        (acc, row) => (acc += row.reduce((acc2, col) => acc2 + col, 0)),
        0
      )
    ).toEqual(4);
  });

  test("getNumberOfLiveNeighbors", () => {
    expect(
      getNumberOfLiveNeighbors(
        [
          [d, d, d],
          [d, d, d],
          [d, d, d],
        ],
        [1, 1]
      )
    ).toEqual(0);

    expect(
      getNumberOfLiveNeighbors(
        [
          [d, d, d],
          [d, d, d],
          [d, d, d],
        ],
        [0, 0]
      )
    ).toEqual(0);

    expect(
      getNumberOfLiveNeighbors(
        [
          [d, d, d],
          [d, d, d],
          [d, d, d],
        ],
        [2, 2]
      )
    ).toEqual(0);

    expect(
      getNumberOfLiveNeighbors(
        [
          [l, l, l],
          [l, l, l],
          [l, l, l],
        ],
        [1, 1]
      )
    ).toEqual(8);

    expect(
      getNumberOfLiveNeighbors(
        [
          [l, l, l],
          [l, l, l],
          [l, l, l],
        ],
        [0, 2]
      )
    ).toEqual(8);

    expect(
      getNumberOfLiveNeighbors(
        [
          [d, l, l],
          [d, l, l],
          [l, l, l],
        ],
        [2, 2]
      )
    ).toEqual(6);
  });
});
