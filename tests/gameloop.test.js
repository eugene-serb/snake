'use strict';

import Gameloop from '../src/gameloop.js';

describe('[Class][Gameloop] create instance', () => {
  const gameloop = new Gameloop();

  test('Object is being created', () => {
    expect(gameloop).not.toBeNull();
  });

  test('Object has isGameOver and this false after init', () => {
    expect(gameloop.isGameOver).toBe(false);
  });

  test('Object has isPaused and this false after init', () => {
    expect(gameloop.isPaused).toBe(false);
  });
});

describe('[Class][Gameloop] call start', () => {
  const gameloop = new Gameloop();
  gameloop.start();

  test('After call start isPaused is false', () => {
    expect(gameloop.isPaused).toBe(false);
  });

  test('After call start isGameOver is false', () => {
    expect(gameloop.isGameOver).toBe(false);
  });
});

describe('[Class][Gameloop] call stop after call start', () => {
  const gameloop = new Gameloop();
  gameloop.start();
  gameloop.stop();

  test('After call stop isPaused is true', () => {
    expect(gameloop.isPaused).toBe(true);
  });

  test('After call stop isGameOver is false', () => {
    expect(gameloop.isGameOver).toBe(false);
  });
});

describe('[Class][Gameloop] call setGameOver after call start', () => {
  const gameloop = new Gameloop();
  gameloop.start();
  gameloop.setGameOver();

  test('After call setGameOver isPaused is true', () => {
    expect(gameloop.isPaused).toBe(true);
  });

  test('After call setGameOver isGameOver is true', () => {
    expect(gameloop.isGameOver).toBe(true);
  });
});

describe('[Class][Gameloop] call clear after call start', () => {
  const gameloop = new Gameloop();
  gameloop.start();
  gameloop.clear();

  test('After call clear isPaused is false', () => {
    expect(gameloop.isPaused).toBe(false);
  });

  test('After call clear isGameOver is false', () => {
    expect(gameloop.isGameOver).toBe(false);
  });
});
