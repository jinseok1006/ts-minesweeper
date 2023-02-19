import * as React from 'react';
import { boolToString } from '../util';
import styled, { css } from 'styled-components';

import type { Cell } from '@/contexts/board';

const CellBlock = styled.button`
  // instead of !important
  && {
    ${({ selected, flaged }: { selected: boolean; flaged: boolean }) =>
      css`
        background-color: ${() => {
          if (selected) return 'green';
          else if (flaged) return 'red';
          else return 'unset';
        }};
      `}
  }
`;

interface CellProps {
  cell: Cell;
  handleSelect: (rowInput: number, colInput: number) => void;
  handleRightclick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rowInput: number,
    colInput: number
  ) => void;
}

export default function CellComponent({
  cell,
  handleSelect,
  handleRightclick,
}: CellProps) {
  const { colIndex, rowIndex, mined, selected, flaged, mines } = cell;

  return (
    <CellBlock
      selected={selected}
      flaged={flaged}
      onClick={() => handleSelect(rowIndex, colIndex)}
      onContextMenu={(e) => handleRightclick(e, rowIndex, colIndex)}
    >
      {/* {rowIndex}
      {colIndex}
      <br />
      {boolToString(mined)}
      {boolToString(selected)}
      {boolToString(flaged)}
      {mines} */}
      {selected && mines ? mines : null}
    </CellBlock>
  );
}
