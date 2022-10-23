'use strict';

export class Support {
  constructor() {
    this.getRandomInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    };
  };
};

export default Support;
