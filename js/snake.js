/* ---------- */
/* SNAKE GAME */
/* ---------- */

/* ---------- */
/* RANDOMIZER */
/* ---------- */

const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

/* ----- */
/* SCORE */
/* ----- */

class Score {

    constructor(scoreWrapper) {
        this.scoreWrapper = scoreWrapper;
        this.balance = 0;

        this.draw();
    };

    increase = () => {
        this.balance++;
        this.draw();
    };

    draw = () => {
        this.scoreWrapper.innerText = `Your Score: ${this.balance}`;
    };
};

/* ----- */
/* TIMER */
/* ----- */

class Timer {

    constructor(timerWrapper) {
        this.timerWrapper = timerWrapper;
        this.time = '00:00';

        this.timeStart = Date.now();
        this.timeNow = this.timeStart;

        this.draw();
    };

    draw() {
        this._calculate();
        this.timerWrapper.innerText = `Round Time: ${this.time}`;
    };

    _calculate() {
        this.timeNow = Date.now();
        let delta = this.timeNow - this.timeStart;

        let seconds = Math.floor(delta / 1000);
        let minutes = 0;

        if (seconds > 60) {
            minutes = Math.floor(seconds / 60);
            seconds = seconds - (minutes * 60);
        };

        minutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;
        seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;

        this.time = `${minutes}:${seconds}`;
    };
};

/* ------ */
/* DIALOG */
/* ------ */

class Dialog {

    constructor(dialogWrapper) {
        this.dialogWrapper = dialogWrapper;

        this.splashes = ['Eat all', 'Big snake', 'Just out of the oven', 'We are in the matrix!', 'Open-world alpha sandbox!',
            'Apples or mice?', 'Hurry up!', 'What does this food allow itself?', 'Beware the tail', 'Hmmmrmm.', 'Is it poisonous?',
            'Keep it up!', 'Ha-ha, nice', 'Home-made!', 'Contains simulated food', 'This splash text is now available', 'Quite Indie!'];

        this.draw();
    };

    draw = () => {
        let randomInteger = getRandomInteger(0, this.splashes.length);
        this.dialogWrapper.innerText = this.splashes[randomInteger];
    };

    end = (score) => {
        if (score >= 400) {
            this.dialogWrapper.innerText = `Game Over! You won!`;
        } else {
            this.dialogWrapper.innerText = `Game Over! You lose!`;
        };
    };
};

/* --- */
/* MAP */
/* --- */

class Map {

    constructor(container) {
        this.container = container;
        this.width = 20;
        this.height = 20;

        this.draw();
    };

    draw = () => {
        this.container.innerHTML = '';

        let map = document.createElement('div');
        map.classList.add('map');
        this.container.appendChild(map);

        for (let y = this.height; y >= 1; y--) {
            for (let x = 1; x <= this.width; x++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('x', x);
                cell.setAttribute('y', y);
                map.appendChild(cell);
            };
        };
    };
};

/* ----- */
/* SNAKE */
/* ----- */

class Snake {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 1;
        this.direction = 'Up';
        this.canRotate = false;
        this.canGrow = false;
        this.tails = [];
        this.maxTails = 3;

        this._generate();
        this.draw();
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

    move = () => {
        this.x += this.dx;
        this.y += this.dy;

        this._collisionBorder();

        this.tails.unshift({ x: this.x, y: this.y });

        if (this.tails.length > this.maxTails) {
            this.tails.pop();
        };

        this.canRotate = true;
    };

    _collisionBorder = () => {
        if (this.x > 20) {
            this.x = 1;
        } else if (this.x < 1) {
            this.x = 20;
        };

        if (this.y > 20) {
            this.y = 1;
        } else if (this.y < 1) {
            this.y = 20;
        };
    };

