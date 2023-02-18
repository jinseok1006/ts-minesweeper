import * as React from 'react';
import { useEffect } from 'react';

import styled, { createGlobalStyle } from 'styled-components';
import { Provider, useDispatch } from 'react-redux';

import { initializeBoard } from './util';

import store from './contexts';

import Board from './components/Board';
import ModeComponent from './components/Mode';
import Header from './components/Header';

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
    min-height:110vh;
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

function Minesweeper() {
  const dispatch = useDispatch();

  // 게임이 처음 시작될 때 상태 초기화
  useEffect(() => {
    initializeBoard(dispatch);
  }, []);

  return (
    <>
      <Header />
      <Board />
      <Panel>
        <ModeComponent />
      </Panel>
    </>
  );
}

export default App;
