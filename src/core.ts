import type { Cell } from './store/board';

import { COL_MAX, ROW_MAX } from './constants';
import { Dispatch } from './store';

import boardSlice from './store/board';
import minesSlice from './store/mines';
import { DELTA } from './constants';

function updateCellMines(board: Cell[][]): void {
  for (let i = 0; i < ROW_MAX; i++) {
    for (let j = 0; j < COL_MAX; j++) {
      board[i][j].mines = getCellMines(board, board[i][j]);
    }
  }
}

function getCellMines(board: Cell[][], cell: Cell): number {
  const { colIndex, rowIndex } = cell;

  let mines = 0;
  for (const [dx, dy] of DELTA) {
    const nx = rowIndex + dx,
      ny = colIndex + dy;

    if (nx < 0 || nx >= ROW_MAX || ny < 0 || ny >= COL_MAX) continue;

    if (board[nx][ny].mined) mines += 1;
  }

  return mines;
}

const initialCell = (rowIndex: number, colIndex: number): Cell => {
  return {
    colIndex,
    rowIndex,
    mined: false,
    selected: false,
    flaged: false,
    mines: 0,
  };
};

const MAX_MINES = 22;

const getInitialBoard = () => {
  const board: Cell[][] = Array.from({ length: ROW_MAX }, (_, i) =>
    Array.from({ length: COL_MAX }, (_, j) => initialCell(i, j))
  );

  const mingleBoard = (board: Cell[][]) => {
    let i = 0;
    while (i < MAX_MINES) {
      const rowInput = Math.floor(Math.random() * ROW_MAX),
        colInput = Math.floor(Math.random() * COL_MAX);

      if (!board[rowInput][colInput].mined) {
        board[rowInput][colInput].mined = true;
        i += 1;
      }

      console.log(rowInput, colInput, board[rowInput][colInput].mined, i);
    }
  };

  mingleBoard(board);

  updateCellMines(board);

  return board;
};

// ========================================
/* __DEBUG__ */
// const _statisticsRow: number[] = Array.from({ length: ROW_MAX }, () => 0);
// const _statisticsCol: number[] = Array.from({ length: COL_MAX }, () => 0);
// =======================================
// const mingleBoard = (board: Cell[][]) => {
//   for (let i = 0; i < 100; i++) {
//     const rowA = Math.floor(Math.random() * ROW_MAX),
//       colA = Math.floor(Math.random() * COL_MAX),
//       rowB = Math.floor(Math.random() * ROW_MAX),
//       colB = Math.floor(Math.random() * COL_MAX);

//     const temp = board[rowA][colA].mined;
//     board[rowA][colA].mined = board[rowB][colB].mined;
//     board[rowB][colB].mined = temp;

//     // =======================================
//     /* __DEBUG__ */
//     // _statisticsRow[rowA]++;
//     // _statisticsRow[rowB]++;
//     // _statisticsCol[colA]++;
//     // _statisticsCol[colB]++;
//     // =======================================
//     console.log([rowA, colA], [rowB, colB]);
//   }
// };

// mingleBoard(board);

// =======================================
/* __DEBUG__ */
// console.log(_statisticsCol, _statisticsRow);
// =======================================

export const initializeBoard = (dispatch: Dispatch): void => {
  const board = getInitialBoard();

  dispatch(boardSlice.actions.set(board));
  dispatch(minesSlice.actions.set(MAX_MINES));
};
