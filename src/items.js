'use strict';

import { getRandomInteger } from '@/helpers.js';

export class ThingsFactory {
  constructor() {
    this.createThing = () => { };
  }
}

export class BorderFactory extends ThingsFactory {
  constructor() {
    super();

    this.createThing = () => {
      return new Border();
    };
  }
}

export class AppleFactory extends ThingsFactory {
  constructor() {
    super();

    this.createThing = () => {
      return new Apple();
    };
  }
}

export class MouseFactory extends ThingsFactory {
  constructor() {
    super();

    this.createThing = () => {
      return new Mouse();
    };
  }
}

export class HolyWaterFactory extends ThingsFactory {
  constructor() {
    super();

    this.createThing = () => {
      return new HolyWater();
    };
  }
}

export class CrapFactory extends ThingsFactory {
  constructor() {
    super();

    this.createThing = () => {
      return new Crap();
    };
  }
}

export class BombFactory extends ThingsFactory {
  constructor() {
    super();

    this.createThing = () => {
      return new Bomb();
    };
  }
}

export class Subject {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.rottingStage = 0;
    this.maxRottingStage = 0;

    this.className = '';
  }

  update = () => {
    this.rottingStage++;
  };

  generate = () => {
    let allCells = document.querySelectorAll('.cell');
    let emptyCell = [];

    allCells.forEach((item) => {
      if (!item.classList.contains('snakeTail') && !item.classList.contains('snakeHead') && !item.classList.contains('thing')) {
        emptyCell.push(item);
      }
    });

    let randomInteger = getRandomInteger(1, emptyCell.length);

    this.x = +emptyCell[randomInteger].getAttribute('x');
    this.y = +emptyCell[randomInteger].getAttribute('y');
  };

  draw = () => {
    document.querySelector(`[x = "${this.x}"][y = "${this.y}"]`).classList.add('thing', this.className);
  };
}

export class Border extends Subject {
  constructor() {
    super();

    this.maxRottingStage = 0;
    this.className = 'border';

    this.generate();
    this.draw();
  }

  update = () => { };
}

export class Apple extends Subject {
  constructor() {
    super();

    this.maxRottingStage = 50;
    this.className = 'apple';

    this.generate();
    this.draw();
  }
}

export class Mouse extends Subject {
  constructor() {
    super();

    this.maxRottingStage = 25;
    this.className = 'mouse';

    this.generate();
    this.draw();
  }
}

export class HolyWater extends Subject {
  constructor() {
    super();

    this.maxRottingStage = 25;
    this.className = 'holywater';

    this.generate();
    this.draw();
  }
}

export class Crap extends Subject {
  constructor() {
    super();

    this.maxRottingStage = 100;
    this.className = 'crap';

    this.generate();
    this.draw();
  }
}

export class Bomb extends Subject {
  constructor() {
    super();

    this.maxRottingStage = 100;
    this.className = 'bomb';

    this.generate();
    this.draw();
  }
}
