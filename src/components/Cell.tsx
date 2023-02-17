import * as React from 'react';
import { boolToString } from '../util';
import styled, { css } from 'styled-components';

export interface Cell {
  colIndex: number;
  rowIndex: number;
  mined: boolean;
  selected: boolean;
  flag: boolean;
  mine: number;
}

const CellBlock = styled.button`
  // instead of !important
  && {
    ${({ selected, flag }: { selected: boolean; flag: boolean }) =>
      css`
        background-color: ${() => {
          if (selected) return 'green';
          else if (flag) return 'red';
          else return 'unset';
        }};
      `}
  }
`;

interface CellProps {
  cell: Cell;
  handleSelect: (rowInput: number, colInput: number) => void;
  handleFlag: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rowInput: number,
    colInput: number
  ) => void;
}

export default function CellComponent({
  cell,
  handleSelect,
  handleFlag,
}: CellProps) {
  const { colIndex, rowIndex, mined, selected, flag, mine } = cell;

  return (
    <CellBlock
      selected={selected}
      flag={flag}
      onClick={() => handleSelect(rowIndex, colIndex)}
      onContextMenu={(e) => handleFlag(e, rowIndex, colIndex)}
    >
      {rowIndex}
      {colIndex}
      <br />
      {boolToString(mined)}
      {boolToString(selected)}
      {boolToString(flag)}
      {mine}
    </CellBlock>
  );
}
