'use strict';

class TypingTest {
    typingTextIndex = -1;
    typedTexts = [];
    currentTypedText = '';
    currentErrorCount = 0;

    generateTypingText() {
        this.currentTypedText = '';
        this.currentErrorCount = 0;

        if (this.typingTextIndex === typingTextList.length - 1) {
            this.typingTextIndex = 0;
        } else {
            this.typingTextIndex++;
        }

        return this.getTypingText();
    }

    getTypingText() {
        return typingTextList[this.typingTextIndex];
    }

    getHighlightedText(typedText) {
        let i = 0;
        let highlightedText = '';
        const typingText = this.getTypingText();
        this.currentTypedText = typedText;
        this.currentErrorCount = 0;

        for (i; i < this.currentTypedText.length; i++) {
            if (this.currentTypedText[i] === typingText[i]) {
                highlightedText += `<span class="highlight-green">${typingText[i]}</span>`;
            } else {
                this.currentErrorCount++;
                highlightedText += `<span class="highlight-red">${typingText[i]}</span>`
            }
        }

        highlightedText += typingText.slice(i);

        return highlightedText;
    }

    isFullTextTyped() {
        return this.currentTypedText.length === this.getTypingText().length;
    }

    getNextTypingText() {
        this.typedTexts.push(
            {
                text: this.currentTypedText,
                errorCount: this.currentErrorCount
            }
        );
        return this.generateTypingText();
    }

    getWPM() {
        const currentTypedTextWordCount = this.currentTypedText.trim().length
            ? this.currentTypedText.trim().split(' ').length
            : 0;

        return this.typedTexts.reduce((typedTextsWordCount, typedText) => (
            typedTextsWordCount + typedText.text.trim().split(' ').length
        ), currentTypedTextWordCount);
    }

    getCPM() {
        return this.typedTexts.reduce((typedTextLength, typedText) => (
            typedTextLength + typedText.text.length
        ), this.currentTypedText.length);
    }

    getErrorCount() {
        return this.typedTexts.reduce((errorCount, typedText) => (
            errorCount + typedText.errorCount
        ), this.currentErrorCount);
    }

    getTypedTextAccuracy() {
        const charactersTyped = this.getCPM();
        const correctCharacterCount = charactersTyped - this.getErrorCount();

        return Math.round((correctCharacterCount / charactersTyped) * 100) || 0;
    }

    resetTest() {
        this.typingTextIndex = -1;
        this.typedTexts = [];
        this.currentTypedText = '';
        this.currentErrorCount = 0;
    }
}