import * as React from 'react';
import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import CellComponent from './components/Cell';
import type { Cell } from './components/Cell';

import ModeComponent from './components/Mode';
import { updateMines } from './util';

// dimension of board
export const colMax = 7;
export const rowMax = 13;

// Minesweeper;

const GlobalStyle = createGlobalStyle`
  * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  }
  #root {
    padding-top: 2rem;
    min-height:110vh;
  }
`;

const Panel = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;

  button {
    cursor: pointer;
    width: 50px;
    height: 50px;
  }
`;

const Board = styled.div`
  width: 350px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  border-left: 1px solid black;
  border-top: 1px solid black;

  button {
    width: calc(100% / ${colMax});
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

const MINE_WEIGHT = 0.7;
const createMine = (): boolean => Math.random() > MINE_WEIGHT;

const initialCell = (rowIndex: number, colIndex: number): Cell => ({
  colIndex,
  rowIndex,
  mined: createMine(),
  selected: false,
  flag: false,
  mine: 0,
});

const initializeBoard = () => {
  const board: Cell[][] = Array.from({ length: rowMax }, (_, i) =>
    Array.from({ length: colMax }, (_, j) => initialCell(i, j))
  );

  return updateMines(board);
};

function App() {
  const [board, setBoard] = useState<Cell[][]>(initializeBoard());
  const [flagMode, setFlagMode] = useState<boolean>(false);

  const toggleFlagMode = () => {
    setFlagMode(!flagMode);
  };

  const handleSelect = (rowInput: number, colInput: number) => {
    setBoard(
      board.map((row) =>
        row.map((cell) => {
          const { rowIndex, colIndex } = cell;

          if (rowInput === rowIndex && colInput === colIndex) {
            if (cell.selected) return cell;

            if (flagMode) {
              return { ...cell, flag: !cell.flag };
            } else {
              if (cell.mined) {
                alert('MINED!');
                return cell;
              }

              return { ...cell, selected: !cell.selected };
            }
          }
          return cell;
        })
      )
    );
  };

  const handleFlag = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rowInput: number,
    colInput: number
  ) => {
    e.preventDefault();

    setBoard(
      board.map((row) =>
        row.map((cell) => {
          const { rowIndex, colIndex } = cell;

          if (rowInput === rowIndex && colInput === colIndex) {
            return { ...cell, flag: !cell.flag };
          }
          return cell;
        })
      )
    );
  };

  return (
    <>
      <GlobalStyle />
      <Board>
        {board.map((row) =>
          row.map((cell, j) => (
            <CellComponent
              key={j}
              cell={cell}
              handleSelect={handleSelect}
              handleFlag={handleFlag}
            />
          ))
        )}
      </Board>
      <Panel>
        <ModeComponent toggleFlagMode={toggleFlagMode} flagMode={flagMode} />
      </Panel>
    </>
  );
}
export default App;
