/* ---------- */
/* SNAKE GAME */
/* ---------- */

'use strict'

class Support {
    constructor() {
        this.getRandomInteger = (min, max) => {
            return Math.floor(Math.random() * (max - min) + min);
        };
    };
};

class Score {
    constructor(container) {
        this.$container = container;
        this.balance = 0;
    };

    increase = (n) => {
        this.balance += n;
        this.draw();
    };
    draw = () => {
        this.$container.innerText = `Your Score: ${this.balance}`;
    };
};

class Timer {
    constructor(container) {
        this.$container = container;

        this.time = '00:00'
        this.timeStart = Date.now();
        this.timeNow = this.timeStart;

        this.draw()
    };

    draw = () => {
        this.#calculate();
        this.$container.innerText = `Round Time: ${this.time}`;
    };
    #calculate = () => {
        this.timeNow = Date.now();
        let delta = this.timeNow - this.timeStart;

        let seconds = Math.floor(delta / 1000);
        let minutes = 0;

        if (seconds >= 60) {
            minutes = Math.floor(seconds / 60);
            seconds = seconds - (minutes * 60);
        };

        minutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;
        seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;

        this.time = `${minutes}:${seconds}`;
    };
};

class Dialog {
    constructor(container, winScore) {
        this.$container = container;
        this.winScore = winScore;

        this.support = new Support();

        this.splashes = ['Eat all', 'Big snake', 'Just out of the oven', 'We are in the matrix!', 'Open-world alpha sandbox!',
            'Apples or mice?', 'Hurry up!', 'What does this food allow itself?', 'Beware the tail', 'Hmmmrmm.', 'Is it poisonous?',
            'Keep it up!', 'Ha-ha, nice', 'Home-made!', 'Contains simulated food', 'This splash text is now available', 'Quite Indie!'];

        this.draw();
    };

    draw = () => {
        let randomInteger = this.support.getRandomInteger(0, this.splashes.length);
        this.$container.innerText = this.splashes[randomInteger];
    };
    end = (score) => {
        if (score >= this.winScore) {
            this.$container.innerText = `Game Over! You won!`;
        } else {
            this.$container.innerText = `Game Over! You lose!`;
        };
    };
};

class Map {
    constructor(container, width, height) {
        this.$container = container;
        this.width = width;
        this.height = height;

        this.draw();
    };

    draw = () => {
        this.$container.innerHTML = '';

        let $map = document.createElement('div');
        $map.classList.add('map');
        this.$container.appendChild($map);

        for (let y = this.height; y >= 1; y--) {
            for (let x = 1; x <= this.width; x++) {
                let $cell = document.createElement('div');
                $cell.classList.add('cell');
                $cell.setAttribute('x', x);
                $cell.setAttribute('y', y);
                $map.appendChild($cell);
            };
        };
    };
};

class Snake {
    constructor(map_width, map_height) {
        this.map_width = map_width;
        this.map_height = map_height;

        this.support = new Support();

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
    };

    update = () => {
        this.x += this.dx;
        this.y += this.dy;

        this.#collisionBorder();

        this.tails.unshift({ x: this.x, y: this.y });

        if (this.tails.length > this.maxTails) {
            this.tails.pop();
        };

        this.canRotate = true;
    };
    draw = () => {
        this.tails.forEach((item, index) => {
            if (index === 0) {
                document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.add('snakeHead');
            } else {
                document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.add('snakeTail');
            };
        });
    };

    #collisionBorder = () => {
        if (this.x > this.map_width) {
            this.x = 1;
        } else if (this.x < 1) {
            this.x = this.map_width;
        };

        if (this.y > this.map_height) {
            this.y = 1;
        } else if (this.y < 1) {
            this.y = this.map_height;
        };
    };
    #generate = () => {
        let randomDirection = this.support.getRandomInteger(1, 5);
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
        };

        this.x = this.support.getRandomInteger(xMin, xMax);
        this.y = this.support.getRandomInteger(yMin, yMax);

        this.tails = [
            { x: this.x, y: this.y },
            { x: this.x - this.dx, y: this.y - this.dy },
            { x: this.x - (this.dx + this.dx), y: this.y - (this.dy + this.dy) }
        ];
    };
};

/* ---------------- */
/* THINGS FACTORIES */
/* ---------------- */

class ThingsFactory {
    constructor() {
        this.createThing = () => { };
    };
};

class BorderFactory extends ThingsFactory {
    constructor() {
        super();

        this.createThing = () => {
            return new Border();
        };
    };
};

class AppleFactory extends ThingsFactory {
    constructor() {
        super();

        this.createThing = () => {
            return new Apple();
        };
    };
};

class MouseFactory extends ThingsFactory {
    constructor() {
        super();

        this.createThing = () => {
            return new Mouse();
        };
    };
};

class HolyWaterFactory extends ThingsFactory {
    constructor() {
        super();

        this.createThing = () => {
            return new HolyWater();
        };
    };
};

class CrapFactory extends ThingsFactory {
    constructor() {
        super();

        this.createThing = () => {
            return new Crap();
        };
    };
};

class BombFactory extends ThingsFactory {
    constructor() {
        super();

        this.createThing = () => {
            return new Bomb();
        };
    };
};

/* ------ */
/* THINGS */
/* ------ */

class Subject {
    constructor() {
        this.support = new Support();

        this.x = 0;
        this.y = 0;

        this.rottingStage = 0;
        this.maxRottingStage = 0;

        this.className = '';
    };

    update = () => {
        this.rottingStage++;
    };
    generate = () => {
        let allCells = document.querySelectorAll('.cell');
        let emptyCell = [];

        allCells.forEach((item) => {
            if (!item.classList.contains('snakeTail') && !item.classList.contains('snakeHead') && !item.classList.contains('thing')) {
                emptyCell.push(item);
            };
        });

        let randomInteger = this.support.getRandomInteger(1, emptyCell.length);

        this.x = +emptyCell[randomInteger].getAttribute('x');
        this.y = +emptyCell[randomInteger].getAttribute('y');
    };
    draw = () => {
        document.querySelector(`[x = "${this.x}"][y = "${this.y}"]`).classList.add('thing', this.className);
    };
};

class Border extends Subject {
    constructor() {
        super();

        this.maxRottingStage = 0;
        this.className = 'border';

        this.generate();
        this.draw();
    };

    update = () => { };
};

class Apple extends Subject {
    constructor() {
        super();

        this.maxRottingStage = 50;
        this.className = 'apple';

        this.generate();
        this.draw();
    };
};

class Mouse extends Subject {
    constructor() {
        super();

        this.maxRottingStage = 25;
        this.className = 'mouse';

        this.generate();
        this.draw();
    };
};

class HolyWater extends Subject {
    constructor() {
        super();

        this.maxRottingStage = 25;
        this.className = 'holywater';

        this.generate();
        this.draw();
    };
};

class Crap extends Subject {
    constructor() {
        super();

        this.maxRottingStage = 100;
        this.className = 'crap';

        this.generate();
        this.draw();
    };
};

class Bomb extends Subject {
    constructor() {
        super();

        this.maxRottingStage = 100;
        this.className = 'bomb';

        this.generate();
        this.draw();
    };
};

/* ---- */
/* GAME */
/* ---- */

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

/* -------------- */
/* INITIALIZATION */
/* -------------- */

const GAME = new Game();

