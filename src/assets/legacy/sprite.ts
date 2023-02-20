import { css } from 'styled-components';
import sprite from './sprite.png';

const type1 = css`
  width: 94px;
  height: 94px;
  background: url(${sprite}) -10px -10px;
`;

const type2 = css`
  width: 94px;
  height: 94px;
  background: url(${sprite}) -10px -124px;
`;

const type3 = css`
  width: 94px;
  height: 94px;
  background: url(${sprite}) -10px -238px;
`;

const type4 = css`
  width: 94px;
  height: 94px;
  background: url(${sprite}) -10px -352px;
`;

const type5 = css`
  width: 94px;
  height: 94px;
  background: url(${sprite}) -10px -466px;
`;

const type6 = css`
  width: 94px;
  height: 94px;
  background: url(${sprite}) -10px -580px;
`;

const type7 = css`
  width: 94px;
  height: 94px;
  background: url(${sprite}) -10px -694px;
`;

const type8 = css`
  width: 94px;
  height: 94px;
  background: url(${sprite}) -10px -808px;
`;

const flag = css`
  width: 94px;
  height: 94px;
  background: url(${sprite}) -10px -922px;
`;

const mine = css`
  width: 94px;
  height: 94px;
  background: url(${sprite}) -10px -1036px;
`;

export const types = [type1, type2, type3, type4, type5, type6, type7, type8];
export const symbols = {
  flag,
  mine,
};
