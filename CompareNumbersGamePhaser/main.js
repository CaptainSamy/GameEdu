var Game = {
    score: 0
}

var game = new Phaser.Game(config.GAME_WIDTH, config.GAME_HEIGHT, Phaser.AUTO, '');
game.state.add('level', Level);
game.state.add('compare', Compare);
game.state.add('answerCompare', AnswerCompare);

game.state.start('level');
