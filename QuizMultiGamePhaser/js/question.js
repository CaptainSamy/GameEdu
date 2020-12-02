Question = function (game) {
    this.game = game;
}

Question.prototype = {
    init: function (levelIndex, threadIndex, currentQuestion) {
        this.levelIndex = levelIndex;
        this.threadIndex = threadIndex;
        this.currentQuestion = currentQuestion;
    },
    create: function () {
        this.game.stage.backgroundColor = '#b2b7c3';
        var data = QA_Multi_JSON;
        this.data = data;
        //
        var questionThread = this.getQuestionThread(this.levelIndex, this.currentQuestion);
        this.showQuestionThread(questionThread, this.levelIndex, this.threadIndex, this.currentQuestion);
    },

    getQuestionThread(levelIndex, currentQuestion) {
        return this.data.levels[levelIndex].questions[currentQuestion];
    },
    showQuestionThread(questionThread, levelIndex, threadIndex, currentQuestion) {
        this.game.state.start('question_in_thread', true, false, questionThread, levelIndex, threadIndex, currentQuestion);
    }
}
    
