
var game = new Phaser.Game(config.GAME_WIDTH, config.GAME_HEIGHT, Phaser.AUTO, '');
game.state.add('jigsaw', Jigsaw);

game.state.start('jigsaw');