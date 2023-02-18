import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';

import store from './contexts';

import Board from './components/Board';
import ModeComponent from './components/Mode';

// dimension of board
export const COL_MAX = 7;
export const ROW_MAX = 13;

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
  return (
    <>
      <Board />
      <Panel>
        <ModeComponent />
      </Panel>
    </>
  );
}

export default App;
