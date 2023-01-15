'use strict';

export class Score {
  constructor(value) {
    this._value = (value && typeof value === 'number') ? value : 0;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (value && typeof value === 'number') {
      this._value = value;
    } else {
      return;
    }
  }

  increase(value) {
    this._value += (value && typeof value === 'number') ? value : 1;
  }

  decrease(value) {
    this._value -= (value && typeof value === 'number') ? value : 1;
  }

  reset() {
    this._value = 0;
  }
}

export default Score;