    _generate = () => {
        let randomDirection = getRandomInteger(1, 5);
        let xMin = 0, xMax = 0, yMin = 0, yMax = 0;

        switch (randomDirection) {
            case 1:
                this.dx = 0;
                this.dy = 1;
                this.direction = 'Up';
                xMin = 1; xMax = 20; yMin = 3; yMax = 20;
                break;
            case 2:
                this.dx = 1;
                this.dy = 0;
                this.direction = 'Right';
                xMin = 3; xMax = 20; yMin = 1; yMax = 20;
                break;
            case 3:
                this.dx = 0;
                this.dy = -1;
                this.direction = 'Down';
                xMin = 1; xMax = 20; yMin = 1; yMax = 18;
                break;
            default:
                this.dx = -1;
                this.dy = 0;
                this.direction = 'Left';
                xMin = 1; xMax = 18; yMin = 1; yMax = 20;
                break;
        };

        this.x = getRandomInteger(xMin, xMax);
        this.y = getRandomInteger(yMin, yMax);

        this.tails = [
            { x: this.x, y: this.y },
            { x: this.x - this.dx, y: this.y - this.dy },
            { x: this.x - (this.dx + this.dx), y: this.y - (this.dy + this.dy) }
        ];
    };
};

/* ---- */
/* FOOD */
/* ---- */

class Food {

    constructor() {
        this.x = 0;
        this.y = 0;

        this.generate();
        this.draw();
    };

    generate = () => {
        let allCells = document.querySelectorAll('.cell');
        let emptyCell = [];

        allCells.forEach((item) => {
            if (!item.classList.contains('snakeTail') && !item.classList.contains('snakeHead') && !item.classList.contains('food')) {
                emptyCell.push(item);
            };
        });

        let randomInteger = getRandomInteger(1, emptyCell.length);

        this.x = +emptyCell[randomInteger].getAttribute('x');
        this.y = +emptyCell[randomInteger].getAttribute('y');
    };

    draw = () => {
        document.querySelector(`[x = "${this.x}"][y = "${this.y}"]`).classList.add('food');
    };
};

/* ---- */
/* GAME */
/* ---- */

class Game {

    constructor(mapContainer, scoreWrapper, timerWrapper, dialogWrapper) {
        this.mapContainer = mapContainer;
        this.scoreWrapper = scoreWrapper;
        this.timerWrapper = timerWrapper;
        this.dialogWrapper = dialogWrapper;

        this.interval = '';

        this._controls();
        this._start();
    };

    _start = () => {
        this.map = new Map(this.mapContainer);
        this.score = new Score(this.scoreWrapper);
        this.timer = new Timer(this.timerWrapper);
        this.dialog = new Dialog(this.dialogWrapper);
        this.snake = new Snake();
        this.food = new Food();

        this.interval = setInterval(this._gameLoop, 200);
    };

    _gameLoop = () => {
        this._move();
        this._draw();
        this._eventHandler();
    };

    _eventHandler = () => {
        if (this.score.balance >= 3) this.snake.canGrow = true;

        if (this.snake.x === this.food.x && this.snake.y === this.food.y) {
            
            if (this.snake.canGrow) this.snake.maxTails++;
            this.score.increase();

            this.map.draw();
            this.snake.draw();

            this.food.generate();
            this.food.draw();

            this.dialog.draw();
        };

        if (document.querySelector('.snakeHead').classList.contains('snakeTail') || this.score.balance >= 400) {
            this.dialog.end(this.score.balance);
            clearInterval(this.interval);
        };
    };

    _move = () => {
        this.snake.move();
    };

    _draw = () => {
        this.map.draw();
        this.score.draw();
        this.timer.draw();
        this.snake.draw();
        this.food.draw();
    };

    _controls = () => {

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
                this._start();
            };
        });
    };

};

/* -------------- */
/* INITIALIZATION */
/* -------------- */

const MAP_CONTAINER = document.querySelector('.snake-game__map-wrapper');
const SCORE_WRAPPER = document.querySelector('.snake-game__score');
const TIMER_WRAPPER = document.querySelector('.snake-game__timer');
const DIALOG_WRAPPER = document.querySelector('.snake-game__dialog');

const GAME = new Game(MAP_CONTAINER, SCORE_WRAPPER, TIMER_WRAPPER, DIALOG_WRAPPER);

