var Page = function (game, circle, circle1, current, total) {
    this.game = game;
    this.circle = circle;
    this.circle1 = circle1;
    this.current = current;
    this.total = total;
    this.addPagerQuestion(this.current, this.total, this.circle1, this.circle);
}
Page.prototype = Page.prototype.constructor = Page;
Page.prototype = {
    addPagerQuestion(current, total, circle1, circle) {
        var xPos = config.GAME_WIDTH/2.3;
        for(var i = 0; i < total; i++) {
            this.imgPage = this.game.add.image(xPos, config.GAME_HEIGHT-20, circle1);
            xPos += 20;
            if (i === current) {
                this.imgPage.loadTexture(circle);
            }
        }
    }
}