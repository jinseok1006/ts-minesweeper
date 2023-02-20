import * as React from 'react';
import { useState, useEffect } from 'react';

import { createGlobalStyle } from 'styled-components';
import { Provider, useDispatch } from 'react-redux';

import { initializeBoard } from './core';

import store from './store';

import Board from './components/Board';

import Header from './components/Header';
import Over from './components/Over';
import Panel from './components/Panel';

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
    user-select: none;
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
      <Panel />
      {over !== 'ONGOING' ? <Over over={over} toggleOver={toggleOver} /> : null}
    </>
  );
}

export default App;
