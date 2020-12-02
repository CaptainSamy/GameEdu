QuestionInThread = function (game) {
    this.game = game;
}

QuestionInThread.prototype = {
     init: function (questionThread, levelIndex, threadIndex, currentQuestion) {
        this.questionThread = questionThread;
        this.levelIndex = levelIndex;
        this.threadIndex = threadIndex;
        this.currentQuestion = currentQuestion;
        console.log(this.currentQuestion+'');
     },

     create: function () {
        this.game.stage.backgroundColor = '#b2b7c3';
        this.showQuestion(this.questionThread, this.threadIndex);
        this.addPagerQAMulti = new Page(this.game, 'circle', 'circle1', this.threadIndex, this.questionThread.question_list.length)
     },
     //
     showQuestion(questionThread, threadIndex) {
         // question thread
         this.titleThread = this.game.add.text(config.GAME_WIDTH/2, config.GAME_HEIGHT/6, questionThread.threads, {
             font: '24px Arial',
             fill: '#000000',
             wordWrap: true,
             wordWrapWidth: 800,
             align: 'center',
             backgroundColor: '#ffffff'
         });
         this.titleThread.anchor.set(0.5, 0.5);
         // question in thread
         var questionInThread = this.addQuestion(questionThread.question_list[threadIndex]);
     },
     //
     addQuestion(questionListElement) {
        // question
        var titleQuestion = this.game.add.text(0, 0, questionListElement.question, {
            font: '24px Arial',
            fill: '#000000',
            wordWrap: true,
            wordWrapWidth: 800,
            align: 'center',
            backgroundColor: '#f3caca'
        });
        titleQuestion.anchor.set(0.5, 0.5);
        titleQuestion.alignTo(this.titleThread, Phaser.BOTTOM_CENTER, 0, 10);
        // answer
         questionListElement.wrong_answer.push(questionListElement.correct_answer);
         var arrAnswer = questionListElement.wrong_answer.sort(function () {
             return 0.5 - Math.random()
         });
         this.addButtonChoice(arrAnswer, questionListElement.correct_answer);
     },
     //
     addButtonChoice(arrAnswer, correct_answer) {
         var groupButtons = this.game.add.group();
         var initX = (config.GAME_WIDTH - (config.GAME_WIDTH/8*arrAnswer.length))/2;
         for (var i = 0; i < arrAnswer.length; i++) {
             var group = this.addChoiceGroup(initX, arrAnswer[i], correct_answer);
             initX += config.GAME_WIDTH/6;;
         }
         groupButtons.add(group);
     },
     //
     addChoiceGroup(initX, arrAnswerElement, correct_answer) {
         var text = this.game.add.text(initX, config.GAME_HEIGHT/1.5, arrAnswerElement, {
             font: "12pt Arial",
             fill: "#000000",
             wordWrap: false,
             wordWrapWidth: 150,
             align: "center",
             backgroundColor: '#97ecc7'
         });
         text.inputEnabled = true;
         text.events.onInputDown.add(() => {
             this.onTextClicked(arrAnswerElement, correct_answer, this.questionThread, this.levelIndex, this.threadIndex, this.currentQuestion);
         }, this);
         var group = this.game.add.group();
         group.add(text);
         return group;
     },
     //
     onTextClicked(arrAnswerElement, correct_answer, questionThread, levelIndex, threadIndex, currentQuestion) {
        if (arrAnswerElement === correct_answer) {
            alert('Correct');
            nextQuestion(questionThread, levelIndex, threadIndex, currentQuestion);
        } else {
            alert('Wrong');
            nextQuestion(questionThread, levelIndex, threadIndex,currentQuestion);
        }
     }
}

function nextQuestion(questionThread, levelIndex, threadIndex, currentQuestion) {
    this.game.state.start('answer_in_thread', true, false, questionThread, levelIndex, threadIndex, currentQuestion);
}