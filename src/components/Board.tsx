import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { COL_MAX } from '@/constant';

import type { State } from '@/contexts';
import { boardSlice } from '@/contexts/board';

import CellComponent from './Cell';

const BoardBlock = styled.div`
  width: 350px;
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

    @media (hover: hover) {
      &:hover {
        background-color: lightgreen;
      }
    }
  }
`;

export default function Board() {
  const board = useSelector((state: State) => state.board);
  const { mode: flagMode } = useSelector((state: State) => state.flagMode);
  const dispatch = useDispatch();

  const handleSelect = (rowInput: number, colInput: number): void => {
    if (board[rowInput][colInput].selected) return;

    if (flagMode) {
      dispatch(boardSlice.actions.flaged({ row: rowInput, col: colInput }));
    } else {
      dispatch(boardSlice.actions.selected({ row: rowInput, col: colInput }));
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
