import * as React from 'react';
import { BsFlagFill } from 'react-icons/bs';

interface ModeProps {
  flagMode: boolean;
  toggleFlagMode: () => void;
}

export default function ModeComponent({ flagMode, toggleFlagMode }: ModeProps) {
  return (
    <button onClick={toggleFlagMode}>
      <BsFlagFill size="1.5rem" color={flagMode ? 'red' : 'unset'} />
    </button>
  );
}
