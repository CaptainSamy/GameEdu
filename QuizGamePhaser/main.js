var Game = {
    score: 0
}
var game = new Phaser.Game(config.GAME_WIDTH, config.GAME_HEIGHT, Phaser.AUTO, '');

game.state.add('level', Level);
game.state.add('question', Question);
game.state.add('answer', Answer);

game.state.start('level');
