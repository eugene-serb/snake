'use strict';

export class Gamepad {
  constructor(context) {
    this._context = context;
    this.#init();
  }

  #init() {
    if (!this.#checkGamepadSupport()) {
      return;
    }

    this.LISTENER_INTERRUPT = 10;
    this.KEYPRESS_INTERRUPT = 500;

    this._gamepadInterval = null;
    this._keypressCooldown = 0;

    this.#connectGamepad();
  }

  #connectGamepad() {
    window.addEventListener('gamepadconnected', () => {
      const update = () => {
        this._keypressCooldown += this.LISTENER_INTERRUPT;

        const [gamepad] = navigator.getGamepads();

        let isPressed = false;
        let button = null;

        gamepad.buttons.forEach((item, index) => {
          if (item.value === 1) {
            button = index;
            isPressed = true;
          }
        });

        if (!isPressed) {
          return;
        } else {
          this.#handle(button);
        }
      };

      this._gamepadInterval = setInterval(update, this.LISTENER_INTERRUPT);
    });
  }

  #handle(button) {
    if (button === 12) {
      this._context.moveToUp();
      this._keypressCooldown = 0;
    }

    if (button === 13) {
      this._context.moveToDown();
      this._keypressCooldown = 0;
    }

    if (button === 14) {
      this._context.moveToLeft();
      this._keypressCooldown = 0;
    }

    if (button === 15) {
      this._context.moveToRight();
      this._keypressCooldown = 0;
    }

    if (this._keypressCooldown >= this.KEYPRESS_INTERRUPT) {
      if (button === 8) {
        if (this._context.isPaused) {
          this._context.start();
          this._keypressCooldown = 0;
        } else {
          this._context.stop();
          this._keypressCooldown = 0;
        }
      }

      if (button === 9) {
        this._context.clear();
        this._context.start();
        this._keypressCooldown = 0;
      }
    }
  }

  #checkGamepadSupport() {
    return 'getGamepads' in window.navigator;
  }
}

export default Gamepad;
