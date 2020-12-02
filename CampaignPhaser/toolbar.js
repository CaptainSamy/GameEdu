
var Toolbar = function (game, name, star, lesson, imgToolbar, imgBack, imgStar_BG, imgStar, imgName, imgLesson, imgTutorial) {
    this.game = game;
    this.name = name;
    this.star = star;
    this.lesson = lesson;
    this.imgToolbar = imgToolbar
    this.imgBack = imgBack;
    this.imgStar_BG = imgStar_BG;
    this.imgStar = imgStar;
    this.imgName = imgName;
    this.imgLesson = imgLesson;
    this.imgTutorial = imgTutorial;

    this.makeToolbarInCampaign(this.name, this.star, this.lesson, this.imgToolbar, this.imgBack, this.imgStar_BG, this.imgStar, this.imgName, this.imgLesson, this.imgTutorial);
}

Toolbar.prototype = Toolbar.prototype.constructor = Toolbar;
Toolbar.prototype = {
    makeToolbarInCampaign(name, star, lesson, imgToolbar, imgBack, imgStar_BG, imgStar, imgName, imgLesson, imgTutorial) {
        var boxToolbar = this.game.add.group();
        boxToolbar.fixedToCamera = true; // cố định sprite khi move camera
        var bgToolbar = this.game.add.sprite(0, 0, imgToolbar); // background
        // Button back
        var btnBack = this.game.add.sprite(0, 0, imgBack);
        btnBack.anchor.setTo(0.5, 0.5);
        btnBack.alignIn(bgToolbar, Phaser.LEFT_CENTER, -10, 0);

        //// Star
        var bgStar = this.game.add.sprite(0, 0, imgStar_BG);
        bgStar.anchor.setTo(0.5, 0.5);
        bgStar.alignIn(bgToolbar, Phaser.CENTER, 0, 0);

        var imgStar = this.game.add.sprite(0, 0, imgStar);
        imgStar.anchor.setTo(0.5, 0.5);
        imgStar.alignIn(bgStar, Phaser.LEFT_CENTER, 25, 0);

        var txtStar = this.game.add.text(0, 0, ''+star, {
            fontSize: '15.88px',
            fontFamily: 'Aachen BT',
            fill: '#FFFFFF',
            fontWeight: 'bold',
            fontStyle: 'normal',
            lineHeight: '19.53px',
            wordWrap: false,
            align: 'center'
        });
        txtStar.anchor.setTo(0.5, 0.5);
        txtStar.alignIn(bgStar, Phaser.CENTER, 0, 0);

        //// Name Student
        var bgName = this.game.add.sprite(0, 0, imgName);
        bgName.anchor.setTo(0.5, 0.5);
        bgName.alignIn(bgStar, Phaser.RIGHT_CENTER, -120, 0);
        var txtName = this.game.add.text(0, 0, ''+name, {
            fontSize: '22px',
            fontFamily: 'Baloo',
            fill: '#FFFFFF',
            fontWeight: 'bold',
            fontStyle: 'normal',
            lineHeight: '35px',
            wordWrap: false,
            align: 'center'
        });
        txtName.anchor.setTo(0.5, 0.5);
        txtName.alignIn(bgName, Phaser.CENTER, 0, 0);

        //// Lesson
        var bgLesson = this.game.add.sprite(0, 0, imgLesson);
        bgLesson.anchor.setTo(0.5, 0.5);
        bgLesson.alignIn(bgStar, Phaser.LEFT_CENTER, -120, 0);
        var txtLesson = this.game.add.text(0, 0, ''+lesson, {
            fontSize: '13.9px',
            fontFamily: 'Aachen',
            fill: '#A64828',
            fontWeight: 'bold',
            fontStyle: 'normal',
            lineHeight: '13.51px',
            wordWrap: false,
            align: 'center'
        });
        txtLesson.anchor.setTo(0.5, 0.5);
        txtLesson.alignIn(bgLesson, Phaser.CENTER, 0, 0);

        //// Tutorial
        var bgTutorial = this.game.add.sprite(0, 0, imgTutorial);
        bgTutorial.anchor.setTo(0.5, 0.5);
        bgTutorial.alignIn(bgToolbar, Phaser.RIGHT_CENTER, -10, 0);
        var txtTutorial = this.game.add.text(0, 0, 'Hướng dẫn', {
            fontSize: '13.9px',
            fontFamily: 'Aachen',
            fill: '#A64828',
            fontWeight: 'bold',
            fontStyle: 'normal',
            lineHeight: '13.51px',
            wordWrap: false,
            align: 'center'
        });
        txtTutorial.anchor.setTo(0.5, 0.5);
        txtTutorial.alignIn(bgTutorial, Phaser.CENTER, 0, 0);

        //// add all to group
        boxToolbar.add(bgToolbar);
        boxToolbar.add(btnBack);
        boxToolbar.add(bgStar);
        boxToolbar.add(imgStar);
        boxToolbar.add(txtStar);
        boxToolbar.add(bgName);
        boxToolbar.add(txtName);
        boxToolbar.add(bgLesson);
        boxToolbar.add(txtLesson);
        boxToolbar.add(bgTutorial);
        boxToolbar.add(txtTutorial);
    }
}