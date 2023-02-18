import { createSlice } from '@reduxjs/toolkit';

export const flagModeSlice = createSlice({
  name: 'flagMode',
  initialState: { mode: false },
  reducers: {
    toggle: (state) => {
      state.mode = !state.mode;
    },
  },
});
