import * as React from 'react';
import { boolToString } from '../util';
import styled, { css } from 'styled-components';

import type { Cell } from '@/contexts/board';

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
}

export default function CellComponent({ cell, handleSelect }: CellProps) {
  const { colIndex, rowIndex, mined, selected, flaged: flag, mines } = cell;

  return (
    <CellBlock
      selected={selected}
      flag={flag}
      onClick={() => handleSelect(rowIndex, colIndex)}
    >
      {rowIndex}
      {colIndex}
      <br />
      {boolToString(mined)}
      {boolToString(selected)}
      {boolToString(flag)}
      {mines}
    </CellBlock>
  );
}
