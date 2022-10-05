('use strict');

// ! Game Logic and Messages

const secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;

// document.querySelector('.secret-number__col--number').textContent =
//     secretNumber;

document.querySelector(
    '.check__result--score'
).textContent = `Score : ${score}`;

document.getElementById('js-message').textContent = 'Start Guessing ..';

document.getElementById('js-instruction__title').textContent = 'Between 1 - 20';

document
    .querySelector('.check__input--number-btn')
    .addEventListener('click', function () {
        const guess = Number(
            document.querySelector('.check__input--number').value
        );
        let header = document.getElementById('js-header__title');
        let message = document.getElementById('js-message');
        let instruction = document.getElementById('js-instruction__title');
        let number = document.getElementById('js-secret-number');
        let numberEl = document.querySelector('.secret-number__col');
        console.log(numberEl);

        if (!guess) {
            message.textContent = 'Please Select a Number!';
        } else if (guess === secretNumber) {
            header.textContent = 'Congrats';
            instruction.textContent = 'Number';
            number.textContent = `${secretNumber}`;
            message.textContent = 'is Correct!';
        } else if (guess > secretNumber) {
            header.textContent = 'Sorry';
            instruction.textContent = 'Number';
            number.textContent = `is`; //`${guess}`
            message.textContent = 'is Too High';
            score--;
            document.querySelector(
                '.check__result--score'
            ).textContent = `Score : ${score}`;
        } else if (guess < secretNumber) {
            header.textContent = 'Sorry';
            instruction.textContent = 'Number';
            number.textContent = `${guess}`;
            message.textContent = ' is Too Low';
            score--;
            document.querySelector(
                '.check__result--score'
            ).textContent = `Score : ${score}`;
        }

        if (guess === secretNumber) {
            numberEl.classList.add('number__correct');
            if (
                numberEl.classList.contains('number__to-high') ||
                numberEl.classList.contains('number__to-low')
            ) {
                numberEl.classList.remove('number__to-high');
                numberEl.classList.remove('number__to-low');
            }
        } else if (guess > secretNumber) {
            numberEl.classList.add('number__to-high');
            if (numberEl.classList.contains('number__to-low')) {
                numberEl.classList.remove('number__to-low');
            }
        } else if (guess < secretNumber) {
            numberEl.classList.add('number__to-low');
            if (numberEl.classList.contains('number__to-high')) {
                numberEl.classList.remove('number__to-high');
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
