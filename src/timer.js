'use strict';

export class Timer {
  constructor() {
    this.#init();
  }

  get value() {
    this.#update();
    return this._value;
  }

  reset() {
    this.#init();
  }

  #init() {
    this._timeStart = Date.now();
    this._timeNow = this._timeStart;
    this._value = '00:00';
  }

  #update() {
    this._timeNow = Date.now();

    const delta = this._timeNow - this._timeStart;

    let seconds = Math.floor(delta / 1000);
    let minutes = 0;

    if (seconds >= 60) {
      minutes = Math.floor(seconds / 60);
      seconds = seconds - (minutes * 60);
    }

    minutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;

    this._value = `${minutes}:${seconds}`;
  }
}

export default Timer;
