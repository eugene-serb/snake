'use strict';

import Timer from '../src/timer.js';

describe('[Class][Timer] create instance', () => {
  const timer = new Timer();
  const regexp = /\d{2}:\d{2}/;

  test('Object is being created', () => {
    expect(timer).not.toBeNull();
  });

  test('Timer value has time after create object', () => {
    expect(regexp.test(timer.value)).toBe(true);
  });

  test('Timer value has time after call reset', () => {
    timer.reset();
    expect(regexp.test(timer.value)).toBe(true);
  });
});
