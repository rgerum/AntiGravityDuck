var player;
var layer;
var map;
var cursors;

var score = 0;
var score_max = 0;


Control = function () {

    //var Swipe = require('phaser-swipe');

    // in create
    this.swipe = new Swipe(game);

    //this.cursors = game.input.keyboard.createCursorKeys();
    t = this;
    //this.buttonleft = game.add.button(0, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
    //this.buttonleft.fixedToCamera = true;
    this.reset = function() {
        t.dir_left = false;
        t.dir_right = false;
        t.dir_up = false;
        t.dir_down = false;
    };
    this.reset();
    self = this;
    var down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    down.onDown.add(function () { self.dir_down = true; });
    down.onUp.add(function () { self.dir_down = false; });
    var up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    up.onDown.add(function () { self.dir_up = true; });
    up.onUp.add(function () { self.dir_up = false; });
    var left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    left.onDown.add(function () { self.dir_left = true; });
    left.onUp.add(function () { self.dir_left = false; });
    var right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    right.onDown.add(function () { self.dir_right = true; });
    right.onUp.add(function () { self.dir_right = false; });
    /*
    this.buttonleft.events.onInputOver.add(function(){t.reset(); t.dir_left=true;});
    this.buttonleft.events.onInputOut.add(function(){t.dir_left=false;});
    this.buttonleft.events.onInputDown.add(function(){t.reset(); t.dir_left=true;});
    this.buttonleft.events.onInputUp.add(function(){t.dir_left=false;});
    this.buttonleft.scale.set(3);

    this.buttonright = game.add.button( (32+64)*3, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
    this.buttonright.fixedToCamera = true;
    this.buttonright.events.onInputOver.add(function(){t.reset(); t.dir_right=true;});
    this.buttonright.events.onInputOut.add(function(){t.dir_right=false;});
    this.buttonright.events.onInputDown.add(function(){t.reset(); t.dir_right=true;});
    this.buttonright.events.onInputUp.add(function(){t.dir_right=false;});
    this.buttonright.scale.set(3);

    this.buttonupright = game.add.button(64*3+32*3, 472-48*3, 'buttondiagonal', null, this, 3, 1, 3, 1);
    this.buttonupright.fixedToCamera = true;
    this.buttonupright.events.onInputOver.add(function(){t.reset(); t.dir_right=true;t.dir_up=true;});
    this.buttonupright.events.onInputOut.add(function(){t.dir_right=false;t.dir_up=false;});
    this.buttonupright.events.onInputDown.add(function(){t.reset(); t.dir_right=true;t.dir_up=true;});
    this.buttonupright.events.onInputUp.add(function(){t.dir_right=false;t.dir_up=false;});
    this.buttonupright.scale.set(3);

    this.buttonup = game.add.button( (64)*3, 472-64*3, 'buttonvertical', null, this, 0, 1, 0, 1);
    this.buttonup.fixedToCamera = true;
    this.buttonup.events.onInputOver.add(function(){t.reset(); t.dir_up=true;});
    this.buttonup.events.onInputOut.add(function(){t.dir_up=false;});
    this.buttonup.events.onInputDown.add(function(){t.reset(); t.dir_up=true;});
    this.buttonup.events.onInputUp.add(function(){t.dir_up=false;});
    this.buttonup.scale.set(3);

    this.buttonupleft = game.add.button((64-48)*3, 472-48*3, 'buttondiagonal', null, this, 2, 0, 2, 0);
    this.buttonupleft.fixedToCamera = true;
    this.buttonupleft.events.onInputOver.add(function(){t.reset(); t.dir_left=true;t.dir_up=true; });
    this.buttonupleft.events.onInputOut.add(function(){t.dir_left=false;t.dir_up=false;});
    this.buttonupleft.events.onInputDown.add(function(){t.reset(); t.dir_left=true;t.dir_up=true;});
    this.buttonupleft.events.onInputUp.add(function(){t.dir_left=false;t.dir_up=false;});
    this.buttonupleft.scale.set(3);

    this.buttonbottomright = game.add.button(64*3+32*3, 472+32*3, 'buttondiagonal', null, this, 7, 5, 7, 5);
    this.buttonbottomright.fixedToCamera = true;
    this.buttonbottomright.events.onInputOver.add(function(){t.reset(); t.dir_right=true;t.dir_down=true;});
    this.buttonbottomright.events.onInputOut.add(function(){t.dir_right=false;t.dir_down=false;});
    this.buttonbottomright.events.onInputDown.add(function(){t.reset(); t.dir_right=true;t.dir_down=true;});
    this.buttonbottomright.events.onInputUp.add(function(){t.dir_right=false;t.dir_down=false;});
    this.buttonbottomright.scale.set(3);

    this.buttondown = game.add.button( (64)*3, 472+32*3, 'buttonvertical', null, this, 0, 1, 0, 1);
    this.buttondown.fixedToCamera = true;
    this.buttondown.events.onInputOver.add(function(){t.reset(); t.dir_down=true;});
    this.buttondown.events.onInputOut.add(function(){t.dir_down=false;});
    this.buttondown.events.onInputDown.add(function(){t.reset(); t.dir_down=true;});
    this.buttondown.events.onInputUp.add(function(){t.dir_down=false;});
    this.buttondown.scale.set(3);

    this.buttonbottomleft = game.add.button( (64-48)*3, 472+32*3, 'buttondiagonal', null, this, 6, 4, 6, 4);
    this.buttonbottomleft.fixedToCamera = true;
    this.buttonbottomleft.events.onInputOver.add(function(){t.reset(); t.dir_left=true;t.dir_down=true;});
    this.buttonbottomleft.events.onInputOut.add(function(){t.dir_left=false;t.dir_down=false;});
    this.buttonbottomleft.events.onInputDown.add(function(){t.reset(); t.dir_left=true;t.dir_down=true;});
    this.buttonbottomleft.events.onInputUp.add(function(){t.dir_left=false;t.dir_down=false;});
    this.buttonbottomleft.scale.set(3);
    */

    Object.defineProperty(this, "left", {
        get: function left() {
            //if(this.cursors.left.isDown)
            //    return true;
            return this.dir_left;
            // code
        }
    });

    Object.defineProperty(this, "right", {
        get: function right() {
            //if(this.cursors.right.isDown)
            //    return true;;
            return this.dir_right;
            // code
        }
    });

    Object.defineProperty(this, "up", {
        get: function up() {
            //if(this.cursors.up.isDown)
            //    return true;
            return this.dir_up;
            // code
        }
    });

    Object.defineProperty(this, "down", {
        get: function up() {
            //if(this.cursors.down.isDown)
            //    return true;
            return this.dir_down;
            // code
        }
    });

    //game.input.onTap.add(this.reset, this);

};
Control.prototype.constructor = Control;


