AnswerInThread = function (game) {
    this.game = game;
}

AnswerInThread.prototype = {
    init: function (questionThread, levelIndex, threadIndex, currentQuestion) {
        this.questionThread = questionThread;
        this.levelIndex = levelIndex;
        this.threadIndex = threadIndex;
        this.currentQuestion = currentQuestion;
    },
    create: function () {
        //
        var totalQuestionInThread = this.questionThread.question_list.length;
        this.threadIndex++;
        if (this.threadIndex < totalQuestionInThread) {
            this.game.state.start('question_in_thread', true, false, this.questionThread, this.levelIndex, this.threadIndex, this.currentQuestion);
        } else {
            this.game.state.start('answer', true, false, this.levelIndex, this.threadIndex, this.currentQuestion);
        }

    }
}