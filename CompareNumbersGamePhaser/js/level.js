Level = function(game) {
    this.game = game;
}
var compareJSON = {
    "levels": [
        {
            "questions": [
                {
                    "question": ["6","9"],
                    "correct_answer": "9",
                    "wrong_answer": ["6"]
                },
                {
                    "question": ["3","1"],
                    "correct_answer": "3",
                    "wrong_answer": ["1"]
                },
                {
                    "question": ["12","10"],
                    "correct_answer": "12",
                    "wrong_answer": ["10"]
                },
                {
                    "question": ["13","16"],
                    "correct_answer": "16",
                    "wrong_answer": ["13"]
                },
                {
                    "question": ["5","8"],
                    "correct_answer": "8",
                    "wrong_answer": ["5"]
                },
            ]
        }
    ]
}
Level.prototype = {
    init: function () {
        this.levelIndex = 0;
        this.currentQuestionIndex = 0;
    },
    preload: function () {
        this.load.image('compare_1', '../assets/compare.png');
        this.load.image('circle1', '../assets/circle1.png');
        this.load.image('circle', '../assets/circle.png');
    },
    create: function () {
        this.game.stage.backgroundColor = '#8f8686';
        var dataCompare = compareJSON;
        var btnGroup = this.createButton();
    },
    createButton() {
        this.groupButtons = this.game.add.group();
        this.createButtonLevel(0, 0);
        return this.groupButtons;
    },
    createButtonLevel(index, currentQuestion) {
        var key = 'compare_'+(index+1);
        var context = {
            level: index,
            current: currentQuestion,
            game: this.game
        };
        var button = this.game.add.button(config.GAME_WIDTH/2, config.GAME_HEIGHT/2, key, this.onBtnLevelClicked, context, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);
    },
    onBtnLevelClicked() {
        this.game.state.start('compare', true, false, this.level, this.current);
    }
}