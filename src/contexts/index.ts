import { configureStore } from '@reduxjs/toolkit';
import { boardSlice } from './board';
import { flagModeSlice } from './flagMode';
import type { Cell } from './board';

export interface State {
  board: Cell[][];
  flagMode: {
    // slice가 직접 수정이 되지 않음..
    mode: boolean;
  };
}

const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
    flagMode: flagModeSlice.reducer,
  },
  devTools: true,
});

export default store;
