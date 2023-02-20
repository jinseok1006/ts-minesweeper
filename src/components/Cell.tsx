import * as React from 'react';
import { boolToString } from '../util';
import styled, { css } from 'styled-components';

import type { Cell } from '@/store/board';

import flag from '@/assets/flag.svg';
import mine from '@/assets/mine.svg';

import numbers from '@/assets/numbers';

interface CellBlockProps {
  mined: boolean;
  selected: boolean;
  flaged: boolean;
  mines: number;
}

const selectedStyled = css`
  border-style: solid;
  border-color: rgb(156, 156, 156);
  border-width: 2px;
  border-bottom: none;
  border-right: none;
`;

const CellBlock = styled.div`
  // instead of !important
  && {
    ${({ mined, mines, selected, flaged }: CellBlockProps) => {
      if (selected) {
        if (mined)
          return css`
            background-image: url(${mine});
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
            background-color: rgb(255, 0, 0);
            ${selectedStyled}
          `;
        else
          return css`
            background-image: ${mines && `url(${numbers[mines - 1]})`};
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;

            ${selectedStyled}
          `;
      } else if (flaged)
        return css`
          background-image: ${flaged && `url(${flag})`};
          background-size: 135% 135%;
          background-repeat: no-repeat;
          background-position: center;
        `;
    }}
  }
`;

interface CellProps {
  cell: Cell;
  debug: boolean;
  handleSelect: (rowInput: number, colInput: number) => void;
  handleRightclick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rowInput: number,
    colInput: number
  ) => void;
}

export default function CellComponent({
  cell,
  debug,
  handleSelect,
  handleRightclick,
}: CellProps) {
  const { colIndex, rowIndex, mined, selected, flaged, mines } = cell;

  return (
    <CellBlock
      mined={mined}
      selected={selected}
      flaged={flaged}
      mines={mines}
      onClick={() => handleSelect(rowIndex, colIndex)}
      onContextMenu={(e) => handleRightclick(e, rowIndex, colIndex)}
    >
      {debug ? (
        <>
          {boolToString(mined)}
          {mines}
        </>
      ) : null}
    </CellBlock>
  );
}
