AnswerCompare = function(game) {
    this.game = game;
}

AnswerCompare.prototype = {
    init: function (levelIndexSelected, currentQuestionIndex) {
        this.levelIndexSelected = levelIndexSelected;
        this.currentQuestionIndex = currentQuestionIndex;
    },
    create: function () {
        var dataCompare = compareJSON;
        var totalQuestionsCompare = dataCompare.levels[this.levelIndexSelected].questions.length;
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < totalQuestionsCompare) {
            this.game.state.start('compare', true, false, this.levelIndexSelected, this.currentQuestionIndex);
        } else {
            location.replace(config.HOST+'/GameEdu/QuestionMarkGamePhaser/index.html');
        }
    }
}