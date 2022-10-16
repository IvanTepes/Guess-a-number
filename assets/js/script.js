('use strict');

// ! Helpers
// Generate random number
const generateRandomNumber = () => Math.trunc(Math.random() * 20) + 1;

// Return dom element
const getElement = className => document.querySelector(className);

// To add class to element
const addClass = (element, className) => element.classList.add(className);

// To remove class from element
const removeClass = (element, className) => element.classList.remove(className);

// To check if element contain class
const hasClass = (element, className) => element.classList.contains(className);
// ! End

// ! Objects
// An Object with html elements
const htmlElement = {
    header: getElement('.header__title'),
    instruction: getElement('.instruction__title'),
    number: getElement('.secret-number__col--number'),
    info: getElement('.info__title'),
    numberEl: getElement('.secret-number__col'),
    score: getElement('.check__result--score'),
    highScore: getElement('.check__result--high-score'),
    checkResult: getElement('#js-checkResult'),
    checkInput: getElement('#js-checkInput'),
    secretNumberCol: getElement('#js-secretNumberCol'),
};

// An Object with game numbers
// Secret number, start score, score, guess
// Score and Guess will be added dynamically
const gameNumbers = {
    secretNumber: generateRandomNumber(),
    startScore: 20,
    highScore: 0,
};

// An Object with all messages
// An Object holds elements names
// and all messages that will be displayed
// in that particular element
const message = {
    header: {
        congrats: 'Congrats!',
        sorry: 'Sorry!',
        startMessage: 'Guess a Number!',
        failMessage: 'Game Over!',
    },
    instruction: {
        startInstruction: 'Between 1 - 20',
        number: 'Number',
    },
    number: {
        secretNumber: `${gameNumbers.secretNumber}`,
        gameOver: 'Try Again',
    },
    info: {
        startInfo: 'Start Guessing..',
        noGuess: 'Please Select a Number!',
        correct: 'is Correct!',
        high: 'is Too High!',
        low: 'is Too Low!',
    },
    score: {
        startScore: `Score : ${gameNumbers.startScore}`,
        score: gameNumbers.score,
    },
    highScore: `High Score : ${gameNumbers.highScore}`,
};
// ! End

// ! Initial message and score
// Render initial score, message and instruction
// Added score to object gameNumbers
// Set Score to start score
htmlElement.header.textContent = message.header.startMessage;
htmlElement.score.textContent = message.score.startScore;
htmlElement.info.textContent = message.info.startInfo;
htmlElement.instruction.textContent = message.instruction.startInstruction;
htmlElement.highScore.textContent = message.highScore;
gameNumbers.score = gameNumbers.startScore;
// ! End

// ! Event listener for check button
document
    .querySelector('.check__input--number-btn')
    .addEventListener('click', function () {
        const guess = Number(
            document.querySelector('.check__input--number').value
        );
        // Added guess to object gameNumbers
        gameNumbers.guess = guess;
        // When no guess
        if (!gameNumbers.guess) {
            htmlElement.info.textContent = message.info.noGuess;
            // When player wins
        } else if (gameNumbers.guess === gameNumbers.secretNumber) {
            numberCorrect();
            endGame();
            // When guess is too high
        } else if (gameNumbers.guess > gameNumbers.secretNumber) {
            // And If score is above 1
            if (gameNumbers.score > 1) {
                numberHigh();
            } else {
                numberFail();
                endGame();
            }
            // When guess is too low
        } else if (gameNumbers.guess < gameNumbers.secretNumber) {
            // And If score is above 1
            if (gameNumbers.score > 1) {
                numberLow();
            } else {
                numberFail();
                endGame();
            }
        }
    });
// ! End

// ! Functions

// ! Functions to set game layout
function endGame() {
    addClass(htmlElement.checkInput, 'hidden');
    addClass(htmlElement.checkResult, 'center-absolute');
}

