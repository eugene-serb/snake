'use strict';

/** Class Timer for counting time from the beginning of the measurement. */
export class Timer {
  /** Create Timer class instance. */
  constructor() {
    this.#init();
  }

  /**
   * Get the current time.
   * @returns {string} Time.
   */
  get value() {
    this.#update();
    return this._value;
  }

  /** Reset time. */
  reset() {
    this.#init();
  }

  /**
   * Initialize Timer class instance.
   * @private
   */
  #init() {
    this._timeStart = Date.now();
    this._timeNow = this._timeStart;
    this._value = '00:00';
  }

  /**
   * Update the timer state.
   * @private
   */
  #update() {
    this._timeNow = Date.now();

    const delta = this._timeNow - this._timeStart;

    let seconds = Math.floor(delta / 1000);
    let minutes = 0;

    if (seconds >= 60) {
      minutes = Math.floor(seconds / 60);
      seconds = seconds - minutes * 60;
    }

    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    this._value = `${minutes}:${seconds}`;
  }
}

export default Timer;
