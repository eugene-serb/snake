'use strict';

import Support from '@/support.js';
import Score from '@/score.js';
import Timer from '@/timer.js';
import Dialog from '@/dialog.js';
import Map from '@/map.js';
import Snake from '@/snake.js';
import {
  BorderFactory, AppleFactory, MouseFactory,
  HolyWaterFactory, CrapFactory, BombFactory
} from '@/items.js';

class Game {
  constructor() {
    this.#configurations();
    this.#DOMs();
    this.#eventListeners();

    this.support = new Support();

    this.#start();
  };

  #start = () => {
    this.map = new Map(this.$MAP_WRAPPER, this.MAP_WIDTH, this.MAP_HEIGHT);
    this.score = new Score(this.$SCORE_WRAPPER);
    this.timer = new Timer(this.$TIMER_WRAPPER);
    this.dialog = new Dialog(this.$DIALOG_WRAPPER, this.WIN_SCORE);
    this.snake = new Snake(this.MAP_WIDTH, this.MAP_HEIGHT);

    this.factories = [new BorderFactory, new AppleFactory, new MouseFactory, new HolyWaterFactory, new CrapFactory, new BombFactory];
    this.things = [];
    this.borders = [];

    for (let i = 0; i < 5; i++) {
      this.borders.push(this.factories[0].createThing());
    };
    for (let i = 0; i < 2; i++) {
      this.things.push(this.factories[1].createThing());
    };

