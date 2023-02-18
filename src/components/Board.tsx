import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { COL_MAX, CSS_WIDTH } from '@/constant';

import type { State } from '@/contexts';
import boardSlice from '@/contexts/board';

import CellComponent from './Cell';
import { initializeBoard } from '@/util';
import minesSlice from '@/contexts/mines';

const BoardBlock = styled.div`
  width: ${CSS_WIDTH}px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  border-left: 1px solid black;
  border-top: 1px solid black;

  button {
    width: calc(100% / ${COL_MAX});
    height: 50px;
    border: 1px solid black;
    border-top: none;
    border-left: none;

    user-select: none;
    transition: 0.25s ease all;

    outline: none;
    // iOS Safari has a built-in visual feedback mechanism
    // that causes the background color of a clickable element
    // to temporarily change when it is clicked.
    -webkit-tap-highlight-color: transparent;
  }
`;

export default function Board() {
  const board = useSelector((state: State) => state.board);
  const flagMode = useSelector((state: State) => state.flagMode);
  const dispatch = useDispatch();

  const handleSelect = (rowInput: number, colInput: number): void => {
    if (board[rowInput][colInput].selected) return;

    // 깃발모드
    if (flagMode) {
      // flaged -> unflaged
      if (board[rowInput][colInput].flaged) {
        dispatch(minesSlice.actions.increase());
      } else {
        dispatch(minesSlice.actions.decrease());
      }
      dispatch(boardSlice.actions.flag({ row: rowInput, col: colInput }));
    } else {
      // 지뢰 클릭시 게임초기화
      if (board[rowInput][colInput].mined) {
        alert('MINED!');
        alert('RESET BOARD');
        initializeBoard(dispatch);
      }
      // 빈칸
      else {
        dispatch(boardSlice.actions.select({ row: rowInput, col: colInput }));
      }
    }
  };

  return (
    <BoardBlock>
      {board.map((row) =>
        row.map((cell, j) => (
          <CellComponent key={j} cell={cell} handleSelect={handleSelect} />
        ))
      )}
    </BoardBlock>
  );
}
