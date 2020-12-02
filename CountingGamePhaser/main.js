var counting = {
    HORIZONTAL: "ngang",
    VERTICAL: "doc",
    score: 0
}

var game = new Phaser.Game(config.GAME_WIDTH, config.GAME_HEIGHT, Phaser.AUTO, '');
game.state.add('level', Level);
game.state.add('counting', Counting);
game.state.add('answerCounting', AnswerCounting);

game.state.start('level');