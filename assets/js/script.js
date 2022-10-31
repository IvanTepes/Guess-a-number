('use strict');

// ! Helpers

/**
 * Generate a random number between 1 and 20.
 */
const generateRandomNumber = () => Math.trunc(Math.random() * 20) + 1;

/**
 * GetElement is a function that takes a className as an argument and returns the first element in the
 * DOM that matches the className.
 */
const getElement = className => document.querySelector(className);

/**
 * "addClass" adds a class to an element, "removeClass" removes a class from an element, and "hasClass"
 * checks if an element contains a class.
 * @param element - The element you want to add/remove/check the class of.
 * @param className - The class name to be added or removed.
 */
const addClass = (element, className) => element.classList.add(className);

const removeClass = (element, className) => element.classList.remove(className);

const hasClass = (element, className) => element.classList.contains(className);
// ! End

// ! Objects
/* A object that holds all the elements that will be used in the game. */
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

/* Creating an object called gameNumbers. It has three properties: secretNumber, startScore, and
highScore. The secretNumber property is set to the return value of the generateRandomNumber function.
The startScore property is set to 20. The highScore property is set to 0.
Score and Guess will be added dynamically.
 */
const gameNumbers = {
    secretNumber: generateRandomNumber(),
    startScore: 20,
    highScore: 0,
};

/* An object that holds all the messages that will be displayed in the game. */
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
        noGuess: 'Please Enter a Number!',
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
/* Setting the initial message and score. */
htmlElement.header.textContent = message.header.startMessage;
htmlElement.score.textContent = message.score.startScore;
htmlElement.info.textContent = message.info.startInfo;
htmlElement.instruction.textContent = message.instruction.startInstruction;
htmlElement.highScore.textContent = message.highScore;
gameNumbers.score = gameNumbers.startScore;
// ! End

// ! Event listener for check button
/* An event listener for the check button. */
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
/**
 * It adds the class 'hidden' to the checkInput element and the class 'center-absolute' to the
 * checkResult element.
 */
function endGame() {
    addClass(htmlElement.checkInput, 'hidden');
    addClass(htmlElement.checkResult, 'center-absolute');
}

/**
 * If the checkInput element has the class 'hidden', then remove the class 'hidden' from the checkInput
 * element and remove the class 'center-absolute' from the checkResult element.
 */
function newGame() {
    if (hasClass(htmlElement.checkInput, 'hidden')) {
        removeClass(htmlElement.checkInput, 'hidden');
        removeClass(htmlElement.checkResult, 'center-absolute');
    }
}
// ! End

// ! Functions to display message
/* Setting the game layout to display a message that says "Congrats" and the number is correct. */
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

    /* Checking if the score is greater than the high score. If it is, then it sets the high score to
    the score. */
    if (gameNumbers.score > gameNumbers.highScore) {
        gameNumbers.highScore = gameNumbers.score;
        htmlElement.highScore.textContent = `High Score : ${gameNumbers.highScore}`;
    }
}

/* Setting the game layout to display a message that says "Game Over" and the score. */
function numberFail() {
    htmlElement.header.textContent = '';
    htmlElement.instruction.textContent = message.header.failMessage;
    htmlElement.number.textContent = message.number.gameOver;
    htmlElement.info.textContent = '';
    htmlElement.score.textContent = `Score : ${gameNumbers.score}`;
    /* Setting the score to 0. */
    gameNumbers.score = 0;
    htmlElement.score.textContent = `Score : ${gameNumbers.score}`;
    removeClass(htmlElement.secretNumberCol, 'secret-number__col');
    removeClass(htmlElement.secretNumberCol, 'number__to-low');
    removeClass(htmlElement.secretNumberCol, 'number__to-high');
}

/* Setting the game layout to display a message that says "Sorry" and the number is too high. */
function numberHigh() {
    htmlElement.header.textContent = message.header.sorry;
    htmlElement.instruction.textContent = message.instruction.number;
    htmlElement.info.textContent = message.info.high;
    htmlElement.number.textContent = `${gameNumbers.guess}`;

    /* Subtracting 1 from the score. */
    gameNumbers.score = gameNumbers.score - 1;

    htmlElement.score.textContent = `Score : ${gameNumbers.score}`;

    addClass(htmlElement.numberEl, 'number__to-high');
    if (hasClass(htmlElement.numberEl, 'number__to-low')) {
        removeClass(htmlElement.numberEl, 'number__to-low');
    }
}

/* Setting the game layout to display a message that says "Sorry" and the number is too low. */
function numberLow() {
    htmlElement.header.textContent = message.header.sorry;
    htmlElement.instruction.textContent = message.instruction.number;
    htmlElement.info.textContent = message.info.low;
    htmlElement.number.textContent = `${gameNumbers.guess}`;

    /* Subtracting 1 from the score. */
    gameNumbers.score = gameNumbers.score - 1;

    htmlElement.score.textContent = `Score : ${gameNumbers.score}`;

    addClass(htmlElement.numberEl, 'number__to-low');
    if (hasClass(htmlElement.numberEl, 'number__to-high')) {
        removeClass(htmlElement.numberEl, 'number__to-high');
    }
}

// ! Functions to open/close side menu
/**
 * When the user clicks the button with the id of 'js-openMenu', the function will open the side menu
 * by changing the width of the side menu to 100%.
 */
function openMenu() {
    document.getElementById('js-sideMenu').style.width = '100%';
}

/**
 * When the user clicks the close button, the side menu's width is set to 0.
 */
function closeMenu() {
    document.getElementById('js-sideMenu').style.width = '0';
}
// ! End

// ! An event listener for the play again button.
/* An event listener for the play again button. When the user clicks the play again button, the game will reset. */
document
    .querySelector('#js-againButton')
    .addEventListener('click', function () {
        /* Resetting the game. */
        gameNumbers.score = 20;
        gameNumbers.guess = '';
        gameNumbers.secretNumber = generateRandomNumber();

        /* Setting the initial message and score. */
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
