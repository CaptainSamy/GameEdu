Compare = function (game) {
    this.game = game;
}

Compare.prototype = {
    init: function (level, currentQuestionIndex) {
        this.levelIndexSelected = level;
        this.currentQuestionIndex = currentQuestionIndex;
    },
    create: function () {
        this.game.stage.backgroundColor = '#b2b7c3';
        var dataCompare = compareJSON;
        this.dataCompare = dataCompare;

        this.rectCanvasTop = Utils.getRectCanvasTop();
        this.createRectangle(config.GAME_WIDTH/8, config.GAME_HEIGHT/1.5, config.GAME_WIDTH/1.3, 5);

        //
        var questionItem = this.getQuestionItemCompare(this.levelIndexSelected, this.currentQuestionIndex);
        this.showQuestionCompare(questionItem);
        //
        this.totalQuestion = this.listQuestionCompare(this.levelIndexSelected).length;
        this.addPagerCompare = new Page(this.game, 'circle', 'circle1', this.currentQuestionIndex, this.totalQuestion);

    },
    getQuestionItemCompare(levelIndex, questionIndex) {
        return this.listQuestionCompare(levelIndex)[questionIndex];
    },
    listQuestionCompare(levelIndex) {
        return this.dataCompare.levels[levelIndex].questions;
    },
    showQuestionCompare(questionItem) {
        this.tvCompare = this.game.add.text(0, 0, 'Số nào lớn hơn?', {
            font: '24px Arial',
            fill: '#000000',
            wordWrap: false,
            align: 'center',
            backgroundColor: '#ffffff'
        });
        this.tvCompare.anchor.setTo(0.5, 0.5);
        this.tvCompare.alignIn(this.rectCanvasTop, Phaser.CENTER, 0);
        //
        var xPos = (config.GAME_WIDTH - config.GAME_WIDTH/6*questionItem.question.length)/2;
        for (var i = 0; i < questionItem.question.length; i++) {
            this.tvQuestionCompare = this.game.add.text(xPos, config.GAME_HEIGHT/3, questionItem.question[i], {
                font: '90px Arial',
                fill: '#000000',
                wordWrap: true,
                align: 'center',
                backgroundColor: '#be9191'
            });
            xPos += config.GAME_WIDTH/3;
            this.tvQuestionCompare.anchor.setTo(0.5, 0.5);
        }
        //
        questionItem.wrong_answer.push(questionItem.correct_answer);
        var arrAnswerCompare = questionItem.wrong_answer.sort(function() {
            return 0.5 - Math.random()
        });
        this.addBtnChoiceCompare(arrAnswerCompare, questionItem.correct_answer);
    },
    addBtnChoiceCompare(arrAnswerCompare, correct_answer) {
        var groupBtnCompare = this.game.add.group();
        var xPos = (config.GAME_WIDTH - config.GAME_WIDTH/6*arrAnswerCompare.length)/2;
        for (var i = 0; i < arrAnswerCompare.length; i++) {
            var group = this.addChoiceGroupCompare(xPos, arrAnswerCompare[i], correct_answer);
            xPos += config.GAME_WIDTH/3;
        }
        groupBtnCompare.add(group);
    },
    addChoiceGroupCompare(xPos, arrAnswerCompareElement, correct_answer) {
        var text = this.game.add.text(xPos, config.GAME_HEIGHT/1.3, arrAnswerCompareElement, {
            font: '50px Arial',
            fill: '#000000',
            align: 'center',
            backgroundColor: '#ffffff'
        });
        text.anchor.setTo(0.5, 0.5);
        text.inputEnabled = true;
        text.events.onInputDown.add(() => {
            this.onTextClickedCompare(arrAnswerCompareElement, correct_answer, this.levelIndexSelected, this.currentQuestionIndex)
        }, this);
        var group = this.game.add.group();
        group.add(text);
        return group;
    },
    onTextClickedCompare(arrAnswerCompareElement, correct_answer, levelIndexSelected, currentQuestionIndex) {
        if (arrAnswerCompareElement === correct_answer) {
            alert("Correct");
            Game.score++;
            nextQuestionCompare(levelIndexSelected, currentQuestionIndex);
        } else {
            alert("Wrong");
            nextQuestionCompare(levelIndexSelected, currentQuestionIndex);
        }
    },
    createRectangle: function(x, y, w, h){
        var rectangle = {};
        rectangle.sprite = game.add.graphics(x, y);
        rectangle.sprite.beginFill(Phaser.Color.getRandomColor(100, 255), 1);
        rectangle.sprite.bounds = new PIXI.Rectangle(0, 0, w, h);
        rectangle.sprite.drawRect(0, 0, w, h);
        return rectangle;
    }
}

function nextQuestionCompare(levelIndexSelected, currentQuestionIndex) {
    this.game.state.start('answerCompare', true, false, levelIndexSelected, currentQuestionIndex);
}