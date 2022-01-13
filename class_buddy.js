
var BuddySprite = function (game, x, y, v) {
    Phaser.Sprite.call(this, game, x * 3, y * 3, v);
    game.add.existing(this);

    game.physics.arcade.enable(this);
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;
    this.animations.add('left', [1, 2, 3, 0], 10, true);
    this.animations.add('right', [4, 5, 6, 7], 10, true);
    this.body.velocity.x = 80;
    this.animations.play('right');
    this.scale.set(2, 2);
    this.anchor.setTo(.5, .5);
    this.body.setSize(16, 15, 1, 3);
};
BuddySprite.prototype = Object.create(Phaser.Sprite.prototype);
BuddySprite.prototype.constructor = BuddySprite;

BuddySprite.prototype.update = function() {
    if (!this.alive) {
        if(this.inCamera == false || this.inWorld == false)
            this.kill();
        return;
    }
    var dir = this.body.velocity.x < 0 ? -1 : 1;
    var tile = map.getTile(Math.floor((this.x  + dir*10) / 48), Math.floor(this.y / 48 + 1));
    if (tile && tile.collideUp == false) {
        if (dir == 1) {
            this.body.velocity.x = -80;
            this.animations.play('left');
        }
        else {
            this.body.velocity.x = +80;
            this.animations.play('right');
        }
    }
    if (this.body.blocked.right == true) {
        this.body.velocity.x = -80;
        this.animations.play('left');
    }
    else if (this.body.blocked.left == true) {
        this.body.velocity.x = 80;
        this.animations.play('right');
    }

};

BuddySprite.prototype.touched = function(player)
{
    if(!player.alive || !this.alive)
        return;
    console.log(player.y, this.y, player.body.velocity.y);
    if(player.y < this.y && player.body.velocity.y > 0)
    {
        if(player.body.velocity.y > 0) {
            player.body.velocity.y = -220;
            this.alive = false;
            this.body.velocity.x = 0;
            this.scale.y = -2;
            this.body.collideWorldBounds = false;
        }
    }
    else
        player.die();

};