import * as React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { VscDebugConsole } from 'react-icons/vsc';
import { GrPowerReset } from 'react-icons/gr';
import { BsFlagFill } from 'react-icons/bs';

import debugSlice from '@/store/debug';
import flagModeSlice from '@/store/flagMode';
import { RootState } from '@/store';
import { initializeBoard } from '@/core';

const PanelBlock = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-between;

  button {
    display: block;
    cursor: pointer;
    width: 50px;
    height: 50px;
  }
`;

function Debug() {
  const debug = useSelector((state: RootState) => state.debug);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(debugSlice.actions.toggle())}>
      <VscDebugConsole size="1.5rem" color={debug ? 'red' : 'unset'} />
    </button>
  );
}

function Reset() {
  const dispatch = useDispatch();

  return (
    <button onClick={() => initializeBoard(dispatch)}>
      <GrPowerReset size="1.5rem" />
    </button>
  );
}

function Mode() {
  const flagMode = useSelector((state: RootState) => state.flagMode);
  const dispatch = useDispatch();

  const toggleFlagMode = () => {
    dispatch(flagModeSlice.actions.toggle());
  };

  return (
    <>
      <button onClick={toggleFlagMode}>
        <BsFlagFill size="1.5rem" color={flagMode ? 'red' : 'unset'} />
      </button>
    </>
  );
}

export default function Panel() {
  return (
    <PanelBlock>
      <Debug />
      <Reset />
      <Mode />
    </PanelBlock>
  );
}
