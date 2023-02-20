import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { COL_MAX, CSS_WIDTH } from '@/constants';

import type { RootState } from '@/store';
import boardSlice from '@/store/board';

import CellComponent from './Cell';
import minesSlice from '@/store/mines';

import type { OverState } from '@/App';

const BoardBorder = styled.div`
  border-color: rgb(198, 198, 198);
  border-width: 15px;
  border-style: solid;
  box-sizing: content-box;
  width: ${CSS_WIDTH}px;
  margin: 0 auto;
  margin-bottom: 5rem;
`;

const BoardBlock = styled.div`
  display: flex;
  flex-wrap: wrap;

  border-style: inset;
  border-width: 10px;
  /* gap: 5px; */
  div {
    width: calc(100% / ${COL_MAX});
    height: 33px;
    /* line-height: 42px; */
    text-align: center;
    background-color: rgb(198, 198, 198);
    border-width: 4px;
    border-style: outset;
    border-color: rgb(240, 240, 240);

    user-select: none;

    // iOS Safari has a built-in visual feedback mechanism
    // that causes the background color of a clickable element
    // to temporarily change when it is clicked.
    -webkit-tap-highlight-color: transparent;
  }
`;

interface BoardProps {
  toggleOver: (payload: OverState) => void;
}

export default function Board({ toggleOver }: BoardProps) {
  const { flagMode, board, debug } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  // 이상한 의존방식...?
  useEffect(() => {
    if (
      board.length > 0 &&
      board.every((row) =>
        row.every((cell) => cell.selected || (cell.mined && cell.flaged))
      )
    ) {
      toggleOver('WIN');
    }
  }, [board]);

  const handleClick = (rowInput: number, colInput: number): void => {
    if (board[rowInput][colInput].selected) return;

    // 깃발모드
    if (flagMode) {
      handleFlag(rowInput, colInput);
    } else {
      if (board[rowInput][colInput].flaged) return;
      // 지뢰
      if (board[rowInput][colInput].mined) {
        dispatch(boardSlice.actions.select({ row: rowInput, col: colInput }));
        toggleOver('DEFEAT');
      }
      // 빈칸
      else {
        dispatch(boardSlice.actions.select({ row: rowInput, col: colInput }));
      }
    }
  };

  // 승리조건은 지뢰수보다 플래그 변화에 의존하는게 더 합리적으로 보임..
  const handleFlag = (rowInput: number, colInput: number): void => {
    // mine 수 변경
    if (board[rowInput][colInput].flaged) {
      dispatch(minesSlice.actions.increase());
    } else {
      dispatch(minesSlice.actions.decrease());
    }

    // board 플래그 수정
    dispatch(boardSlice.actions.flag({ row: rowInput, col: colInput }));
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rowInput: number,
    colInput: number
  ): void => {
    e.preventDefault();
    if (board[rowInput][colInput].selected) return;
    handleFlag(rowInput, colInput);
  };

  return (
    <BoardBorder>
      <BoardBlock>
        {board.map((row) =>
          row.map((cell, j) => (
            <CellComponent
              debug={debug}
              key={j}
              cell={cell}
              handleSelect={handleClick}
              handleRightclick={handleRightClick}
            />
          ))
        )}
      </BoardBlock>
    </BoardBorder>
  );
}