Control.prototype.reset = function() {
    t.dir_left = false;
    t.dir_right = false;
    t.dir_up = false;
    t.dir_down = false;
};

Control.prototype.update = function () {

    // in update
    var direction = this.swipe.check();

    if (direction!==null) {
        console.log(direction);
        // direction= { x: x, y: y, direction: direction }
        this.reset();
        switch(direction.direction) {
            case this.swipe.DIRECTION_LEFT: // do something
                this.dir_left = true;
                break;
            case this.swipe.DIRECTION_RIGHT:
                this.dir_right = true;
                break;
            case this.swipe.DIRECTION_UP:
                this.dir_up = true;
                break;
            case this.swipe.DIRECTION_DOWN:
                this.dir_down = true;
                break;
            case this.swipe.DIRECTION_UP_LEFT:
                this.dir_up = true;
                this.dir_left = true;
                break;
            case this.swipe.DIRECTION_UP_RIGHT:
                this.dir_up = true;
                this.dir_right = true;
                break;
            case this.swipe.DIRECTION_DOWN_LEFT:
                this.dir_down = true;
                this.dir_left = true;
                break;
            case this.swipe.DIRECTION_DOWN_RIGHT:
                this.dir_right = true;
                this.dir_down = true;
                break;
        }
    }
};

