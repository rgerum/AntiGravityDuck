
var PlayerSprite = function (game, x, y) {
    Phaser.Sprite.call(this, game, x * 3, y * 3, "chick");
    game.add.existing(this);
    game.physics.arcade.enable(this);

    //PlayerSpriteInit(this, game);
    this.init();
};

PlayerSprite.prototype = Object.create(Phaser.Sprite.prototype);
PlayerSprite.prototype.constructor = PlayerSprite;

PlayerSprite.prototype.init = function() {
    this.anchor.setTo(.5, .5);
    this.body.setSize(20, 14, 0, 5);

    this.body.gravity.y = 300;
    this.checkWorldBounds = true;
    this.smoothed = false;
    this.scale.x = 2;
    this.scale.y = 2;
    this.events.onOutOfBounds.add(this.die, this);

    //  Our two animations, walking left and right.
    this.animations.add('standing', [0], 10, true);
    this.animations.add('left', [1, 2, 3, 4], 10, true);
    this.animations.add('right', [4, 3, 2, 1], 10, true);
    this.animations.add('jump', [3], 10, true);
    this.animations.add('dead', [5], 0, true);
    this.animations.add('border', [6, 7], 5, true);
    this.animations.add('cave', [10, 11, 12], 10, false);
    this.animations.add('cave2', [17, 16, 15], 10, false);

    this.dir = -1;
    this.ydir = 1;
    this.target = null;
    this.target_reached = new Phaser.Signal();

    this.walking = 0;
    this.blocked = false;
};

get_solid = function(x, y, ydir) {
    var tile = map.getTile(Math.floor(x / 48), Math.floor(y / 48) + 1*ydir);
    if (tile && ((tile.collideUp == true && ydir == 1) || (tile.collideDown == true && ydir == -1))) {
        return true;
    }
    return false;
};

PlayerSprite.prototype.die = function () {
    if(this.alive == false)
        return;
    game.camera.follow(null);
    this.body.velocity.y = -350*this.ydir;
    this.alive = false;
    this.animations.play('dead');
};

PlayerSprite.prototype.turn = function () {
    this.body.gravity.y = -this.body.gravity.y;
    this.ydir = -this.ydir;
    this.scale.y = -this.scale.y;
    //scaley = -this.scale.y;
    //tween = game.add.tween(this.scale).to( { y:  scaley}, 240, Phaser.Easing.Bounce.Out, true);
    console.log("##########################", this.body.gravity.y);
};

PlayerSprite.prototype.update = function() {
    //  Reset the players velocity (movement)
    if (this.body.velocity.y < -300)
        this.body.velocity.y = -300;
    if (this.body.velocity.y > 300)
        this.body.velocity.y = 300;

    if (!this.alive) {
        if (this.inCamera == false || this.inWorld == false)
            game.state.start('dead');
        return;
    }

    if(this.blocked && !this.target)
        return;

    var in_air = true;
    if (this.body.blocked.down == true && this.body.gravity.y > 0) {
        in_air = false;
    }
    else if (this.body.blocked.up == true && this.body.gravity.y < 0) {
        in_air = false;
    }
    at_border = !get_solid(this.x + this.dir * 10, this.y, this.ydir);
    over_border = !get_solid(this.x, this.y, this.ydir);
    if (!in_air && this.in_air) {
        if (this.walking == 1)
            this.animations.play('right');
        else if (this.walking == -1)
            this.animations.play('left');
        else
            this.animations.play('standing');
    }
    if (in_air && !this.in_air) {
        this.animations.play('jump');
    }
    if (at_border && !this.at_border && !in_air) {
        this.animations.play('border');
    }

    if (this.target) {
        if(this.target.x < this.body.x-5) {
            this.walking = -1;
        }
        else if(this.target.x > this.body.x+5) {
            this.walking = 1;
        }
        else {
            this.body.x = this.target.x;
            this.walking = 0;
            this.target = null;
            this.target_reached.dispatch();
        }
    }
    else {
        if (this.walking == 0) {
            if (controls.right) {
                this.walking = 1;
                this.body.velocity.x = 150;
                this.dir = 1;

                if (!in_air && !at_border)
                    this.animations.play('right');
                this.scale.x = -2;
            }
            else if (controls.left) {
                this.walking = -1;
                this.body.velocity.x = -150;
                this.dir = -1;

                if (!in_air && !at_border)
                    this.animations.play('left');
                this.scale.x = 2;
            }
        }
        else if ((this.walking == 1 && !controls.right) || (this.walking == -1 && !controls.left)) {
            this.walking = 0;
            this.body.velocity.x = 0;
            if (!in_air && !at_border)
                this.animations.play('standing');
        }
    }
    if(over_border && !in_air && this.walking == 0)
    {
        this.body.velocity.x = 150 * this.dir;
    }
    else
        this.body.velocity.x = 150 * this.walking;
    if(!in_air && ((controls.up && this.ydir == 1) || (controls.down && this.ydir == -1))) {
        this.animations.play('jump');
        this.body.velocity.y = -180 * this.ydir;
        controls.dir_up = false;
        controls.dir_down = false;
    }
    this.in_air = in_air;
    this.at_border = at_border;
};