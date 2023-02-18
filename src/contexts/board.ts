import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { COL_MAX, ROW_MAX } from '@/constant';
import { updateMines } from '@/util';

export interface Cell {
  colIndex: number;
  rowIndex: number;
  mined: boolean;
  selected: boolean;
  flaged: boolean;
  mines: number;
}

interface Coordination {
  row: number;
  col: number;
}

const MINE_WEIGHT = 0.7;
const createMine = (): boolean => Math.random() > MINE_WEIGHT;

const initialCell = (rowIndex: number, colIndex: number): Cell => ({
  colIndex,
  rowIndex,
  mined: createMine(),
  selected: false,
  flaged: false,
  mines: 0,
});

const initializeBoard = () => {
  const board: Cell[][] = Array.from({ length: ROW_MAX }, (_, i) =>
    Array.from({ length: COL_MAX }, (_, j) => initialCell(i, j))
  );

  return updateMines(board);
};

export const boardSlice = createSlice({
  name: 'board',
  initialState: initializeBoard(),
  reducers: {
    // action이 어떻게 전달되는지 파악해야..
    selected: (state, action: PayloadAction<Coordination>) => {
      const { row, col } = action.payload;
      state[row][col].selected = !state[row][col].selected;
    },
    flaged: (state, action: PayloadAction<Coordination>) => {
      const { row, col } = action.payload;
      state[row][col].flaged = !state[row][col].flaged;
    },
  },
});
