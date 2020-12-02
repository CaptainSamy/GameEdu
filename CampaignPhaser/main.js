var campaign = new Phaser.Game(config.GAME_WIDTH, config.GAME_HEIGHT, Phaser.AUTO, '');
campaign.state.add('campaign', Campaign);

campaign.state.start('campaign');