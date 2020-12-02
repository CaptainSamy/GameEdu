Counting = function (game) {
    this.game = game;
}

Counting.prototype = {
    init: function (level, currentQuestionIndex) {
        this.levelIndexSelected = level;
        this.currentQuestionIndex = currentQuestionIndex;
    },
    create: function () {
        this.game.stage.backgroundColor = '#b2b7c3';
        var bg = this.game.add.sprite(0, 0, 'counting_bg');
        if (config.GAME_WIDTH > bg.height) {
            bg.scale.setTo(2, 2);
        }
        var bulkhead = this.game.add.sprite(config.GAME_WIDTH/2, config.GAME_HEIGHT/1.5, 'bulkhead');
        bulkhead.anchor.setTo(0.5, 0.5);
        var dataCounting = countingJSON;
        this.dataCounting = dataCounting;

        this.rectCanvasTop = Utils.getRectCanvasTop();

        // getQuestion, showQuestion
        var questionItem = this.getQuestionCounting(this.levelIndexSelected, this.currentQuestionIndex);
        this.showQuestion(questionItem);
        //
        this.totalQuestionsCounting = this.listQuestionByLevel(this.levelIndexSelected).length;
        this.showAnswerCorrect(counting.score, this.totalQuestionsCounting);

        this.addPageCounting = new Page(this.game, 'circle', 'circle1', this.currentQuestionIndex, this.totalQuestionsCounting);
    },
    //
    getQuestionCounting(levelIndex, questionIndex) {
        return this.listQuestionByLevel(levelIndex)[questionIndex];
    },
    //
    listQuestionByLevel(levelIndex) {
        return this.dataCounting.levels[levelIndex].questions;
    },
    //
    showQuestion(questionItem) {
        var question = questionItem.question.split(":");
        var img = this.addQuestionFruit(question[0], question[1], question[2]);
        // random thứ tự đáp án
        questionItem.wrong_answer.push(questionItem.correct_answer);
        var arrAnswer = questionItem.wrong_answer.sort(function () {
            return 0.5 - Math.random()
        });
        this.addButtonsChoice(arrAnswer, questionItem.correct_answer);
    },
    //
    addQuestionFruit(total, image, orientation) {
        if (orientation === counting.VERTICAL) {
            var xPos = (config.GAME_WIDTH - (config.GAME_WIDTH/10*total/3))/2;
            var yPos = config.GAME_HEIGHT/8;
            var count = 0;
            for(var i = 0; i < total; i++) {
                count++;
                this.addImage(xPos, yPos, image)
                yPos += config.GAME_HEIGHT/8;
                if (count === 3) {
                    count = 0;
                    xPos += config.GAME_WIDTH/10;
                    yPos = config.GAME_HEIGHT/8;
                }
            }
        } else if (orientation === counting.HORIZONTAL) {
            var xPos = (config.GAME_WIDTH - (config.GAME_WIDTH/11*8))/2;
            var yPos = config.GAME_HEIGHT/6;
            var count = 0;
            for(var i = 0; i < total; i++) {
                count++;
                this.addImage(xPos, yPos, image)
                xPos += config.GAME_WIDTH/10;
                if (count === 8) {
                    count = 0;
                    xPos = (config.GAME_WIDTH - (config.GAME_WIDTH/11*8))/2;
                    yPos += config.GAME_HEIGHT/8;
                }
            }
        }
    },
    //
    addImage(xPos, yPos, image) {
        var bgFruit = this.game.add.sprite(xPos, yPos, 'bg_fruit');
        bgFruit.anchor.setTo(0.5, 0.5);

        var img = this.game.add.image(xPos, yPos, image);
        img.anchor.setTo(0.5, 0.5);
        img.scale.setTo(0.5, 0.5);
    },
    //
    showAnswerCorrect(item, totalQuestions) {
        var style = {
            font: '20px Arial',
            fill: '#000000',
            wordWrap: false,
            align: 'right',
            backgroundColor: '#ffffff'
        }
        var textContent = 'Correct: '+ item + '/' + totalQuestions;
        var tvCorrect = this.game.add.text(0, 0, textContent, style);
    },
    //
    addButtonsChoice(answer, correct_answer) {
        var groupButtons = this.game.add.group();
        var xPos = (config.GAME_WIDTH - (config.GAME_WIDTH/8*answer.length))/2;
        for(var i = 0; i < answer.length; i++) {
            var group = this.addChoiceGroup(xPos, answer[i], correct_answer);
            xPos += config.GAME_WIDTH/6;
        }
        groupButtons.add(group);
    },
    //
    addChoiceGroup(xPos, answerElement, correct_answer) {
        var bgBtn = this.game.add.sprite(xPos, config.GAME_HEIGHT/1.3, 'bg_button');
        bgBtn.anchor.setTo(0.5, 0.5);
        var text = this.game.add.text(xPos, config.GAME_HEIGHT/1.3, answerElement, {
            fontFamily: 'Baloo 2',
            fontStyle: 'normal',
            fontSize: '52.7024px',
            fontWeight: 800,
            lineHeight: '83px',
            fill: '#F54A11',
            wordWrap: false,
            align: 'center'
        });
        text.anchor.setTo(0.5, 0.5);
        text.inputEnabled = true;
        text.events.onInputDown.add(() => {
            this.onTextClicked(answerElement, correct_answer, this.levelIndexSelected, this.currentQuestionIndex)
        }, this);
        var group = this.game.add.group();
        group.add(bgBtn);
        group.add(text);
        return group;
    },
    //
    onTextClicked(answerElement, correct_answer, levelIndex, currentIndex) {
        if (answerElement === correct_answer) {
            alert('Correct');
            counting.score++;
            nextQuestion(levelIndex, currentIndex);
        } else {
            alert('Wrong');
            nextQuestion(levelIndex, currentIndex);
        }
    }
}

function nextQuestion(levelIndex, currentIndex) {
    this.game.state.start('answerCounting', true, false, levelIndex, currentIndex);
}