    this.interval = setInterval(this.#eventLoop, this.SPEED_RATE);
  };
  #eventLoop = () => {
    this.#update();
    this.#draw();
    this.#eventHandler();
  };
  #update = () => {
    this.snake.update();

    this.things.forEach((item) => {
      item.update();
    });
  };
  #draw = () => {
    this.map.draw();
    this.score.draw();
    this.timer.draw();
    this.snake.draw();

    this.things.forEach((item) => {
      item.draw();
    });
    this.borders.forEach((item) => {
      item.draw();
    });
  };
  #eventHandler = () => {
    if (this.score.balance >= 3) {
      this.snake.canGrow = true;
    } else {
      this.snake.canGrow = false;
    }

    this.things.forEach((item, index) => {
      if (item.rottingStage > item.maxRottingStage) {
        this.things.splice(index, 1);
      };

      if (this.snake.x === item.x && this.snake.y === item.y) {

        if (document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.contains('apple')) {
          if (this.snake.canGrow) this.snake.maxTails++;
          this.score.increase(1);

          this.map.draw();
          this.snake.draw();

          this.borders.forEach((item) => {
            item.draw();
          });

          this.things.splice(index, 1);
        };

        if (document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.contains('mouse')) {
          if (this.snake.canGrow) this.snake.maxTails++;
          this.score.increase(5);

          this.map.draw();
          this.snake.draw();

          this.borders.forEach((item) => {
            item.draw();
          });

          this.things.splice(index, 1);
        };

        if (document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.contains('holywater')) {

          if (this.snake.maxTails >= 5) {
            this.snake.maxTails -= 2;
            this.snake.tails.pop();
            this.snake.tails.pop();
          };

          this.map.draw();
          this.snake.draw();

          this.borders.forEach((item) => {
            item.draw();
          });

          this.things.splice(index, 1);
        };

        if (document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.contains('crap')) {

          if (this.snake.maxTails >= 5) {
            this.snake.maxTails -= 2;
            this.snake.tails.pop();
            this.snake.tails.pop();
          };

          this.score.increase(-10);

          this.map.draw();
          this.snake.draw();

          this.borders.forEach((item) => {
            item.draw();
          });

          if (this.score.balance < 0) {
            this.snake.isAlive = false;
            this.dialog.end(this.score.balance);
            clearInterval(this.interval);
          };
        };

        if (document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.contains('bomb')) {
          this.snake.isAlive = false;
          this.dialog.end(this.score.balance);
          clearInterval(this.interval);
        };

      };
    });

    if (this.things.length < 2) {
      let randomInteger = this.support.getRandomInteger(1, 100);
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
      };

      this.things.push(this.factories[randomChoose].createThing());

      this.things.forEach((item) => {
        item.draw();
      });
    };

    if (document.querySelector('.snakeHead').classList.contains('snakeTail') ||
      document.querySelector('.snakeHead').classList.contains('border') ||
      this.score.balance >= this.WIN_SCORE) {

      this.snake.isAlive = false;
      this.dialog.end(this.score.balance);
      clearInterval(this.interval);
    };
  };

  #keyboard = () => {
    window.addEventListener('keydown', (e) => {
      if (this.snake.canRotate === true) {
        if ((e.code === 'ArrowLeft' || e.code === "KeyA") && this.snake.direction !== 'Right') {
          this.snake.dx = -1;
          this.snake.dy = 0;
          this.snake.direction = 'Left';
          this.snake.canRotate = false;
        } else if ((e.code === 'ArrowUp' || e.code === "KeyW") && this.snake.direction !== 'Down') {
          this.snake.dx = 0;
          this.snake.dy = 1;
          this.snake.direction = 'Up';
          this.snake.canRotate = false;
        } else if ((e.code === 'ArrowRight' || e.code === "KeyD") && this.snake.direction !== 'Left') {
          this.snake.dx = 1;
          this.snake.dy = 0;
          this.snake.direction = 'Right';
          this.snake.canRotate = false;
        } else if ((e.code === 'ArrowDown' || e.code === "KeyS") && this.snake.direction !== 'Up') {
          this.snake.dx = 0;
          this.snake.dy = -1;
          this.snake.direction = 'Down';
          this.snake.canRotate = false;
        };
      };

      if (e.code === 'KeyR') {
        clearInterval(this.interval);
        this.#start();
      };

      if (this.snake.isAlive === true) {
        if (e.code === 'KeyP') {
          if (this.snake.isPaused === true) {
            this.interval = setInterval(this.#eventLoop, this.SPEED_RATE);
            this.snake.isPaused = false;
          } else {
            clearInterval(this.interval);
            this.snake.isPaused = true;
          };
        };
      };
    });
  };
  #gamepads = () => {
    const checkGamepadSupport = () => {
      return 'getGamepads' in window.navigator;
    };
    const addGamepad = () => {
      if (!checkGamepadSupport()) {
        return;
      };

      window.addEventListener('gamepadconnected', (e) => {
        const update = () => {
          keyPressInterval += 10;
          let gamepads = navigator.getGamepads();
          let isPressed = false;
          let button;

          gamepads[0].buttons.forEach((item, index) => {
            if (item.value === 1) {
              button = index;
              isPressed = true;
            };
          });

          if (!isPressed) {
            return;
          } else {
            gamepadHandler(button);
          };
        };
        setInterval(update, 10);
      });
    };
    const gamepadHandler = (button) => {
      if (this.snake.canRotate === true) {
        if (button === 12 && this.snake.direction !== 'Down') {
          this.snake.dx = 0;
          this.snake.dy = 1;
          this.snake.direction = 'Up';
          this.snake.canRotate = false;
        } else if (button === 13 && this.snake.direction !== 'Up') {
          this.snake.dx = 0;
          this.snake.dy = -1;
          this.snake.direction = 'Down';
          this.snake.canRotate = false;
        } else if (button === 14 && this.snake.direction !== 'Right') {
          this.snake.dx = -1;
          this.snake.dy = 0;
          this.snake.direction = 'Left';
          this.snake.canRotate = false;
        } else if (button === 15 && this.snake.direction !== 'Left') {
          this.snake.dx = 1;
          this.snake.dy = 0;
          this.snake.direction = 'Right';
          this.snake.canRotate = false;
        };
      };

      if (keyPressInterval >= 500) {
        if (this.snake.isAlive === true) {
          if (button === 2) {
            if (this.snake.isPaused === true) {
              this.interval = setInterval(this.#eventLoop, this.SPEED_RATE);
              this.snake.isPaused = false;
              keyPressInterval = 0;
            } else {
              clearInterval(this.interval);
              this.snake.isPaused = true;
              keyPressInterval = 0;
            };
          };
        };

        if (button === 3) {
          clearInterval(this.interval);
          this.#start();
          keyPressInterval = 0;
        };
      };
    };

    let keyPressInterval = 0;
    addGamepad();
  };
  #touches = () => {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    this.$MAP_WRAPPER.addEventListener('touchstart', (event) => {
      startX = event.touches[0].pageX;
      startY = event.touches[0].pageY;
    });

    this.$MAP_WRAPPER.addEventListener('touchend', (event) => {
      endX = event.changedTouches[0].pageX;
      endY = event.changedTouches[0].pageY;

      let x = endX - startX;
      let y = endY - startY;

      let absX = Math.abs(x) > Math.abs(y);
      let absY = Math.abs(y) > Math.abs(x);

      if (this.snake.canRotate === true) {
        if (x > 0 && absX && this.snake.direction !== 'Left') {
          this.snake.dx = 1;
          this.snake.dy = 0;
          this.snake.direction = 'Right';
          this.snake.canRotate = false;
        } else if (x < 0 && absX && this.snake.direction !== 'Right') {
          this.snake.dx = -1;
          this.snake.dy = 0;
          this.snake.direction = 'Left';
          this.snake.canRotate = false;
        } else if (y > 0 && absY && this.snake.direction !== 'Up') {
          this.snake.dx = 0;
          this.snake.dy = -1;
          this.snake.direction = 'Down';
          this.snake.canRotate = false;
        } else if (y < 0 && absY && this.snake.direction !== 'Down') {
          this.snake.dx = 0;
          this.snake.dy = 1;
          this.snake.direction = 'Up';
          this.snake.canRotate = false;
        };
      };

    });
  };

  #configurations = () => {
    this.MAP_WIDTH = 15;
    this.MAP_HEIGHT = 15;
    this.WIN_SCORE = 100;
    this.SPEED_RATE = 200;
  };
  #DOMs = () => {
    this.$MAP_WRAPPER = document.querySelector('.snake-game__map-wrapper');
    this.$SCORE_WRAPPER = document.querySelector('.snake-game__score');
    this.$TIMER_WRAPPER = document.querySelector('.snake-game__timer');
    this.$DIALOG_WRAPPER = document.querySelector('.snake-game__dialog');
  };
  #eventListeners = () => {
    this.#keyboard();
    this.#gamepads();
    this.#touches();
  };
};

const GAME = new Game();