var playState = {

    create: function () {

        // reset score
        score = 0;
        score_max = 0;

        //  A simple background for our game
        var sky = game.add.sprite(0, 0, 'sky');
        sky.fixedToCamera = true;

        //game.camera.bounds = 0;


        // create map
        map = game.add.tilemap('map');
        map.addTilesetImage('MyTiles');
        layer = map.createLayer('Collision');
        layer.setScale(3);
        layer.resizeWorld();
        layer.alpha = 0;
        layerB = map.createLayer('Kachelebene 3');
        layerB.setScale(3);
        layerB.resizeWorld();
        layerB.z = 3;
        layerD = map.createLayer('World');
        layerD.setScale(3);
        layerD.resizeWorld();
        layerD.z = 4;
        init_collisions(map, layer);

        sky.width = game.width < game.world.width ? game.width  : game.world.width;
        var needed_height = game.height < game.world.height ? game.height  : game.world.height;
        sky.height = needed_height;//sky.height < needed_height ? needed_height : sky.height;
        game.world.x = 100;

        // Spikes
        map.setTileIndexCallback(44, this.spikes, this);
        map.setTileIndexCallback(53, this.spikes, this);

        group_touch = game.add.group();
        group_collide = game.add.group(group_touch, "collide");

        //  Finally some stars to collect
        stars = game.add.group(group_touch, "stars");
        map.createFromObjects("Stars", 24, "star", 0, true, false, stars, StarSprite);

        buddies = game.add.group(group_collide, "buddies");
        map.createFromObjects("Stars", 29, "buddy", 0, true, false, buddies, BuddySprite);

        doors = game.add.group(group_collide, "doors");
        door_dir = 1;
        map.createFromObjects("Stars", 32, "door", 0, true, false, doors, DoorSprite);
        door_dir = -1;
        map.createFromObjects("Stars", 31, "door", 0, true, false, doors, DoorSprite);

        player = new PlayerSprite(game, 32, 0);
        player.body.z = 10;

        map.createFromObjects("Stars", 201, "tree", 0, true, true, game.world, DecoSprite);
        map.createFromObjects("Stars", 202, "grass", 0, true, true, game.world, DecoSprite);
        map.createFromObjects("Stars", 203, "shrub", 0, true, true, game.world, DecoSprite);
        map.createFromObjects("Stars", 204, "flower", 0, true, true, game.world, DecoSprite);

        for (var i = 0; i < map.objects["Stars"].length; i++) {
            obj = map.objects["Stars"][i];
            if (obj.gid == 23) {
                player.x = obj.x * 3;
                player.y = obj.y * 3 - 5;
            }
        }

        //  Our controls.

        game.camera.follow(player);
        game.camera.setPosition(player.body.x, player.body.y);
        game.camera.lerp.set(0.1);

        scoreText0 = game.add.text(16, 16, 'Stars: ', {fontSize: '32px', fill: '#f3dd60'});
        scoreText0.fixedToCamera = true;

        scoreText = game.add.text(scoreText0.width+16, 16, '0', {fontSize: '32px', fill: '#f3dd60'});
        scoreText.x = scoreText.x + scoreText.width/2;
        scoreText.y = scoreText.y + scoreText.height/2;
        scoreText.anchor.set(0.5, 0.5);
        scoreText.fixedToCamera = true;

        pause_label = game.add.text(game.width - 100, 20, 'Restart', {font: '24px Arial', fill: '#FFF'});
        pause_label.inputEnabled = true;
        pause_label.fixedToCamera = true;
        pause_label.events.onInputUp.add(function () {
            game.state.start('menu');
        });


        //cursors = game.input.keyboard.createCursorKeys();
        controls = new Control();

    },

    spikes: function () {
        if (player.alive) {
            var tile = map.getTile(Math.floor(player.x / 48), Math.floor(player.y / 48));
            if (tile != null && ((tile.index == 44 && player.body.velocity.y > -1) || (tile.index == 53 && player.body.velocity.y < 1))) {
                player.die();
            }
        }
    },

    touch: function(group) {
        for(var i = 0; i < group.length; i++)
        {
            this.touch(group.getChildAt(i));
        }
        game.physics.arcade.overlap(player, group, function(player, obj) { obj.touched(player); }, null, this);
    },

    collide: function (group) {
        for(var i = 0; i < group.length; i++)
        {
            this.collide(group.getChildAt(i));
        }
        if(!(group.length >= 1) && group.alive)
            game.physics.arcade.collide(group, layer);
    },

    update: function () {
        controls.update();
        if (player.alive) {
            game.physics.arcade.collide(player, layer);
            this.touch(group_touch);
        }
        this.collide(group_collide, layer);

        //scoreText.text = 'Score: ' + score;
    },

};
