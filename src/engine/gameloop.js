'use strict';

/** Class Gameloop to represent game event loop. */
export class Gameloop {
  /** Create Gameloop class instance. */
  constructor() {
    this.#init();
  }

  /** Start the game. */
  start() {
    if (this.isGameOver) {
      this.clear();
    }
    this.isPaused = false;
    this.canMove = true;
  }

  /** Stop the game. */
  stop() {
    this.isPaused = true;
    this.canMove = false;
    clearTimeout(this.interval);
  }

  /** Set game over. */
  setGameOver() {
    this.isGameOver = true;
    this.stop();
  }

  /** Reset the game. */
  clear() {
    this.stop();
    this.#init();
  }

  /**
   * Initialize Gameloop class instance.
   * @private
   */
  #init() {
    this.interval = null;
    this.isGameOver = false;
    this.isPaused = false;
    this.canMove = true;
  }
}

export default Gameloop;
