Question = function (game) {
    this.game = game;
}

Question.prototype = {
    init: function (level, currentQuestionIndex) {
          this.levelIndexSelected = level;
          this.currentQuestionIndex = currentQuestionIndex;
    },

    create: function () {
        this.game.stage.backgroundColor = '#b2b7c3';
        // load json
        var dataQA = QA_JSON;
        this.dataQA = dataQA;
        // getQuestion, showQuestion
        var questionItem = this.getQuestionItem(this.levelIndexSelected, this.currentQuestionIndex);
        this.showQuestion(questionItem);

        // getTotalQuestion
        this.totalQuestions = this.listQuestionByLevel(this.levelIndexSelected).length
        this.showAnswerCorrect(Game.score, this.totalQuestions);
        //
        this.addPagerQA = new Page(this.game, 'circle', 'circle1', this.currentQuestionIndex, this.totalQuestions);
    },

    //getQuestion from json file
    getQuestionItem(levelIndex, questionIndex) {
        return this.listQuestionByLevel(levelIndex)[questionIndex];
    },
    listQuestionByLevel(levelIndex) {
        return this.dataQA.levels[levelIndex].questions;
    },

    //
    showAnswerCorrect(item, totalQuestions) {
        var style = {
            font: "20pt Arial",
            fill: "#7C00F8",
            wordWrap: false,
            align: "right",
            backgroundColor: '#ffffff'
        };
        var textContent = 'Correct : '+item+'/'+totalQuestions;
        var textEl = this.game.add.text(0,0,textContent, style);
    },

    //
    showQuestion(questionItem) {
        var questionTitleElement = this.addQuestionTitle(questionItem.question); // câu hỏi
        //random thứ tự trong đáp án
        questionItem.wrong_answer.push(questionItem.correct_answer);
        var arrAnswer = questionItem.wrong_answer.sort(function () {
            return 0.5 - Math.random()
        });
        this.addButtonsChoiceQA(arrAnswer,questionItem.correct_answer); // đáp án
    },

    //
    addQuestionTitle(textContent) {
        var questionTitleElement = this.game.add.text(config.GAME_WIDTH/2, config.GAME_HEIGHT/4
            ,textContent, {
            font: "24pt Arial",
            fill: "#000000",
            wordWrap: true,
            wordWrapWidth:800,
            align: "center",
            backgroundColor: '#ffffff'
        });
        questionTitleElement.anchor.set(0.5);
        return questionTitleElement;
    },

    //
    addButtonsChoiceQA(answer, correct_answer) {
        var groupButtons = this.game.add.group();
        var initX = (config.GAME_WIDTH - (config.GAME_WIDTH/8*answer.length))/2;
        for (var i = 0; i < answer.length; i++) {
            var group = this.addChoiceGroup(initX, answer[i], correct_answer);
            initX += config.GAME_WIDTH/6;
        }
        groupButtons.add(group);
    },

    //
    addChoiceGroup(initX, answerElement, correct_answer) {
        var text = this.game.add.text(initX, config.GAME_HEIGHT/1.5, answerElement, {
            font: "12px Arial",
            fill: "#000000",
            wordWrap: false,
            wordWrapWidth: 100,
            align: "center",
            backgroundColor: '#ec9797'
        });
        text.inputEnabled = true;
        text.events.onInputDown.add(() => {
            this.onTextClicked(answerElement, correct_answer, this.levelIndexSelected, this.currentQuestionIndex)
        }, this);
        var  group = this.game.add.group();
        group.add(text);
        return group;
    },

    // check answer
    onTextClicked(answerElement, correctAnswer, levelIndex, currentIndex ) {
        if (answerElement === correctAnswer) {
            alert("Correct");
            Game.score++;
            nextQuestion(levelIndex, currentIndex);
        } else {
            alert("Wrong");
            nextQuestion(levelIndex, currentIndex);
        }
    }
}

function nextQuestion(levelIndex, currentIndex) {
    this.game.state.start('answer', true, false, levelIndex, currentIndex);
}
