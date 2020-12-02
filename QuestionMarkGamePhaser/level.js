Level = function (game) {
    this.game = game;
}
var markJSON = {
    "levels": [
        {
            "questions": [
                {
                    "question": ["1","2","?","?","5"],
                    "correct_answer": ["3","4"],
                    "wrong_answer": [
                        ["4","5","1"],
                        ["2","3","9"]
                    ]

                },
                {
                    "question": ["?","?","?","16","17"],
                    "correct_answer": ["13","14","15"],
                    "wrong_answer": [
                        ["14","15","11"],
                        ["12","13","19"],
                        ["10","13","14"]
                    ]

                }
            ]
        }
    ]
}

Level.prototype = {
    init: function () {
        this.levelIndex = 0;
        this.currentQuestionIndex = 0;
        this.indexMark = 0;
    },
    preload: function () {
        this.load.image('mark_1', '../assets/question_mark.png');
        this.load.image('circle1', '../assets/circle1.png');
        this.load.image('circle', '../assets/circle.png');
    },
    create: function () {
        this.game.stage.backgroundColor = '#8f8686';
        var dataQAMark = markJSON;
        var btnGroup = this.createButtons();
    },
    createButtons() {
        this.groupButtons = this.game.add.group();
        this.createButtonLevel(this.levelIndex, this.currentQuestionIndex, this.indexMark);
        return this.groupButtons;
    },
    createButtonLevel(index, currentQuestion, indexMark) {
        var key = 'mark_'+(index+1);
        var context = {
            level: index,
            current: currentQuestion,
            indexMark: indexMark,
            game: this.game
        }
        var button = this.game.add.button(config.GAME_WIDTH/2, config.GAME_HEIGHT/2, key, this.onBtnLevelClicked, context, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);
    },
    onBtnLevelClicked() {
        this.game.state.start('question_mark', true, false, this.level, this.current, this.indexMark);
    }
}