Level = function (game) {
    this.game = game;
}
var countingJSON = {
    "levels": [
        {
            "questions": [
                {
                    "question": "13:peach:ngang",
                    "correct_answer": "13",
                    "wrong_answer": ["6", "12", "14"]
                },
                {
                    "question": "7:apple:doc",
                    "correct_answer": "7",
                    "wrong_answer": ["5", "8", "10"]
                },
                {
                    "question": "9:banana:doc",
                    "correct_answer": "9",
                    "wrong_answer": ["10", "11", "16"]
                },
                {
                    "question": "21:watermelon:ngang",
                    "correct_answer": "21",
                    "wrong_answer": ["10", "19", "15"]
                }
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
        this.load.image('counting_1', '../assets/counting.png');
        this.load.image('circle1', '../assets/circle1.png');
        this.load.image('circle', '../assets/circle.png');
        this.load.image('counting_bg', '../assets/counting_bg.png');
        this.load.image('bulkhead', '../assets/bulkhead.png');
        this.load.image('bg_fruit', '../assets/counting_bg_fruit.png');
        this.load.image('bg_button', '../assets/bg_button_choice.png');
        this.load.image('apple', '../assets/fruit/apple.png');
        this.load.image('banana', '../assets/fruit/banana.png');
        this.load.image('peach', '../assets/fruit/peach.png');
        this.load.image('watermelon', '../assets/fruit/watermelon.png');
    },
    create: function () {
        this.game.stage.backgroundColor = '#b2b7c3';
        var dataCounting = countingJSON;
        var btnGroup = this.createButtons();
    },
    createButtons() {
        this.groupButtons = this.game.add.group();
        this.createButtonLevel(0, 0);
        return this.groupButtons;
    },
    createButtonLevel(index, currentQuestion) {
        var key = 'counting_'+(index+1);
        var context = {
            level: index,
            current: currentQuestion,
            game: this.game
        }
        var button = this.game.add.button(config.GAME_WIDTH/2, config.GAME_HEIGHT/2, key, this.onBtnLevelClicked, context, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);
    },
    onBtnLevelClicked() {
        this.game.state.start('counting', true, false, this.level, this.current);
    }
}