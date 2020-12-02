var game = new Phaser.Game(config.GAME_WIDTH, config.GAME_HEIGHT, Phaser.AUTO, '');
game.state.add('level', Level);
game.state.add('question_mark', QuestionMark);
game.state.add('answer_mark', AnswerMark);
game.state.add('next_question', NextQuestion);

game.state.start('level');
