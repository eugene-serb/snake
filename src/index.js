'use strict';

import SnakeGame from '@/snake-game.js';

const params = {
  speedRate: 200,
  keyRating: 'es:snake',
};

const snakeGame = new SnakeGame(params);
snakeGame.start();
