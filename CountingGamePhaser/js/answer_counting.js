AnswerCounting = function (game) {
    this.game = game;
}

function nextGameQuizMulti() {
    location.replace(config.HOST+'/GameEdu/QuizMultiGamePhaser/index.html');
}

AnswerCounting.prototype = {
    init: function (level, currentQuestionIndex) {
        this.levelIndexSelected = level;
        this.currentQuestionIndex = currentQuestionIndex;
    },
    create: function () {
        var data = countingJSON;

        var totalQuestions = data.levels[this.levelIndexSelected].questions.length;
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < totalQuestions) {
            this.game.state.start('counting', true, false, this.levelIndexSelected, this.currentQuestionIndex);
        } else {
            nextGameQuizMulti();
        }
    }
}