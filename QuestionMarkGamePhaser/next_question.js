NextQuestion = function(game) {
    this.game = game;
}

NextQuestion.prototype = {
    init: function(levelIndex, currentQuestion, markIndex) {
        this.levelIndex = levelIndex;
        this.currentQuestion = currentQuestion;
        this.markIndex = markIndex;
    },
    create: function() {
        var dataQAMark = markJSON;
        var totalQuestion = dataQAMark.levels[this.levelIndex].questions.length;
        this.currentQuestion++;
        this.markIndex = 0;
        if (this.currentQuestion < totalQuestion) {
            this.game.state.start('question_mark', true, false, this.levelIndex, this.currentQuestion, this.markIndex);
        } else {
            location.replace(config.HOST+'/GameEdu/CampaignPhaser/index.html');
        }
    }
}