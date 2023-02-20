import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { DELTA, ROW_MAX, COL_MAX } from '@/constants';

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

// 0 일때는 8방향 클릭 가능
// 1 일때는 0이 있는 곳만 클릭 가능
const boardSlice = createSlice({
  name: 'board',
  initialState: [] as Cell[][],
  reducers: {
    select: (state, action: PayloadAction<Coordination>) => {
      const { row, col } = action.payload;

      const clickPropagation = (rowInput: number, colInput: number): void => {
        // 마인개수0 && 클릭X
        if (
          state[rowInput][colInput].mines === 0 &&
          !state[rowInput][colInput].selected
        ) {
          // 내가 다시 호출되지 않도록 처리
          state[rowInput][colInput].selected = true;

          // 8방향 탐색
          for (const [dx, dy] of DELTA) {
            const nx = rowInput + dx,
              ny = colInput + dy;

            if (nx < 0 || nx >= ROW_MAX || ny < 0 || ny >= COL_MAX) continue;

            // 0이 아닌경우에는 클릭만해주고 넘김
            if (state[nx][ny].mines !== 0) {
              state[nx][ny].selected = true;
              continue;
            }

            // 0인경우에는 다시 8방향 탐색
            // 다음 재귀에서 클릭해줌
            clickPropagation(nx, ny);
          }
        } else {
          state[rowInput][colInput].selected = true;
        }
      };

      clickPropagation(row, col);
    },
    flag: (state, action: PayloadAction<Coordination>) => {
      const { row, col } = action.payload;
      state[row][col].flaged = !state[row][col].flaged;
    },
    set: (state, action: PayloadAction<Cell[][]>) => {
      return action.payload;
    },
  },
});

export default boardSlice;
