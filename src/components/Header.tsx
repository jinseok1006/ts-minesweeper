import * as React from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/store';
import styled from 'styled-components';

import { CSS_WIDTH } from '@/constants';

const HeaderBlock = styled.div`
  width: ${CSS_WIDTH}px;
  margin: 0 auto;
  margin-bottom: 3rem;

  text-align: center;
`;

export default function Header() {
  const mines = useSelector((state: RootState) => state.mines);

  return (
    <HeaderBlock>
      <h1>Minesweeper</h1>
      <h3>Mines: {mines}</h3>
    </HeaderBlock>
  );
}
