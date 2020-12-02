Jigsaw = function(game) {
    this.game = game;
    this._levelNumber = 1;
}

var jigsawJSON = {
    "url_image": "img_jigsaw",
    "size": 3
}

var imgUrl = jigsawJSON.url_image;
var size = jigsawJSON.size;

Jigsaw.prototype = {
    init: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
    },
    preload: function() {
        this.game.load.image('img_jigsaw', '../assets/img_jigsaw.png');
    },
    create: function() {
        this.stage.backgroundColor = "#95c5c6";
        this.game_done = false;
        this.square = size;

        this.puzzle = new Puzzle(this.game, imgUrl, this.square);
        this.puzzle.scatter();
    },
    update: function() {
        if (this.puzzle.won === true) {
            this.game.input.onUp.add(this.nextGame,this);
            this.win_text = this.game.add.text(config.GAME_WIDTH/2, 50, 'GREAT!\nTap to next game.', {
                font: "25px Arial",
                fill: "#000000",
                align: "center"
            });
            this.win_text.anchor.setTo(0.5);
        }
    },
    makeBox: function (x, y) {
        var bmd = this.game.add.bitmapData(x, y);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, x, y);
        bmd.ctx.fillStyle = "#fff";
        bmd.ctx.fill();
        return bmd;
    },
    nextGame: function() {
        location.replace(config.HOST+'/GameEdu/QuizGamePhaser/index.html');
    },
}