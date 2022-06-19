'use strict';

const game = new Game();
const userInput = document.getElementById('user-input');
const disabledActions = [
    'contextmenu',
    'copy',
    'cut',
    'paste'
];
let keyPressed = false;

disabledActions.forEach(action => {
    userInput.addEventListener(action, (event) => {
        event.preventDefault();
    });
});

userInput.addEventListener('keydown', (event) => {
    const keysNotAllowed = ['backspace', 'delete']
    if (keysNotAllowed.includes(event.code.toLowerCase())) {
        event.preventDefault();
    }
});

userInput.addEventListener('click', () => {
    if (game.getTimeLeft() === 60) {
        game.startTimer();
    }
});

userInput.addEventListener('keypress', (event) => {
    if (keyPressed) {
        event.preventDefault();
    } else {
        keyPressed = true;
    }
});

userInput.addEventListener('keyup', () => {
    keyPressed = false;
    game.checkUserInput();
});

game.startGame();