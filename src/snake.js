'use strict';

import { getRandomInteger } from '@/helpers.js';

export class Snake {
  constructor(map_width, map_height) {
    this.map_width = map_width;
    this.map_height = map_height;

    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 1;
    this.direction = 'Up';
    this.canRotate = false;
    this.canGrow = false;
    this.isAlive = true;
    this.isPaused = false;
    this.tails = [];
    this.maxTails = 3;

    this.#generate();
    this.draw();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    this.#collisionBorder();

    this.tails.unshift({ x: this.x, y: this.y });

    if (this.tails.length > this.maxTails) {
      this.tails.pop();
    }

    this.canRotate = true;
  }

  draw() {
    this.tails.forEach((item, index) => {
      if (index === 0) {
        document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.add('snakeHead');
      } else {
        document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.add('snakeTail');
      }
    });
  }

  #collisionBorder() {
    if (this.x > this.map_width) {
      this.x = 1;
    } else if (this.x < 1) {
      this.x = this.map_width;
    }

    if (this.y > this.map_height) {
      this.y = 1;
    } else if (this.y < 1) {
      this.y = this.map_height;
    }
  }

  #generate() {
    let randomDirection = getRandomInteger(1, 5);
    let xMin = 0, xMax = 0, yMin = 0, yMax = 0;

    switch (randomDirection) {
      case 1:
        this.dx = 0;
        this.dy = 1;
        this.direction = 'Up';
        xMin = 1; xMax = this.map_width;
        yMin = 3; yMax = this.map_height;
        break;
      case 2:
        this.dx = 1;
        this.dy = 0;
        this.direction = 'Right';
        xMin = 3; xMax = this.map_width;
        yMin = 1; yMax = this.map_height;
        break;
      case 3:
        this.dx = 0;
        this.dy = -1;
        this.direction = 'Down';
        xMin = 1; xMax = this.map_width;
        yMin = 1; yMax = this.map_height - 2;
        break;
      default:
        this.dx = -1;
        this.dy = 0;
        this.direction = 'Left';
        xMin = 1; xMax = this.map_width - 2;
        yMin = 1; yMax = this.map_height;
        break;
    }

    this.x = getRandomInteger(xMin, xMax);
    this.y = getRandomInteger(yMin, yMax);

    this.tails = [
      { x: this.x, y: this.y },
      { x: this.x - this.dx, y: this.y - this.dy },
      { x: this.x - (this.dx + this.dx), y: this.y - (this.dy + this.dy) }
    ];
  }
}

export default Snake;
