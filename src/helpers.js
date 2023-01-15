'use strict';

export function getRandomInteger(min, max) {
  const i = (min && typeof min === 'number') ? min : 0;
  const j = (max && typeof max === 'number') ? max : 0;

  return Math.floor(Math.random() * (j - i) + i);
}
