import type { Cell } from './components/Cell';

import { colMax, rowMax } from './App';

export function boolToString(t: boolean) {
  return t ? '1' : '0';
}

const delta = [
  // [dx, dy]
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

export function updateMines(board: Cell[][]): Cell[][] {
  return board.map((row) =>
    row.map((cell) => ({
      ...cell,
      mine: searchMine(board, cell),
    }))
  );
}

function searchMine(board: Cell[][], cell: Cell): number {
  const { colIndex, rowIndex } = cell;

  // const test = (fn: () => void): void => {
  //   if (rowIndex === 0 && colIndex === 0) {
  //     fn();
  //   }
  // };

  let mines = 0;
  for (const [dx, dy] of delta) {
    const nx = rowIndex + dx,
      ny = colIndex + dy;

    if (nx < 0 || nx >= rowMax || ny < 0 || ny >= colMax) continue;

    // test(() => {
    //   console.log(nx, ny, board[nx][ny], board[nx][ny].mined);
    // });

    // try {
    //   if (board[nx][ny].mined) mines += 1;
    // } catch (e) {
    //   console.error(nx, ny);
    // }
    if (board[nx][ny].mined) mines += 1;
  }

  return mines;
}
