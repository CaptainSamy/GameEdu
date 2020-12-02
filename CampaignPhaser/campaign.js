Campaign = function (campaign) {
    this.campaign = campaign;
}

var campaignJson = {
    "data": {
        "last_campaign_level": 3,
        "campaign_list": [
            {
                "id": 1,
                "title": "Level 1",
                "level": 1,
                "stars_count": 0,
                "last_test_datetime": ""
            },
            {
                "id": 2,
                "title": "Level 2",
                "level": 2,
                "stars_count": 0,
                "last_test_datetime": ""
            },
            {
                "id": 3,
                "title": "Level 3",
                "level": 3,
                "stars_count": 0,
                "last_test_datetime": ""
            },
            {
                "id": 4,
                "title": "Level 4",
                "level": 4,
                "stars_count": 0,
                "last_test_datetime": ""
            },
            {
                "id": 5,
                "title": "Level 5",
                "level": 5,
                "stars_count": 0,
                "last_test_datetime": ""
            },
            {
                "id": 6,
                "title": "Level 6",
                "level": 6,
                "stars_count": 0,
                "last_test_datetime": ""
            },
            {
                "id": 7,
                "title": "Level 7",
                "level": 7,
                "stars_count": 0,
                "last_test_datetime": ""
            },
            {
                "id": 8,
                "title": "Level 8",
                "level": 8,
                "stars_count": 0,
                "last_test_datetime": ""
            },
            {
                "id": 9,
                "title": "Level 9",
                "level": 9,
                "stars_count": 0,
                "last_test_datetime": ""
            },
            {
                "id": 10,
                "title": "Level 10",
                "level": 10,
                "stars_count": 0,
                "last_test_datetime": ""
            }
        ]
    }
};
var lastLevelCampaign = campaignJson.data.last_campaign_level;
var campaignListSize = campaignJson.data.campaign_list.length;
var levelList = campaignJson.data.campaign_list;

var isLocked = true;
var iconGroup;
var iconLevel;
var tvLevel;

