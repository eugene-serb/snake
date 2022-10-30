'use strict';

export class Score {
  constructor(container) {
    this.$container = container;
    this.balance = 0;
  }

  increase = (n) => {
    this.balance += n;
    this.draw();
  };

  draw = () => {
    this.$container.innerText = `Your Score: ${this.balance}`;
  };
}

export default Score;
