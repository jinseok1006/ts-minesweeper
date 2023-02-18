import type { Cell } from './contexts/board';

import { COL_MAX, ROW_MAX } from './constant';

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

// 직접수정
function update(board: Cell[][]): void {
  for (let i = 0; i < ROW_MAX; i++) {
    for (let j = 0; j < COL_MAX; j++) {
      board[i][j].mines = getMines(board, board[i][j]);
    }
  }
}

export function updateMines(board: Cell[][]): Cell[][] {
  return board.map((row) =>
    row.map((cell) => ({
      ...cell,
      mine: getMines(board, cell),
    }))
  );
}

function getMines(board: Cell[][], cell: Cell): number {
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

    if (nx < 0 || nx >= ROW_MAX || ny < 0 || ny >= COL_MAX) continue;

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
