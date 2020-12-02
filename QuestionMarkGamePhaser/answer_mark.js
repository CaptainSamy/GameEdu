AnswerMark = function (game) {
    this.game = game;
}
AnswerMark.prototype = {
    init: function (levelIndex, currentQuestion, markIndex) {
        this.levelIndex = levelIndex;
        this.currentQuestion = currentQuestion;
        this.markIndex = markIndex
    },
    create: function () {
        var dataQAMark = markJSON;
        var totalMarkInQuestion = dataQAMark.levels[this.levelIndex].questions[this.currentQuestion].correct_answer.length;
        console.log(totalMarkInQuestion+'');
        this.markIndex++;
        if (this.markIndex < totalMarkInQuestion) {
            this.game.state.start('question_mark', true, false, this.levelIndex, this.currentQuestion, this.markIndex);
        } else {
            this.game.state.start('next_question', true, false, this.levelIndex, this.currentQuestion, this.markIndex);
        }
    }
}