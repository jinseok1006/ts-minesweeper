import * as React from 'react';
import { useSelector } from 'react-redux';

import type { State } from '@/contexts';
import styled from 'styled-components';

import { CSS_WIDTH } from '@/constant';

const HeaderBlock = styled.div`
  width: ${CSS_WIDTH}px;
  margin: 0 auto;
  margin-bottom: 3rem;

  text-align: center;
`;

export default function Header() {
  const mines = useSelector((state: State) => state.mines);

  return (
    <HeaderBlock>
      <h1>Minesweeper</h1>
      <h3>Mines: {mines}</h3>
    </HeaderBlock>
  );
}
