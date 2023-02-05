'use strict';

export class Touchscreen {
  constructor(context, container) {
    this._context = context;
    this._container = container;
    this.#handle();
  }

  #handle() {
    let startX = 0;
    let startY = 0;

    this._container.addEventListener('touchstart', (event) => {
      startX = event.touches[0].pageX;
      startY = event.touches[0].pageY;
    });

    this._container.addEventListener('touchend', (event) => {
      const endX = event.changedTouches[0].pageX;
      const endY = event.changedTouches[0].pageY;

      const x = endX - startX;
      const y = endY - startY;

      const absX = Math.abs(x) > Math.abs(y);
      const absY = Math.abs(y) > Math.abs(x);

      if (x > 0 && absX) {
        this._context.moveToRight();
      } else if (x < 0 && absX) {
        this._context.moveToLeft();
      } else if (y > 0 && absY) {
        this._context.moveToDown();
      } else if (y < 0 && absY) {
        this._context.moveToUp();
      }
    });
  }
}

export default Touchscreen;
