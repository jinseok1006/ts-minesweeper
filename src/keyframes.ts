import { keyframes } from 'styled-components';

export const slideUp = keyframes`
from {
  transform: translateY(100px);
}
to {
  transform: translateY(0px);
}
`;

export const slideDown = keyframes`
from {
  transform: translateY(0px);
}
to {
  transform: translateY(100px);
}
`;

export const fadeIn = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity:1;
  }
  to {
    opacity:0;
  }
`;
