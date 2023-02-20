import * as React from 'react';
import styled, { css } from 'styled-components';

import type { Cell } from '@/store/board';

import { symbols, numbers } from '@/assets/sprite';

interface CellBlockProps {
  mined: boolean;
  selected: boolean;
  flaged: boolean;
  mines: number;
  debug: boolean;
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
    ${({ debug, mined, mines, selected, flaged }: CellBlockProps) => {
      if (debug) {
        if (mined)
          return css`
            background-image: url(${symbols.mine});
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
            background-color: rgb(255, 0, 0);
            ${selectedStyled}
          `;
        else
          return css`
            background-repeat: no-repeat;
            background-image: ${mines && `url(${numbers[mines - 1]})`};
            background-size: 100%;
            background-position: center;
            ${selectedStyled}
          `;
      }

      if (selected) {
        if (mined)
          return css`
            background-image: url(${symbols.mine});
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
            background-color: rgb(255, 0, 0);
            ${selectedStyled}
          `;
        else
          return css`
            background-repeat: no-repeat;
            background-image: ${mines && `url(${numbers[mines - 1]})`};
            background-size: 100%;
            background-position: center;
            ${selectedStyled}
          `;
      } else if (flaged)
        return css`
          background-image: ${flaged && `url(${symbols.flag})`};
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

export default React.memo(function CellComponent({
  cell,
  debug,
  handleSelect,
  handleRightclick,
}: CellProps) {
  const { colIndex, rowIndex, mined, selected, flaged, mines } = cell;

  return (
    <CellBlock
      debug={debug}
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
});

function boolToString(t: boolean) {
  return t ? '1' : '0';
}
