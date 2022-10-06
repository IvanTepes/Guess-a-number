('use strict');

// ! Initial setup

// Generate random number
const secretNumber = Math.trunc(Math.random() * 20) + 1;

// Initial score
let score = 20;

// Return dom element
const getElement = function (className) {
    return document.querySelector(className);
};

// An Object with html elements
const renderMessageTo = {
    header: getElement('.header__title'),
    instruction: getElement('.instruction__title'),
    number: getElement('.secret-number__col--number'),
    message: getElement('.message__title'),
    numberEl: getElement('.secret-number__col'),
    score: getElement('.check__result--score'),
};
console.log(renderMessageTo);

// Render initial score, message and instruction
renderMessageTo.score.textContent = `Score : ${score}`;

renderMessageTo.message.textContent = 'Start Guessing ..';

renderMessageTo.instruction.textContent = 'Between 1 - 20';

document
    .querySelector('.check__input--number-btn')
    .addEventListener('click', function () {
        const guess = Number(
            document.querySelector('.check__input--number').value
        );

        if (!guess) {
            renderMessageTo.message.textContent = 'Please select a Number!';
        } else if (guess === secretNumber) {
            renderMessageTo.header.textContent = 'Congrats';
            renderMessageTo.instruction.textContent = 'Number';
            renderMessageTo.number.textContent = `${secretNumber}`;
            renderMessageTo.message.textContent = 'is Correct!';
        } else if (guess > secretNumber) {
            renderMessageTo.header.textContent = 'Sorry';
            renderMessageTo.instruction.textContent = 'Number';
            renderMessageTo.number.textContent = `${guess}`;
            renderMessageTo.message.textContent = 'is Too High!';
            score--;
            renderMessageTo.score.textContent = `Score : ${score}`;
        } else if (guess < secretNumber) {
            renderMessageTo.header.textContent = 'Sorry';
            renderMessageTo.instruction.textContent = 'Number';
            renderMessageTo.number.textContent = `${guess}`;
            renderMessageTo.message.textContent = 'is Too Low!';
            score--;
            renderMessageTo.score.textContent = `Score : ${score}`;
        }

        if (guess === secretNumber) {
            renderMessageTo.numberEl.classList.add('number__correct');
            if (
                renderMessageTo.numberEl.classList.contains(
                    'number__to-high'
                ) ||
                renderMessageTo.numberEl.classList.contains('number__to-low')
            ) {
                renderMessageTo.numberEl.classList.remove('number__to-high');
                renderMessageTo.numberEl.classList.remove('number__to-low');
            }
        } else if (guess > secretNumber) {
            renderMessageTo.numberEl.classList.add('number__to-high');
            if (renderMessageTo.numberEl.classList.contains('number__to-low')) {
                renderMessageTo.numberEl.classList.remove('number__to-low');
            }
        } else if (guess < secretNumber) {
            renderMessageTo.numberEl.classList.add('number__to-low');
            if (
                renderMessageTo.numberEl.classList.contains('number__to-high')
            ) {
                renderMessageTo.numberEl.classList.remove('number__to-high');
            }
        }
    });

// ! Side menu

/* Open the side menu */
function openMenu() {
    document.getElementById('js-sideMenu').style.width = '100%';
}

/*  Close the side menu*/
function closeMenu() {
    document.getElementById('js-sideMenu').style.width = '0';
}
