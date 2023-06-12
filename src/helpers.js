'use strict';

/**
 * Get a random integer number.
 * @param {number} min Minimum.
 * @param {number} max Maximum.
 * @returns {number} Random integer number.
 */
export function getRandomInteger(min, max) {
  const i = min && typeof min === 'number' ? min : 0;
  const j = max && typeof max === 'number' ? max : 0;

  return Math.floor(Math.random() * (j - i) + i);
}
