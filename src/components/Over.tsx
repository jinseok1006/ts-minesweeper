import React, { useState } from 'react';

import type { OverState } from '@/App';

import styled, { css } from 'styled-components';
import { slideUp, slideDown, fadeIn, fadeOut } from '@/keyframes';
const ANIMATION_DURATION = 250;

const ModalBlock = styled.div`
  animation-duration: ${ANIMATION_DURATION}ms;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  animation-name: ${slideUp};

  ${({ unmount }: BlockProps) =>
    unmount &&
    css`
      animation-name: ${slideDown};
    `}
`;

const BackgroundBlock = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
  width: 100vw;
  height: 100vh;
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

  animation-duration: ${ANIMATION_DURATION}ms;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  animation-name: ${fadeIn};

  ${({ unmount }: BlockProps) =>
    unmount &&
    css`
      animation-name: ${fadeOut};
    `}
`;

interface BlockProps {
  unmount: boolean;
}

interface OverProps {
  over: OverState;
  toggleOver: (payload: OverState) => void;
}

export default function Over({ over, toggleOver }: OverProps) {
  const [unmount, setUnmount] = useState(false);

  const handleUnmount = () => {
    setUnmount(true);
    setTimeout(() => toggleOver('ONGOING'), ANIMATION_DURATION);
  };

  return (
    <BackgroundBlock unmount={unmount}>
      <ModalBlock unmount={unmount}>
        <h1>Game Over!</h1>
        <h2>You {over}</h2>
        <button onClick={handleUnmount}>re?</button>
      </ModalBlock>
    </BackgroundBlock>
  );
}
