'use strict';

export class Gameloop {
  constructor() {
    this.#init();
  }

  start() {
    if (this.isGameOver) {
      this.clear();
    }
    this.isPaused = false;
    this.canMove = true;
  }

  stop() {
    this.isPaused = true;
    this.canMove = false;
    clearTimeout(this.interval);
  }

  setGameOver() {
    this.isGameOver = true;
    this.stop();
  }

  clear() {
    this.stop();
    this.#init();
  }

  #init() {
    this.interval = null;
    this.isGameOver = false;
    this.isPaused = false;
    this.canMove = true;
  }
}

export default Gameloop;
