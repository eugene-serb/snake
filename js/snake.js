/* ---------- */
/* SNAKE GAME */
/* ---------- */

const fieldWrapper = document.querySelector('.snake-game__field-wrapper');
const scoreBlock = document.querySelector('.snake-game__score-banner');

/* ------ */
/* RANDOM */
/* ------ */

const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

/* ----- */
/* SCORE */
/* ----- */

let score = 0;

const increaseScore = () => {
    score++;
    drawScore();
};

const drawScore = () => {
    scoreBlock.innerText = `Your Score: ${score}`;
};

/* ----- */
/* FIELD */
/* ----- */

const drawField = () => {
    fieldWrapper.innerHTML = '';

    let field = document.createElement('div');
    field.classList.add('field');
    fieldWrapper.appendChild(field);

    for (let y = 10; y >= 1; y--) {
        for (let x = 1; x <= 10; x++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('x', x);
            cell.setAttribute('y', y);
            field.appendChild(cell);
        };
    };
};

/* ---- */
/* FOOD */
/* ---- */

function Food(x, y) {
    this.x = x;
    this.y = y;
};

const generateFood = () => {
    let x = 0,
        y = 0;

    let temp = document.querySelectorAll('.cell');
    let emptyCell = [];

    temp.forEach((item, index) => {
        if (!item.classList.contains('snakeTail') && !item.classList.contains('snakeHead') && !item.classList.contains('food')) {
            emptyCell.push(item);
        };
    });

    let rnd = getRandomInteger(1, emptyCell.length);

    x = +emptyCell[rnd].getAttribute('x');
    y = +emptyCell[rnd].getAttribute('y');

    console.log(x + ' ' + y);

    return new Food(x, y);
};

const drawFood = () => {
    document.querySelector(`[x = "${food.x}"][y = "${food.y}"]`).classList.add('food');
};

/* ----- */
/* SNAKE */
/* ----- */

function Snake(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 1;
    this.dy = 0;
    this.direction = 'right';
    this.steps = false;
    this.tails = [{ x: this.x, y: this.y }, { x: this.x - 1, y: this.y }, { x: this.x - 2, y: this.y}];
    this.maxTails = 3;
};

const generateSnake = () => {
    let x = getRandomInteger(3, 10);
    let y = getRandomInteger(1, 10);

    return new Snake(x, y);
};

const drawSnake = () => {
    snake.tails.forEach((item, index) => {
        if (index == 0) {
            document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.add('snakeHead');
        } else {
            document.querySelector(`[x = "${item.x}"][y = "${item.y}"]`).classList.add('snakeTail');
        };
    });
};

/* ---------- */
/* GAME LOOPS */
/* ---------- */

drawField();
let snake = generateSnake();
drawSnake();
let food = generateFood();

const gameLoop = () => {
    frameUpdate();
    move();
};

let interval = setInterval(gameLoop, 250);

/* ------------- */
/* RENDER FRAMES */
/* ------------- */

const frameUpdate = () => {
    drawField();
    drawSnake();
    drawFood();
};

/* ---- */
/* MOVE */
/* ---- */

const move = () => {

    snake.x += snake.dx;
    snake.y += snake.dy;

    collisionBorder();

    snake.tails.unshift({ x: snake.x, y: snake.y });

    if (snake.tails.length > snake.maxTails) {
        snake.tails.pop();
    };

    frameUpdate();

    if (snake.x === food.x && snake.y === food.y) {
        console.log('cross');
        snake.maxTails++;
        increaseScore();
        food = generateFood();
        frameUpdate();
    };

    if (document.querySelector('.snakeHead').classList.contains('snakeTail')) {
        scoreBlock.innerText = `Game Over! Your score: ${score}`;
        clearInterval(interval);
    };

    snake.steps = true;
};

const collisionBorder = () => {
    if (snake.x > 10) {
        snake.x = 1;
    } else if (snake.x < 1) {
        snake.x = 10;
    };

    if (snake.y > 10) {
        snake.y = 1;
    } else if (snake.y < 1) {
        snake.y = 10
    };
};

/* ------------------ */
/* KEY PRESS LISTENER */
/* ------------------ */

window.addEventListener('keydown', (e) => {

    if (snake.steps === true) {
        if ((e.keyCode == 37 || e.code == 'KeyA') && snake.direction != 'right') {
            snake.dx = -1;
            snake.dy = 0;
            snake.direction = 'left';
            snake.steps = false;
        } else if ((e.keyCode == 38 || e.code == 'KeyW') && snake.direction != 'down') {
            snake.dx = 0;
            snake.dy = 1;
            snake.direction = 'up';
            snake.steps = false;
        } else if ((e.keyCode == 39 || e.code == 'KeyD') && snake.direction != 'left') {
            snake.dx = 1;
            snake.dy = 0;
            snake.direction = 'right';
            snake.steps = false;
        } else if ((e.keyCode == 40 || e.code == 'KeyS') && snake.direction != 'up') {
            snake.dx = 0;
            snake.dy = -1;
            snake.direction = 'down';
            snake.steps = false;
        };
    };
});

window.addEventListener('keydown', (e) => {

    if (e.code == 'KeyR') {
        this.clearInterval(interval);

        score = 0;
        drawScore();

        drawField();

        snake = generateSnake();
        food = generateFood();

        frameUpdate();

        interval = setInterval(gameLoop, 250);
    };
});

