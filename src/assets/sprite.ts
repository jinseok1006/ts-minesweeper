import type1 from './type1.svg';
import type2 from './type2.svg';
import type3 from './type3.svg';
import type4 from './type4.svg';
import type5 from './type5.svg';
import type6 from './type6.svg';
import type7 from './type7.svg';
import type8 from './type8.svg';
import flag from './flag.svg';
import mine from './mine.svg';

const symbols = {
  flag,
  mine,
};

const numbers = [type1, type2, type3, type4, type5, type6, type7, type8];

const images: HTMLImageElement[] = [];

function preload(args: string[]) {
  for (const src of args) {
    const image = new Image();
    image.src = src;
    images.push(image);
  }
}

preload(numbers);
preload(Object.values(symbols));

export { symbols, numbers };
