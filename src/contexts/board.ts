import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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

const boardSlice = createSlice({
  name: 'board',
  initialState: [] as Cell[][],
  reducers: {
    // action이 어떻게 전달되는지 파악해야..
    select: (state, action: PayloadAction<Coordination>) => {
      const { row, col } = action.payload;
      state[row][col].selected = !state[row][col].selected;
    },
    flag: (state, action: PayloadAction<Coordination>) => {
      const { row, col } = action.payload;
      state[row][col].flaged = !state[row][col].flaged;
    },
    init: (state, action: PayloadAction<Cell[][]>) => {
      return action.payload;
    },
  },
});

export default boardSlice;
