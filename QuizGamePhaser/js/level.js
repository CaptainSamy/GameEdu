Level = function (game) {
    this.game = game;
}
var QA_JSON = {
    "levels": [
        {
            "questions": [
                {
                    "question": "Quả gì như chú heo con\nDa xanh ruột đỏ ngọt ngon khi già\nĂn rồi nhớ lắm người xa\nCó chàng hoàng tử tìm ra giống này ?",
                    "wrong_answer": [
                        "Quả mận",
                        "Quả xoài",
                        "Quả cam"
                    ],
                    "correct_answer": "Quả dưa hấu",
                },
                {
                    "question": "Điền từ còn thiếu vào câu thành ngữ sau: Vắng chủ nhà, gà...",
                    "wrong_answer": [
                        "Mọc đuôi tôm",
                        "Ăn trộm tôm",
                        "Mổ chết tôm"
                    ],
                    "correct_answer": "Vọc niêu tôm"
                },
                {
                    "question": "Loại củ nào giúp vết thương mau lành, không để lại sẹo?",
                    "wrong_answer": [
                        "Gừng",
                        "Giềng",
                        "Hành"
                    ],
                    "correct_answer": "Nghệ"
                },
                {
                    "question": "World Cup 2022 sẽ được tổ chức ở quốc gia nào?",
                    "wrong_answer": [
                        "Uruguay",
                        "Argentina",
                        "Brazil"
                    ],
                    "correct_answer": "Qatar"
                },
                {
                    "question": "Theo một câu ca dao xưa thì \"Một chục quả hồng nuốt…\" ai?",
                    "wrong_answer": [
                        "Lão chín mươi",
                        "Lão sáu mươi",
                        "Lão bảy mươi"
                    ],
                    "correct_answer": "Lão tám mươi"
                },
                {
                    "question": "Quả gì bỏ ngoài ăn trong, ăn ngoài bỏ trong?",
                    "wrong_answer": [
                        "Quả dưa hấu",
                        "Quả cam",
                        "Bắp cải"
                    ],
                    "correct_answer": "Bắp ngô"
                },
                {
                    "question": "3 + 4 x 4 = ?",
                    "wrong_answer": [
                        "28",
                        "20",
                        "24"
                    ],
                    "correct_answer": "19"
                }
            ]
        }
    ]
}

Level.prototype = {
    init: function () {
        this.levelIndex = 0;
        this.currentQuestionIndex = 0;
    },
    preload: function () {
        this.load.image('qa_1', '../assets/qa.png');
        this.load.image('circle1', '../assets/circle1.png');
        this.load.image('circle', '../assets/circle.png');
    },
    create: function () {
        var dataQA = QA_JSON;
        var btnGroup = this.createButtons();
        this.game.stage.backgroundColor = '#8f8686';
    },
    createButtons() {
        this.groupButtons = this.game.add.group();
        this.createButtonLevel(0, 0);
        return this.groupButtons;
    },
    createButtonLevel(index, currentQuestion) {
        var key = 'qa_'+(index+1);
        var context = {
            level: index,
            current: currentQuestion,
            game: this.game
        };
        var button = this.game.add.button(config.GAME_WIDTH/2 , config.GAME_HEIGHT/2, key, this.onBtnLevelClicked, context, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);
        this.groupButtons.add(button);
    },
    onBtnLevelClicked() {
        this.game.state.start('question', true, false, this.level, this.current);
        console.log(this.level);
        console.log(this.current);
    }
}