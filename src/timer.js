'use strict';

export class Timer {
  constructor(container) {
    this.$container = container;

    this.time = '00:00'
    this.timeStart = Date.now();
    this.timeNow = this.timeStart;

    this.draw()
  };

  draw = () => {
    this.#calculate();
    this.$container.innerText = `Round Time: ${this.time}`;
  };
  #calculate = () => {
    this.timeNow = Date.now();
    let delta = this.timeNow - this.timeStart;

    let seconds = Math.floor(delta / 1000);
    let minutes = 0;

    if (seconds >= 60) {
      minutes = Math.floor(seconds / 60);
      seconds = seconds - (minutes * 60);
    };

    minutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;

    this.time = `${minutes}:${seconds}`;
  };
};

export default Timer;
