class TypingApp {
    constructor() {
        this.textSamples = [
            'プログラミングは論理的思考力を鍛える素晴らしい方法です。',
            'タイピング練習により、コーディングの効率が大幅に向上します。',
            'JavaScriptは現代のWeb開発において欠かせない言語の一つです。',
            '継続的な練習が上達への最短ルートであることは間違いありません。',
            'エラーを恐れず、挑戦し続けることが成長への鍵となります。',
            'プログラマーにとって正確で迅速な入力スキルは重要な武器です。',
            '新しい技術を学ぶ際は、基礎をしっかりと身につけることが大切です。',
            'デバッグは問題解決能力を向上させる貴重な経験となります。',
            'チーム開発では、コミュニケーション能力も同じく重要になります。',
            '良いコードは読みやすく、保守しやすいものでなければなりません。'
        ];
        
        this.currentText = '';
        this.currentIndex = 0;
        this.startTime = 0;
        this.endTime = 0;
        this.timer = 60;
        this.timerInterval = null;
        this.isGameActive = false;
        this.correctChars = 0;
        this.totalChars = 0;
        
        this.initElements();
        this.bindEvents();
    }
    
    initElements() {
        this.textDisplay = document.getElementById('text-to-type');
        this.textInput = document.getElementById('text-input');
        this.startBtn = document.getElementById('start-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.timerElement = document.getElementById('timer');
        this.scoreElement = document.getElementById('score');
        this.wpmElement = document.getElementById('wpm');
        this.accuracyElement = document.getElementById('accuracy');
        this.resultsDiv = document.getElementById('results');
        this.finalScore = document.getElementById('final-score');
        this.finalWpm = document.getElementById('final-wpm');
        this.finalAccuracy = document.getElementById('final-accuracy');
        this.typedChars = document.getElementById('typed-chars');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.textInput.addEventListener('input', (e) => this.handleInput(e));
        this.textInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }
    
    startGame() {
        this.isGameActive = true;
        this.currentText = this.getRandomText();
        this.currentIndex = 0;
        this.correctChars = 0;
        this.totalChars = 0;
        this.timer = 60;
        this.startTime = Date.now();
        
        this.textDisplay.innerHTML = this.highlightText();
        this.textInput.disabled = false;
        this.textInput.value = '';
        this.textInput.focus();
        this.startBtn.disabled = true;
        this.resultsDiv.style.display = 'none';
        
        this.startTimer();
    }
    
    resetGame() {
        this.isGameActive = false;
        this.currentIndex = 0;
        this.correctChars = 0;
        this.totalChars = 0;
        this.timer = 60;
        
        clearInterval(this.timerInterval);
        
        this.textDisplay.textContent = 'タイピングを開始するには「スタート」ボタンを押してください。';
        this.textInput.value = '';
        this.textInput.disabled = true;
        this.startBtn.disabled = false;
        this.timerElement.textContent = '60';
        this.scoreElement.textContent = '0';
        this.wpmElement.textContent = '0';
        this.accuracyElement.textContent = '100';
        this.resultsDiv.style.display = 'none';
    }
    
    getRandomText() {
        const randomIndex = Math.floor(Math.random() * this.textSamples.length);
        return this.textSamples[randomIndex];
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer--;
            this.timerElement.textContent = this.timer;
            
            if (this.timer <= 0) {
                this.endGame();
            }
        }, 1000);
    }
    
    handleInput(e) {
        if (!this.isGameActive) return;
        
        const inputValue = e.target.value;
        this.totalChars = inputValue.length;
        
        // 正しく入力された文字数をカウント
        this.correctChars = 0;
        for (let i = 0; i < inputValue.length && i < this.currentText.length; i++) {
            if (inputValue[i] === this.currentText[i]) {
                this.correctChars++;
            }
        }
        
        this.currentIndex = inputValue.length;
        this.updateDisplay();
        
        // テキストを全て正しく入力した場合
        if (inputValue === this.currentText) {
            this.endGame();
        }
    }
    
    handleKeyDown(e) {
        if (!this.isGameActive) return;
        
        // Backspaceで文字数が減る場合も考慮
        if (e.key === 'Backspace') {
            setTimeout(() => {
                this.currentIndex = this.textInput.value.length;
                this.updateDisplay();
            }, 0);
        }
    }
    
    updateDisplay() {
        this.textDisplay.innerHTML = this.highlightText();
        this.scoreElement.textContent = this.correctChars;
        
        const elapsedMinutes = (Date.now() - this.startTime) / 60000;
        const wpm = elapsedMinutes > 0 ? Math.round((this.correctChars / 5) / elapsedMinutes) : 0;
        this.wpmElement.textContent = wpm;
        
        const accuracy = this.totalChars > 0 ? Math.round((this.correctChars / this.totalChars) * 100) : 100;
        this.accuracyElement.textContent = accuracy;
    }
    
    highlightText() {
        const inputValue = this.textInput.value;
        let result = '';
        
        for (let i = 0; i < this.currentText.length; i++) {
            if (i < inputValue.length) {
                if (inputValue[i] === this.currentText[i]) {
                    result += `<span class="correct">${this.currentText[i]}</span>`;
                } else {
                    result += `<span class="incorrect">${this.currentText[i]}</span>`;
                }
            } else if (i === inputValue.length) {
                result += `<span class="current">${this.currentText[i]}</span>`;
            } else {
                result += this.currentText[i];
            }
        }
        
        return result;
    }
    
    endGame() {
        this.isGameActive = false;
        clearInterval(this.timerInterval);
        this.endTime = Date.now();
        
        this.textInput.disabled = true;
        this.startBtn.disabled = false;
        
        this.showResults();
    }
    
    showResults() {
        const elapsedMinutes = (this.endTime - this.startTime) / 60000;
        const finalWpm = elapsedMinutes > 0 ? Math.round((this.correctChars / 5) / elapsedMinutes) : 0;
        const finalAccuracy = this.totalChars > 0 ? Math.round((this.correctChars / this.totalChars) * 100) : 100;
        
        this.finalScore.textContent = this.correctChars;
        this.finalWpm.textContent = finalWpm;
        this.finalAccuracy.textContent = finalAccuracy;
        this.typedChars.textContent = this.totalChars;
        
        this.resultsDiv.style.display = 'block';
    }
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', () => {
    new TypingApp();
});