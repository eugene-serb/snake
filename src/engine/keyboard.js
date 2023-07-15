'use strict';

/** Class Keyboard for handle keyboard controls. */
export class Keyboard {
  /** Create Keyboard class instance.
   * @param {any} context Context object for controls.
   */
  constructor(context) {
    this._context = context;
    this.#handle();
  }

  /**
   * Handle controls of the keyboard.
   * @private
   */
  #handle() {
    window.addEventListener('keydown', (e) => {
      if (!this._context.isGameOver) {
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
          this._context.moveToLeft();
        } else if (e.code === 'ArrowUp' || e.code === 'KeyW') {
          this._context.moveToUp();
        } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
          this._context.moveToRight();
        } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
          this._context.moveToDown();
        }
      }

      if (e.code === 'KeyR') {
        this._context.clear();
        this._context.start();
      }

      if (e.code === 'KeyP') {
        if (!this._context.isGameOver) {
          if (this._context.isPaused) {
            this._context.start();
          } else {
            this._context.stop();
          }
        }
      }
    });
  }
}

export default Keyboard;
