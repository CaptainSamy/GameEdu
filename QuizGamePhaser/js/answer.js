Answer = function (game) {
    this.game = game;
}

function nextGameCounting() {
    location.replace(config.HOST+'/GameEdu/CountingGamePhaser/index.html');
}

Answer.prototype = {
    init: function (level, currentQuestionIndex) {
        this.levelIndexSelected = level;
        this.currentQuestionIndex = currentQuestionIndex;
    },
    create: function () {
        var data = QA_JSON;
        var totalQuestions = data.levels[this.levelIndexSelected].questions.length;
        console.log(totalQuestions);
        console.log(this.currentQuestionIndex);
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < totalQuestions) {
            this.game.state.start('question', true, false, this.levelIndexSelected, this.currentQuestionIndex);
        } else {
            nextGameCounting();
        }
    },
}

