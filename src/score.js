'use strict';

/** Class Score for scoring. */
export class Score {
  /**
   * Create Score class instance.
   * @param {number} value
   */
  constructor(value) {
    this._value = value && typeof value === 'number' ? value : 0;
  }

  /**
   * Get the current score.
   * @returns {number} Score.
   */
  get value() {
    return this._value;
  }

  /**
   * Set new score.
   * @param {number} value New score.
   */
  set value(value) {
    if (value && typeof value === 'number') {
      this._value = value;
    } else {
      return;
    }
  }

  /**
   * Increase the score by a value, or by one if the value is empty.
   * @param {number} value The value by which to increase the score.
   */
  increase(value) {
    this._value += value && typeof value === 'number' ? value : 1;
  }

  /**
   * Decrease the score by a value, or by one if the value is empty.
   * @param {number} value The value by which to decrease the score.
   */
  decrease(value) {
    this._value -= value && typeof value === 'number' ? value : 1;
  }

  /** Reset the score to zero. */
  reset() {
    this._value = 0;
  }
}

export default Score;
