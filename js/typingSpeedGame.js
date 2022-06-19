'use strict';

class Game {
    typingTest = new TypingTest();
    timer = null;
    timeLeft = 60;

    getTimeLeft() {
        return this.timeLeft;
    }

    startGame() {
        const testDetails = document.getElementById('test-details');
        const restartButtonContainer = document.getElementById('restart-button-container');
        const userInput = document.getElementById('user-input');

        testDetails.innerHTML = `
            <div class="detail">
                <div class="title">Errors</div>
                <div id="errors" class="value">0</div>
            </div>
            <div class="detail">
                <div class="title">Time</div>
                <div id="time" class="value">
                    <span id="time-left">60</span>s
                </div>
            </div>
            <div class="detail">
                <div class="title">% Accuracy</div>
                <div id="accuracy" class="value">0</div>
            </div>
        `;

        restartButtonContainer.innerHTML = '';

        userInput.removeAttribute('disabled');
        userInput.value = '';
        this.timeLeft = 60;
        this.setTypingText('Click on the area below to start the game');
        this.typingTest.resetTest();
    }

    startTimer() {
        this.setTypingText(this.typingTest.generateTypingText());

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.setTimeLeft();

            if (this.timeLeft === 0) {
                clearInterval(this.timer);
                this.checkUserInput();
                this.endGame();
            }
        }, 1000)
    }

    setTimeLeft() {
        document.getElementById('time-left').innerText = this.getTimeLeft();
    }

    setErrorCount() {
        document.getElementById('errors').innerText = this.typingTest.getErrorCount();
    }

    setAccuracy() {
        document.getElementById('accuracy').innerText = this.typingTest.getTypedTextAccuracy();
    }

    setTypingText(typingText) {
        document.getElementById('typing-text').innerHTML = typingText;
    }

    checkUserInput() {
        const userInput = document.getElementById('user-input');
        let highlightedText = this.typingTest.getHighlightedText(userInput.value);

        if (this.typingTest.isFullTextTyped()) {
            userInput.value = '';
            highlightedText = this.typingTest.getNextTypingText();
        }

        this.setTypingText(highlightedText);
        this.setErrorCount();
        this.setAccuracy();
    }

    endGame() {
        const testDetails = document.getElementById('test-details');
        const restartButtonContainer = document.getElementById('restart-button-container');
        const userInput = document.getElementById('user-input');

        testDetails.innerHTML = `
            <div class="detail">
                <div class="title">WPM</div>
                <div id="wpm" class="value">${this.typingTest.getWPM()}</div>
            </div>
            <div class="detail">
                <div class="title">CPM</div>
                <div id="cpm" class="value">${this.typingTest.getCPM()}</div>
            </div>
            ${testDetails.innerHTML}
        `;

        restartButtonContainer.innerHTML = `
            <button id="restart-game">Restart</button>
        `;

        userInput.setAttribute('disabled', true);
        this.setTypingText('Click on restart to start a new game');

        document.getElementById('restart-game').onclick = this.startGame.bind(this);
    }
}