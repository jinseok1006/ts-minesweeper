import { configureStore } from '@reduxjs/toolkit';

import boardSlice from './board';
import flagModeSlice from './flagMode';
import minesSlice from './mines';

const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
    flagMode: flagModeSlice.reducer,
    mines: minesSlice.reducer,
  },
  devTools: true,
});

export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
