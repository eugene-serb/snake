'use strict';

import { getRandomInteger } from '../src/helpers.js';

describe('[Helpers] function getRandomInteger', () => {

  test('Call without params', () => {
    expect(getRandomInteger()).toBe(0);
  });

  test('Generate number and only number', () => {
    const min = 0;
    const max = 10;
    const count = 100;
    const arr = [];

    for (let i = 0; i < count; i++) {
      arr.push(getRandomInteger(min, max));
    }

    const isntValid = false;

    for (let i = 0; i < arr.length; i++) {
      if (!typeof arr[i] === 'number') {
        isntValid = true; 
      } else {
        if (Math.trunc(arr[i]) !== arr[i]) {
          isntValid = true;
        }
      }
      if (isntValid) break;
    }

    expect(arr.includes(true)).not.toBe(true);
  });
});
