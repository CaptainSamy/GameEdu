Answer = function (game) {
    this.game = game;
}

function nextGameCompare() {
    location.replace(config.HOST+'/GameEdu/CompareNumbersGamePhaser/index.html');
}

Answer.prototype = {
    init: function (levelIndex, threadIndex, currentQuestion) {
        this.levelIndex = levelIndex;
        this.threadIndex = threadIndex;
        this.currentQuestion = currentQuestion;
    },
    create: function () {
        var data = QA_Multi_JSON;
        var totalQuestionThread = data.levels[this.levelIndex].questions.length;
        console.log(totalQuestionThread+'');
        this.currentQuestion++;
        this.threadIndex = 0;
        if (this.currentQuestion < totalQuestionThread) {
            this.game.state.start('question', true, false, this.levelIndex, this.threadIndex, this.currentQuestion);
        } else {
            nextGameCompare();
        }
    }
}