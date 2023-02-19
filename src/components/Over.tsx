import * as React from 'react';

import type { OverState } from '@/App';

import styled from 'styled-components';

const BackgroundBlock = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  transition: 1s ease all;
  background-color: rgba(0, 0, 0, 0.75);

  display: flex;
  justify-content: center;
  align-items: center;

  h1,
  h2 {
    color: rgb(255, 255, 255, 0.85);
    margin-bottom: 2rem;
    text-align: center;
  }

  button {
    font-size: 1rem;
    width: 100px;
    height: 50px;
    display: block;
    margin: 0 auto;
  }
`;

export default function Over({
  over,
  toggleOver,
}: {
  over: OverState;
  toggleOver: (payload: OverState) => void;
}) {
  return (
    <BackgroundBlock>
      <div>
        <h1>Game Over!</h1>
        <h2>You {over}</h2>
        <button onClick={() => toggleOver('ONGOING')}>re?</button>
      </div>
    </BackgroundBlock>
  );
}
