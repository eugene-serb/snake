'use strict';

import GridDrawer from '@/grid-drawer.js';
import Snake from '@/snake.js';
import Dialog from '@/dialog.js';
import Timer from '@/timer.js';
import Score from '@/score.js';
import Rating from '@/rating.js';
import Gameloop from '@/gameloop.js';
import Keyboard from '@/keyboard.js';
import Gamepad from '@/gamepad.js';
import Touchscreen from '@/touchscreen.js';
import { getRandomInteger } from '@/helpers.js';
import {
  BorderFactory, AppleFactory, MouseFactory,
  HolyWaterFactory, CrapFactory, BombFactory
} from '@/items.js';

export class SnakeGame extends Gameloop {
  constructor(params) {
    super();

    this._params = params;

    this.SPEED_RATE = (this._params?.speedRate &&
      typeof this._params?.speedRate === 'number'
    ) ? this._params?.speedRate : 250;

    this.KEY_RATING = (this._params?.keyRating &&
      typeof this._params?.keyRating === 'string'
    ) ? this._params?.keyRating : 'es:snake';

    this.#DOMs();
    this.#configurations();
    this.#eventListeners();
    this.#init();
  }

  moveToLeft() {
    if (this.snake.canRotate === true && this.snake.direction !== 'Right') {
      this.snake.dx = -1;
      this.snake.dy = 0;
      this.snake.direction = 'Left';
      this.snake.canRotate = false;
    }
  }

  moveToUp() {
    if (this.snake.canRotate === true && this.snake.direction !== 'Down') {
      this.snake.dx = 0;
      this.snake.dy = 1;
      this.snake.direction = 'Up';
      this.snake.canRotate = false;
    }
  }

  moveToRight() {
    if (this.snake.canRotate === true && this.snake.direction !== 'Left') {
      this.snake.dx = 1;
      this.snake.dy = 0;
      this.snake.direction = 'Right';
      this.snake.canRotate = false;
    }
  }

  moveToDown() {
    if (this.snake.canRotate === true && this.snake.direction !== 'Up') {
      this.snake.dx = 0;
      this.snake.dy = -1;
      this.snake.direction = 'Down';
      this.snake.canRotate = false;
    }
  }

  start() {
    super.start();
    this.interval = setInterval(this.#eventLoop.bind(this), this.SPEED_RATE);
  }

  setGameOver() {
    super.setGameOver();

    const score = this.score.value;
    const time = this.timer.value;

    this.rating.add(score, time);
    this.drawRating();
  }

  clear() {
    super.clear();
    this.#init();
  }

  drawRating() {
    this.$RATING.innerHTML = '';

    const rating = this.rating.value;

    for (let i = 0; i < rating.length && i < 10; i++) {
      const row = document.createElement('tr');
      const a = document.createElement('td');
      const b = document.createElement('td');
      const c = document.createElement('td');
      const d = document.createElement('td');

      const time = new Date(rating[i].date)

      a.innerText = i + 1;
      b.innerText = rating[i].score;
      c.innerText = rating[i].time;
      d.innerText = time.toLocaleDateString();

      row.append(a, b, c, d);

      this.$RATING.appendChild(row);
    }
  }

  #init() {
    this.rating = new Rating(this.KEY_RATING);
    this.drawRating();

    this.drawer = new GridDrawer(this.$MAP_WRAPPER, this.MAP_WIDTH, this.MAP_HEIGHT);
    this.dialog = new Dialog(this.$DIALOG_WRAPPER, this.WIN_SCORE);
    this.snake = new Snake(this.MAP_WIDTH, this.MAP_HEIGHT);
    this.timer = new Timer();
    this.score = new Score();

    this.factories = [
      new BorderFactory,
      new AppleFactory,
      new MouseFactory,
      new HolyWaterFactory,
      new CrapFactory,
      new BombFactory
    ];

    this.things = [];
    this.borders = [];

    for (let i = 0; i < 5; i++) {
      this.borders.push(this.factories[0].createThing());
    }

    for (let i = 0; i < 2; i++) {
      this.things.push(this.factories[1].createThing());
    }
  }

