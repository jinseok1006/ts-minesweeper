import * as React from 'react';
import styled from 'styled-components';
import { VscDebugConsole } from 'react-icons/vsc';

import debugSlice from '@/store/debug';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

const Panel = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;

  button {
    cursor: pointer;
    width: 50px;
    height: 50px;
  }
`;

export default function Debug() {
  const debug = useSelector((state: RootState) => state.debug);
  const dispatch = useDispatch();

  return (
    <Panel>
      <button onClick={() => dispatch(debugSlice.actions.toggle())}>
        <VscDebugConsole size="1.5rem" color={debug ? 'red' : 'unset'} />
      </button>
    </Panel>
  );
}
