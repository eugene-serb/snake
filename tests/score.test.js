'use strict';

import Score from '../src/score.js';

describe('[Class][Score] create instance without params', () => {
  const score = new Score();

  test('Object is being created', () => {
    expect(score).not.toBeNull();
  });

  test('Object has value and equal zero', () => {
    expect(score.value).toBe(0);
  });

  test('Call increase without n', () => {
    score.increase();
    expect(score.value).toBe(1);
  });

  test('Call increase with n = 3', () => {
    score.increase(3);
    expect(score.value).toBe(4);
  });

  test('Call decrease without n', () => {
    score.decrease();
    expect(score.value).toBe(3);
  });

  test('Call decrease with n = 3', () => {
    score.decrease(2);
    expect(score.value).toBe(1);
  });

  test('Call reset', () => {
    score.reset();
    expect(score.value).toBe(0);
  });

  test('Call setter value with dirty data', () => {
    score.value = '10';
    expect(score.value).toBe(0);
  });

  test('Call setter value with clean data', () => {
    score.value = 10;
    expect(score.value).toBe(10);
  });
});
