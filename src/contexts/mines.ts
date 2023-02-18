import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const minesSlice = createSlice({
  name: 'mines',
  initialState: 0,
  reducers: {
    set: (state, action: PayloadAction<number>) => {
      return action.payload;
    },
    decrease: (state) => {
      return state - 1;
    },
    increase: (state) => {
      return state + 1;
    },
  },
});

export default minesSlice;
