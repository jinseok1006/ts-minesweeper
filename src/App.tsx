import * as React from 'react';
import { useState, useEffect } from 'react';

import styled, { createGlobalStyle } from 'styled-components';
import { Provider, useDispatch } from 'react-redux';

import { initializeBoard } from './util';

import store from './store';

import Board from './components/Board';
import ModeComponent from './components/Mode';
import Header from './components/Header';
import Over from './components/Over';
import Debug from './components/Debug';

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

function App() {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <Minesweeper />
      </Provider>
    </>
  );
}

export type OverState = 'WIN' | 'DEFEAT' | 'ONGOING';
function Minesweeper() {
  const [over, setOver] = useState<OverState>('ONGOING');
  const dispatch = useDispatch();

  const toggleOver = (payload: OverState) => {
    setOver(payload);

    if (payload === 'ONGOING') {
      initializeBoard(dispatch);
    }
  };

  // 게임이 처음 시작될 때 상태 초기화
  useEffect(() => {
    initializeBoard(dispatch);
  }, []);

  return (
    <>
      <Header />
      <Board toggleOver={toggleOver} />
      <Debug />
      <Panel>
        <ModeComponent />
      </Panel>
      {over !== 'ONGOING' ? <Over over={over} toggleOver={toggleOver} /> : null}
    </>
  );
}

export default App;
