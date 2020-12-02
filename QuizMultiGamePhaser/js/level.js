Level = function (game) {
    this.game = game;
}

var QA_Multi_JSON = {
    "levels": [
        {
            "questions": [
                {
                    "threads": "Cho một hình chữ nhật có chiều dài bằng 5cm, chiều rộng bằng 3cm.",
                    "question_list": [
                        {
                            "question": "Diện tích hình chữ nhật này bằng?",
                            "wrong_answer": [
                                "16",
                                "25",
                                "9"
                            ],
                            "correct_answer": "15"
                        },
                        {
                            "question": "Chu vi hình chữ nhật này bằng?",
                            "wrong_answer": [
                                "4",
                                "10",
                                "15"
                            ],
                            "correct_answer": "16"
                        },
                        {
                            "question": "Bình phương đường chéo hình chữ nhật này bằng?",
                            "wrong_answer": [
                                "25",
                                "32",
                                "9"
                            ],
                            "correct_answer": "34"
                        }
                    ]
                },
                {
                    "threads": "Nam có 1 rổ gồm 8 quả táo, 9 quả cam và 12 quả lê. ",
                    "question_list": [
                        {
                            "question": "Tổng số quả có trong rổ của Nam là bao nhiêu?",
                            "wrong_answer": [
                                "28",
                                "27",
                                "30"
                            ],
                            "correct_answer": "29"
                        },
                        {
                            "question": "Khi Nam cho Bà 5 quả táo, thì số táo còn lại trong rổ là bao nhiêu?",
                            "wrong_answer": [
                                "2",
                                "4",
                                "5"
                            ],
                            "correct_answer": "3"
                        },
                        {
                            "question": "Sau khi cho Bà 5 quả táo, thì số quả còn lại trong rổ của Nam là?",
                            "wrong_answer": [
                                "21",
                                "23",
                                "25"
                            ],
                            "correct_answer": "24"
                        }
                    ]
                },
                {
                    "threads": "Một tứ giác có 1 góc vuông.",
                    "question_list": [
                        {
                            "question": "Và có 1 cặp cạng đối song song và bằng nhau thì tứ giác đó là hình gì?",
                            "wrong_answer": [
                                "Hình thang vuông",
                                "Hình vuông",
                                "Hình bình hành"
                            ],
                            "correct_answer": "Hình chữ nhật"
                        },
                        {
                            "question": "Và có 2 cặp cạnh đối song song và bằng nhau thì tứ giác đó là hình gì?",
                            "wrong_answer": [
                                "Hình thoi",
                                "Hình chữ nhật",
                                "Hình bình hành"
                            ],
                            "correct_answer": "Hình vuông"
                        },
                        {
                            "question": "Và có 1 cặp cạnh đối song song thì tứ giác đó là hình gì?",
                            "wrong_answer": [
                                "Hình chữ nhật",
                                "Hình vuông",
                                "Hình thoi"
                            ],
                            "correct_answer": "Hình thang vuông"
                        }
                    ]
                }
            ]
        }
    ]
}

Level.prototype = {
    init: function () {
        this.levelIndex = 0;
        this.threadIndex = 0;
        this.currentQuestion = 0;
    },
    preload: function () {
        this.load.image('qa_multi_1', '../assets/qa_multi.png');
        this.load.image('circle1', '../assets/circle1.png');
        this.load.image('circle', '../assets/circle.png');
    },
    create: function () {
        var data = QA_Multi_JSON;
        var btnGroup = this.createButtons();
        this.game.stage.backgroundColor = '#8f8686';
    },
    createButtons() {
        this.groupButtons = this.game.add.group();
        this.createButtonLevel(0, 0, 0);
        return this.groupButtons;
    },
    createButtonLevel(index, threadIndex, currentQuestion) {
        var key = 'qa_multi_'+(index+1);
        var context = {
            level: index,
            thread: threadIndex,
            currentQuestion: currentQuestion,
            game: this.game
        }
        var button = this.game.add.button(config.GAME_WIDTH/2, config.GAME_HEIGHT/2, key, this.onBtnLevelClicked, context, 2, 1, 0);
        button.anchor.set(0.5, 0.5);
        this.groupButtons.add(button);
    },
    onBtnLevelClicked() {
        this.game.state.start('question', true, false, this.level, this.thread, this.currentQuestion);
    }
}