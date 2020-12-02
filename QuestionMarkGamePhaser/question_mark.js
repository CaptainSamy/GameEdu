QuestionMark = function (game) {
    this.game = game;
}

QuestionMark.prototype = {
    init: function (levelIndex, currentQuestionIndex, indexMark) {
        this.levelIndex = levelIndex;
        this.currentQuestionIndex = currentQuestionIndex;
        this.indexMark = indexMark;
    },

    create: function () {
        this.game.stage.backgroundColor = '#b2b7c3';
        // data
        var dataQAMark = markJSON;
        this.dataQAMark = dataQAMark;

        var questionItem = this.getQuestionMark(this.levelIndex, this.currentQuestionIndex); // getQuestionMark
        this.showQuestionMark(questionItem); // showQuestionMark
        ///
        this.totalMarkInQuestion = this.listQuestionMarkByLevel(this.levelIndex)[this.currentQuestionIndex].correct_answer.length;
        this.addPagerQuestionMark = new Page(this.game, 'circle', 'circle1', this.indexMark, this.totalMarkInQuestion);
    },
    ////
    getQuestionMark(levelIndex, currentQuestionIndex) {
        return this.listQuestionMarkByLevel(levelIndex)[currentQuestionIndex];
    },
    ////
    listQuestionMarkByLevel(levelIndex) {
        return this.dataQAMark.levels[levelIndex].questions;
    },
    ////
    showQuestionMark(questionItem) {
        // Show Question
        var questionTotal = questionItem.question.length;
        var xPos = (config.GAME_WIDTH - (60*questionTotal))/2;
        for(var i = 0; i < questionTotal; i++) {
            var question = this.game.add.text(xPos, config.GAME_HEIGHT/4, questionItem.question[i], {
                font: '60px Arial',
                fill: '#000000',
                wordWrap: true,
                wordWrapWidth: 800,
                align: 'center',
                backgroundColor: '#ffffff'
            });
            question.anchor.set(0.5);
            xPos += 80;
            if (questionItem.question[i] === "?") {
                question.addColor('#00ccff', 0);
            }
        }

        // Show Answer
        //var totalMark = questionItem.correct_answer.length;
        var correctAnswer = questionItem.correct_answer[this.indexMark];
        var answer = questionItem.wrong_answer[this.indexMark];
        answer.push(correctAnswer);
        answer.sort(function () {
            return 0.5 - Math.random()
        });
        this.addButtonChoiceMark(answer, correctAnswer);
    },
    ////
    addButtonChoiceMark(answer, correctAnswer) {
        var groupButtons = this.game.add.group();
        var xPos = (config.GAME_WIDTH - (config.GAME_WIDTH/8*answer.length))/2;
        for (var i = 0; i < answer.length; i++) {
            var group = this.showGroupMark(xPos, answer[i], correctAnswer);
            xPos += config.GAME_WIDTH/6;
        }
        groupButtons.add(group);
    },
    ////
    showGroupMark(xPos, answerElement, correctAnswer) {
        var text = this.game.add.text(xPos, config.GAME_HEIGHT/1.5, answerElement, {
            font: "20px Arial",
            fill: "#000000",
            wordWrap: false,
            wordWrapWidth: 100,
            align: "center",
            backgroundColor: '#ec9797'
        });
        text.anchor.setTo(0.5, 0.5);
        text.inputEnabled = true;
        text.events.onInputDown.add(() => {
            this.onTextClicked(answerElement, correctAnswer, this.levelIndex, this.currentQuestionIndex, this.indexMark)
        }, this);
        var group = this.game.add.group();
        group.add(text);
        return group;
    },
    ////
    onTextClicked(answerElement, correctAnswer, levelIndex, currentQuestionIndex, indexMark) {
        if (answerElement === correctAnswer) {
            alert('Correct');
            nextQuestionMark(levelIndex, currentQuestionIndex, indexMark);
        } else {
            alert('Wrong');
            nextQuestionMark(levelIndex, currentQuestionIndex, indexMark);
        }
    }
}

function nextQuestionMark(levelIndex, currentQuestionIndex, indexMark) {
    this.game.state.start('answer_mark', true, false, levelIndex, currentQuestionIndex, indexMark);
}