  #eventLoop() {
    this.#update();
    this.#draw();
    this.#eventHandler();
  }

  #update() {
    this.snake.update();

    this.things.forEach((item) => {
      item.update();
    });
  }

  #draw() {
    this.drawer.draw();
    this.snake.draw();

    this.things.forEach((item) => {
      item.draw();
    });

    this.borders.forEach((item) => {
      item.draw();
    });

    this.$TIMER.innerText = `Time: ${this.timer.value}`;
    this.$SCORE.innerText = `Score: ${this.score.value}`;
  }

  #eventHandler() {
    if (this.score.value >= 3) {
      this.snake.canGrow = true;
    } else {
      this.snake.canGrow = false;
    }

    this.things.forEach((item, index) => {
      if (item.rottingStage > item.maxRottingStage) {
        this.things.splice(index, 1);
      }

      if (this.snake.x === item.x && this.snake.y === item.y) {

        if (document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.contains('apple')) {
          if (this.snake.canGrow) this.snake.maxTails++;
          this.score.increase(1);

          this.drawer.draw();
          this.snake.draw();

          this.borders.forEach((item) => {
            item.draw();
          });

          this.things.splice(index, 1);
        }

        if (document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.contains('mouse')) {
          if (this.snake.canGrow) this.snake.maxTails++;
          this.score.increase(5);

          this.drawer.draw();
          this.snake.draw();

          this.borders.forEach((item) => {
            item.draw();
          });

          this.things.splice(index, 1);
        }

        if (document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.contains('holywater')) {

          if (this.snake.maxTails >= 5) {
            this.snake.maxTails -= 2;
            this.snake.tails.pop();
            this.snake.tails.pop();
          }

          this.drawer.draw();
          this.snake.draw();

          this.borders.forEach((item) => {
            item.draw();
          });

          this.things.splice(index, 1);
        }

        if (document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.contains('crap')) {

          if (this.snake.maxTails >= 5) {
            this.snake.maxTails -= 2;
            this.snake.tails.pop();
            this.snake.tails.pop();
          }

          this.score.decrease(10);

          this.drawer.draw();
          this.snake.draw();

          this.borders.forEach((item) => {
            item.draw();
          });

          if (this.score.value < 0) {
            this.snake.isAlive = false;
            this.dialog.end(this.score.value);
            this.setGameOver();
          }
        }

        if (document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.contains('bomb')) {
          this.snake.isAlive = false;
          this.dialog.end(this.score.value);
          this.setGameOver();
        }

      }
    });

    if (this.things.length < 2) {
      let randomInteger = getRandomInteger(1, 100);
      let randomChoose = 0;

      if (randomInteger <= 80) {
        randomChoose = 1;
      } else if (randomInteger > 80 && randomInteger <= 85) {
        randomChoose = 2;
      } else if (randomInteger > 85 && randomInteger <= 90) {
        randomChoose = 3;
      } else if (randomInteger > 90 && randomInteger <= 95) {
        randomChoose = 4;
      } else if (randomInteger > 95) {
        randomChoose = 5;
      }

      this.things.push(this.factories[randomChoose].createThing());

      this.things.forEach((item) => {
        item.draw();
      });
    }

    if (document.querySelector('.snakeHead').classList.contains('snakeTail') ||
      document.querySelector('.snakeHead').classList.contains('border') ||
      this.score.value >= this.WIN_SCORE) {

      this.snake.isAlive = false;
      this.dialog.end(this.score.value);
      this.setGameOver();
    }
  }

  #configurations() {
    this.MAP_WIDTH = 15;
    this.MAP_HEIGHT = 15;
    this.WIN_SCORE = 100;
  }

  #DOMs() {
    this.$MAP_WRAPPER = document.querySelector('#map');
    this.$DIALOG_WRAPPER = document.querySelector('#dialog');
    this.$TIMER = document.querySelector('#timer');
    this.$SCORE = document.querySelector('#score');
    this.$RATING = document.querySelector('#rating');
  }

  #eventListeners() {
    this._keyboard = new Keyboard(this);
    this._gamepads = new Gamepad(this);
    this._touchscreen = new Touchscreen(this, this.$MAP_WRAPPER);
  }
}

export default SnakeGame;
