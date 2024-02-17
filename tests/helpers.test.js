'use strict';

import { getRandomInteger } from '@/engine/helpers.js';

describe('[Helpers] function getRandomInteger', () => {
  test('Call without params', () => {
    const number = getRandomInteger();

    expect(number).toBe(0);
    expect(typeof number).toBe('number');
  });

  test('Generate many time number with params', () => {
    const min = 0;
    const max = 10;
    const count = 100;
    let isValid = true;

    for (let i = 0; i < count; i++) {
      const number = getRandomInteger(min, max);

      if (!typeof number === 'number' || number < min || number >= max) {
        isValid = false;
      }
    }

    expect(isValid).toBe(true);
  });
});
