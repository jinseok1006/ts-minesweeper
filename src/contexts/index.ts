import { configureStore } from '@reduxjs/toolkit';

import type { Cell } from './board';

import boardSlice from './board';
import flagModeSlice from './flagMode';
import minesSlice from './mines';

export interface State {
  board: Cell[][];
  flagMode: boolean;
  mines: number;
}

const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
    flagMode: flagModeSlice.reducer,
    mines: minesSlice.reducer,
  },
  devTools: true,
});

export type Dispatch = typeof store.dispatch;

export default store;