function newGame() {
    if (hasClass(htmlElement.checkInput, 'hidden')) {
        removeClass(htmlElement.checkInput, 'hidden');
        removeClass(htmlElement.checkResult, 'center-absolute');
    }
}
// ! End

// ! Functions to display message
function numberCorrect() {
    htmlElement.header.textContent = message.header.congrats;
    htmlElement.instruction.textContent = message.instruction.number;
    htmlElement.number.textContent = `${gameNumbers.secretNumber}`;

    htmlElement.info.textContent = message.info.correct;

    addClass(htmlElement.numberEl, 'number__correct');

    if (
        hasClass(htmlElement.numberEl, 'number__to-high') ||
        hasClass(htmlElement.numberEl, 'number__to-low')
    ) {
        removeClass(htmlElement.numberEl, 'number__to-high');
        removeClass(htmlElement.numberEl, 'number__to-low');
    }

    if (gameNumbers.score > gameNumbers.highScore) {
        gameNumbers.highScore = gameNumbers.score;
        htmlElement.highScore.textContent = `High Score : ${gameNumbers.highScore}`;
    }
}

function numberFail() {
    htmlElement.header.textContent = '';
    htmlElement.instruction.textContent = message.header.failMessage;
    htmlElement.number.textContent = message.number.gameOver;
    htmlElement.info.textContent = '';
    htmlElement.score.textContent = `Score : ${gameNumbers.score}`;
    gameNumbers.score = 0;
    htmlElement.score.textContent = `Score : ${gameNumbers.score}`;
    removeClass(htmlElement.secretNumberCol, 'secret-number__col');
    removeClass(htmlElement.secretNumberCol, 'number__to-low');
    removeClass(htmlElement.secretNumberCol, 'number__to-high');
}

function numberHigh() {
    htmlElement.header.textContent = message.header.sorry;
    htmlElement.instruction.textContent = message.instruction.number;
    htmlElement.info.textContent = message.info.high;
    htmlElement.number.textContent = `${gameNumbers.guess}`;

    gameNumbers.score = gameNumbers.score - 1;

    htmlElement.score.textContent = `Score : ${gameNumbers.score}`;

    addClass(htmlElement.numberEl, 'number__to-high');
    if (hasClass(htmlElement.numberEl, 'number__to-low')) {
        removeClass(htmlElement.numberEl, 'number__to-low');
    }
}

function numberLow() {
    htmlElement.header.textContent = message.header.sorry;
    htmlElement.instruction.textContent = message.instruction.number;
    htmlElement.info.textContent = message.info.low;
    htmlElement.number.textContent = `${gameNumbers.guess}`;

    gameNumbers.score = gameNumbers.score - 1;

    htmlElement.score.textContent = `Score : ${gameNumbers.score}`;

    addClass(htmlElement.numberEl, 'number__to-low');
    if (hasClass(htmlElement.numberEl, 'number__to-high')) {
        removeClass(htmlElement.numberEl, 'number__to-high');
    }
}

// ! Functions to open/close side menu
// Open the side menu
function openMenu() {
    document.getElementById('js-sideMenu').style.width = '100%';
}

// Close the side menu
function closeMenu() {
    document.getElementById('js-sideMenu').style.width = '0';
}

// ! Event listener to play again
document
    .querySelector('#js-againButton')
    .addEventListener('click', function () {
        gameNumbers.score = 20;
        gameNumbers.guess = '';
        gameNumbers.secretNumber = generateRandomNumber();

        htmlElement.header.textContent = message.header.startMessage;
        htmlElement.instruction.textContent =
            message.instruction.startInstruction;
        htmlElement.number.textContent = `?`;
        htmlElement.info.textContent = message.info.startInfo;
        htmlElement.score.textContent = `Score : ${gameNumbers.score}`;

        removeClass(htmlElement.numberEl, 'number__correct');

        addClass(htmlElement.secretNumberCol, 'secret-number__col');

        getElement('.check__input--number').value = '';

        newGame();
    });
// ! End
