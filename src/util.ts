import type { Cell } from './contexts/board';

import { COL_MAX, ROW_MAX } from './constant';
import { Dispatch } from './contexts';

import boardSlice from './contexts/board';
import minesSlice from './contexts/mines';
import { DELTA } from './constant';

export function boolToString(t: boolean) {
  return t ? '1' : '0';
}

// 직접수정
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

export function getAllMines(board: Cell[][]): number {
  let mines = 0;
  for (let i = 0; i < ROW_MAX; i++) {
    for (let j = 0; j < COL_MAX; j++) {
      if (board[i][j].mined) mines += 1;
    }
  }

  return mines;
}

const MINE_WEIGHT = 0.8;
const createMine = (): boolean => Math.random() > MINE_WEIGHT;

const initialCell = (rowIndex: number, colIndex: number): Cell => ({
  colIndex,
  rowIndex,
  mined: createMine(),
  selected: false,
  flaged: false,
  mines: 0,
});

const getInitialBoard = () => {
  const board: Cell[][] = Array.from({ length: ROW_MAX }, (_, i) =>
    Array.from({ length: COL_MAX }, (_, j) => initialCell(i, j))
  );

  updateCellMines(board);

  return board;
};

export const initializeBoard = (dispatch: Dispatch): void => {
  const board = getInitialBoard();
  const mines = getAllMines(board);

  dispatch(boardSlice.actions.set(board));
  dispatch(minesSlice.actions.set(mines));
};