Campaign.prototype = {
    preload: function() {
        this.campaign.load.image('campaign_bg', '../assets/campaign_bg.png');
        this.campaign.load.image('level', '../assets/level.png');
        this.campaign.load.image('level_lock', '../assets/level_lock.png');
        this.campaign.load.image('level_gif', '../assets/level_gif.png');
        this.campaign.load.image('level_lock_gif', '../assets/level_lock_gif.png');

        this.campaign.load.image('toolbar_bg', '../assets/toolbar_bg.png');
        this.campaign.load.image('toolbar_btn_back', '../assets/toolbar_btn_back.png');
        this.campaign.load.image('toolbar_bg_name', '../assets/toolbar_bg_name.png');
        this.campaign.load.image('toolbar_bg_star', '../assets/toolbar_bg_star.png');
        this.campaign.load.image('toolbar_bg_learn', '../assets/toolbar_bg_learn.png');
        this.campaign.load.image('toolbar_bg_tutorial', '../assets/toolbar_bg_tutorial.png');
        this.campaign.load.image('toolbar_star', '../assets/toolbar_star.png');
    },
    create: function() {
        this.campaign.stage.backgroundColor = '#5d6479';
        this.campaign.world.setBounds(0, 0, 1484, 904);
        var scrollingMap = this.campaign.add.group();
        scrollingMap.create(0, 0, 'campaign_bg');
        scrollingMap.create(this.createLevelIcons());
        // scroll
        this.dragging = false;
        this.autoScroll = false;
        this.timeConstant = 325;
        campaign.input.onDown.add(beginMove, this);
        campaign.input.onUp.add(endMove, this);
        campaign.input.addMoveCallback(moveCamera, this);

        // Add Toolbar
        this.addToolbar = new Toolbar(
            this.campaign,
            'Nguyễn Đắc Thịnh',
            '100',
            'Bài học hôm nay',
            'toolbar_bg',
            'toolbar_btn_back',
            'toolbar_bg_star',
            'toolbar_star',
            'toolbar_bg_name',
            'toolbar_bg_learn',
            'toolbar_bg_tutorial');
    },
    update: function() {
        if(this.autoScroll && this.amplitude != 0){
            this.elapsed = Date.now() - this.timestamp;
            var delta = -this.amplitude * Math.exp(-this.elapsed / this.timeConstant);
            if ((delta > 0.5 || delta < -0.5)) {
                campaign.camera.y = this.target - delta;
                this.autoScroll = true;
            }
            else {
                this.autoScroll = false;
                campaign.camera.y = this.target;
            }
        }
    },
    createLevelIcons() {
        var xPos = config.GAME_WIDTH/4;
        var yPos = campaignListSize*40;
        for(var i = 0; i < campaignListSize; i++) {
            this.Icons = this.addLevelIcons(xPos, yPos, levelList[i]);
            yPos -= 50;
        }
    },
    addLevelIcons(xPos, yPos, levelListElement) {
        iconGroup = campaign.add.group();
        iconGroup.x = xPos;
        iconGroup.y = yPos;
        if (levelListElement.level <= lastLevelCampaign) {
            isLocked = false;
            if (isLocked == false) {
                if (levelListElement.level % 5 == 0) {
                    iconLevel = this.campaign.add.sprite(xPos+10, yPos, 'level_gif');
                    iconLevel.anchor.setTo(0.5, 0.5);
                    iconGroup.add(iconLevel);
                } else {
                    iconLevel = this.campaign.add.sprite(xPos, yPos, 'level');
                    iconLevel.anchor.setTo(0.5, 0.5);
                    iconGroup.add(iconLevel);
                }

                // di chuyển camera đến level đang chơi
                if (levelListElement.level == lastLevelCampaign) {
                    campaign.camera.y = iconLevel.y;
                }
            }

            // Text
            tvLevel = campaign.add.text(xPos, yPos, ''+levelListElement.level, {
                fontSize: '30px',
                fontFamily: 'Baloo 2',
                fill: '#FFFFFF',
                fontWeight: 'bold',
                fontStyle: 'normal',
                lineHeight: '45px',
                wordWrap: false,
                align: 'center'
            });
            tvLevel.anchor.setTo(0.5, 0.5);
            tvLevel.inputEnabled = true;
            tvLevel.events.onInputDown.add(() => {
                this.onTextLevelClicked(levelListElement.level);
            }, this);
            iconGroup.add(tvLevel);
        } else {
            if (levelListElement.level % 5 ==0) {
                iconLevel = this.campaign.add.sprite(xPos, yPos, 'level_lock_gif');
                iconLevel.anchor.setTo(0.5, 0.5);
                iconGroup.add(iconLevel);
            } else {
                iconLevel = this.campaign.add.sprite(xPos, yPos, 'level_lock');
                iconLevel.anchor.setTo(0.5, 0.5);
                iconGroup.add(iconLevel);
            }
        }
        return iconGroup;
    },
    onTextLevelClicked(level) {
        location.replace(config.HOST+'/GameEdu/JigsawGamePhaser/index.html');
    }
}

function beginMove() {
    this.startY = campaign.input.y;
    this.dragging = true;
    this.timestamp = Date.now();
    this.velocity = this.amplitude = 0
}
function endMove() {
    this.dragging = false;
    this.autoScroll = false;
    if (campaign.input.activePointer.withinGame && (this.velocity > 10 || this.velocity < -10)) {
        this.amplitude = 0.8 * this.velocity;
        this.now = Date.now();
        this.target = Math.round(campaign.camera.y - this.amplitude);
        this.autoScroll = true;
    }
    if(!campaign.input.activePointer.withinGame){
        this.autoScroll = true;
    }
}
function moveCamera(pointer, x, y) {
    if(this.dragging){
        var delta = y - this.startY;
        this.startY = y;
        this.now = Date.now();
        var elapsed = this.now - this.timestamp;
        this.timestamp = this.now;

        var v = 1000 * delta / (1 + elapsed);
        this.velocity = 0.8 * v + 0.2 * this.velocity;

        campaign.camera.y -= delta;
    }
}
