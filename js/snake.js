/* ---------- */
/* SNAKE GAME */
/* ---------- */

const fieldWrapper = document.querySelector('.snake-game__field-wrapper');
const scoreBlock = document.querySelector('.snake-game__score');

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

const addScore = () => {
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

    do {
        x = getRandomInteger(1, 10);
        y = getRandomInteger(1, 10);
    } while (x === snake.x && y === snake.y);

    let food = new Food(x, y);

    return food;
};

const drawFood = (food) => {
    document.querySelector('[x = "' + food.x + '"][y = "' + food.y + '"]').classList.add('food');
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
    this.tails = [];
    this.maxTails = 3;
};

const generateSnake = () => {
    let x = getRandomInteger(3, 10);
    let y = getRandomInteger(1, 10);
    let snake = new Snake(x, y);

    return snake;
};

/* ---------- */
/* GAME LOOPS */
/* ---------- */

drawField();

let snake = generateSnake();
let food = generateFood();

const gameLoop = () => {
    drawField();
    drawSnake(snake);
    drawFood(food);
};

let interval = setInterval(gameLoop, 250);

/* ---- */
/* MOVE */
/* ---- */

const drawSnake = (snake) => {

    snake.x += snake.dx;
    snake.y += snake.dy;

    collisionBorder();

    // add to start array
    snake.tails.unshift({ x: snake.x, y: snake.y });

    // delete from end array
    if (snake.tails.length > snake.maxTails) {
        snake.tails.pop();
    };

    // draw snake at the field
    snake.tails.forEach((item, index) => {
        if (index == 0) {
            document.querySelector('[x = "' + item.x + '"][y = "' + item.y + '"]').classList.add('snakeHead');
        } else {
            document.querySelector('[x = "' + item.x + '"][y = "' + item.y + '"]').classList.add('snakeTail');
        };
    });

    // eat the food
    if (snake.x === food.x && snake.y === food.y) {
        snake.maxTails++;
        addScore();
        food = generateFood();
        drawFood(food);
    };

    // end game rule

    if (document.querySelector('.snakeHead').classList.contains('snakeTail')) {
        scoreBlock.innerText = `Game Over! Your score: ${score}`;
        clearInterval(interval);
    };

    snake.steps = true;
};

function collisionBorder() {
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

window.addEventListener('keydown', function (e) {

    if (snake.steps === true) {
        if ((e.keyCode == 37 || e.code == "KeyA") && snake.direction != 'right') {
            snake.dx = -1;
            snake.dy = 0;
            snake.direction = 'left';
            snake.steps = false;
        } else if ((e.keyCode == 38 || e.code == "KeyW") && snake.direction != 'down') {
            snake.dx = 0;
            snake.dy = 1;
            snake.direction = 'up';
            snake.steps = false;
        } else if ((e.keyCode == 39 || e.code == "KeyD") && snake.direction != 'left') {
            snake.dx = 1;
            snake.dy = 0;
            snake.direction = 'right';
            snake.steps = false;
        } else if ((e.keyCode == 40 || e.code == "KeyS") && snake.direction != 'up') {
            snake.dx = 0;
            snake.dy = -1;
            snake.direction = 'down';
            snake.steps = false;
        };
    };
});

window.addEventListener('keydown', function (e) {

    if (e.code == "KeyR") {
        this.clearInterval(interval);

        score = 0;
        drawScore();

        drawField();

        snake.pop;
        food.pop;

        snake = generateSnake();
        food = generateFood();

        interval = setInterval(gameLoop, 250);
    };
});

