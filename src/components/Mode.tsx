import * as React from 'react';
import { BsFlagFill } from 'react-icons/bs';

import { useSelector, useDispatch } from 'react-redux';
import flagModeSlice from '@/contexts/flagMode';

import type { State } from '@/contexts';

export default function ModeComponent() {
  const flagMode = useSelector((state: State) => state.flagMode);
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
