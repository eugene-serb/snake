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

    increase = (n) => {
        this.balance += n;
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

        if (seconds >= 60) {
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
        if (score >= 225) {
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
        this.width = 15;
        this.height = 15;

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

    update = () => {
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
        if (this.x > 15) {
            this.x = 1;
        } else if (this.x < 1) {
            this.x = 15;
        };

        if (this.y > 15) {
            this.y = 1;
        } else if (this.y < 1) {
            this.y = 15;
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
                xMin = 1; xMax = 15; yMin = 3; yMax = 15;
                break;
            case 2:
                this.dx = 1;
                this.dy = 0;
                this.direction = 'Right';
                xMin = 3; xMax = 15; yMin = 1; yMax = 15;
                break;
            case 3:
                this.dx = 0;
                this.dy = -1;
                this.direction = 'Down';
                xMin = 1; xMax = 15; yMin = 1; yMax = 13;
                break;
            default:
                this.dx = -1;
                this.dy = 0;
                this.direction = 'Left';
                xMin = 1; xMax = 13; yMin = 1; yMax = 15;
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

/* ---------------- */
/* THINGS FACTORIES */
/* ---------------- */

class ThingsFactory {
    createThing = () => { };
};

class BorderFactory extends ThingsFactory {
    createThing = () => {
        return new Border();
    };
};

class AppleFactory extends ThingsFactory {
    createThing = () => {
        return new Apple();
    };
};

class MouseFactory extends ThingsFactory {
    createThing = () => {
        return new Mouse();
    };
};

class CrapFactory extends ThingsFactory {
    createThing = () => {
        return new Crap();
    };
};

class BombFactory extends ThingsFactory {
    createThing = () => {
        return new Bomb();
    };
};

/* ------ */
/* THINGS */
/* ------ */

class Subject {

    constructor() {
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
            if (!item.classList.contains('snakeTail') && !item.classList.contains('snakeHead') && !item.classList.contains(this.className)) {
                emptyCell.push(item);
            };
        });

        let randomInteger = getRandomInteger(1, emptyCell.length);

        this.x = +emptyCell[randomInteger].getAttribute('x');
        this.y = +emptyCell[randomInteger].getAttribute('y');
    };

    draw = () => {
        document.querySelector(`[x = "${this.x}"][y = "${this.y}"]`).classList.add(this.className);
    };
};

class Border extends Subject {

    constructor() {
        super();

        this.className = 'border';
        this.maxRottingStage = 0;

        this.generate();
        this.draw();
    };

    update = () => {};
};

class Apple extends Subject {

    constructor() {
        super();
        
        this.className = 'apple';
        this.maxRottingStage = 50;

        this.generate();
        this.draw();
    };
};

class Mouse extends Subject {

    constructor() {
        super();

        this.className = 'mouse';
        this.maxRottingStage = 25;

        this.generate();
        this.draw();
    };
};

class Crap extends Subject {

    constructor() {
        super();

        this.className = 'crap';
        this.maxRottingStage = 100;

        this.generate();
        this.draw();
    };
};

class Bomb extends Subject {

    constructor() {
        super();

        this.className = 'bomb';
        this.maxRottingStage = 100;

        this.generate();
        this.draw();
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

        this.factories = [new BorderFactory, new AppleFactory, new MouseFactory, new CrapFactory, new BombFactory];
        this.things = [];
        this.borders = [];

        for (let i = 0; i < 5; i++) {
            this.borders.push(this.factories[0].createThing());
        };

        for (let i = 0; i < 2; i++) {
            this.things.push(this.factories[1].createThing());
        };

        this.dialog.draw();
        this.interval = setInterval(this._gameLoop, 200);
    };

    _gameLoop = () => {
        this._update();
        this._draw();
        this._eventHandler();
    };

    _eventHandler = () => {
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

                if (document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.contains('crap')) {

                    if (this.snake.maxTails >= 5) this.snake.maxTails - 2;
                    this.score.increase(-10);

                    this.map.draw();
                    this.snake.draw();

                    this.borders.forEach((item) => {
                        item.draw();
                    });

                    if (this.score.balance < 0) {
                        this.dialog.end(this.score.balance);
                        clearInterval(this.interval);
                    };
                };

                if (document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.contains('bomb')) {

                    this.dialog.end(this.score.balance);
                    clearInterval(this.interval);
                };

            };
        });

        if (this.things.length < 2) {
            
            let randomInteger = getRandomInteger(1, 100);
            let randomChoose = 0;

            if (randomInteger <= 80) {
                randomChoose = 1;
            } else if (randomInteger > 80 && randomInteger <= 90) {
                randomChoose = 2;
            } else if (randomInteger > 90 && randomInteger <= 95) {
                randomChoose = 3;
            } else if (randomInteger > 95) {
                randomChoose = 4;
            };

            this.things.push(this.factories[randomChoose].createThing());

            this.things.forEach((item) => {
                item.draw();
            });
        };

        if (document.querySelector('.snakeHead').classList.contains('snakeTail') ||
            document.querySelector('.snakeHead').classList.contains('border') ||
            this.score.balance >= 225) {

            this.dialog.end(this.score.balance);
            clearInterval(this.interval);
        };
    };

    _update = () => {
        this.snake.update();

        this.things.forEach((item) => {
            item.update();
        });
    };

    _draw = () => {
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

