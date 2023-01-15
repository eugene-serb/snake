'use strict';

import { getRandomInteger } from '@/helpers.js';

export class Dialog {
  constructor(container, winScore) {
    this.$container = container;
    this.winScore = winScore;

    this.splashes = ['Eat all', 'Big snake', 'Just out of the oven', 'We are in the matrix!', 'Open-world alpha sandbox!',
      'Apples or mice?', 'Hurry up!', 'What does this food allow itself?', 'Beware the tail', 'Hmmmrmm.', 'Is it poisonous?',
      'Keep it up!', 'Ha-ha, nice', 'Home-made!', 'Contains simulated food', 'This splash text is now available', 'Quite Indie!'];

    this.draw();
  }

  draw() {
    let randomInteger = getRandomInteger(0, this.splashes.length);
    this.$container.innerText = this.splashes[randomInteger];
  }

  end(score) {
    if (score >= this.winScore) {
      this.$container.innerText = `Game Over! You won!`;
    } else {
      this.$container.innerText = `Game Over! You lose!`;
    }
  }
}

export default Dialog;
