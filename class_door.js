var door_dir = 1;
var first_door = true;
var DoorSprite = function (game, x, y, v) {
    Phaser.Sprite.call(this, game, x * 3, y * 3, "MyTiles", door_dir == 1 ? 31 : 30);
    console.log(door_dir, door_dir == 1 ? 31 : 30);
    game.add.existing(this);
    game.physics.arcade.enable(this);

    this.scale.x = 3;
    this.scale.y = 3;
    this.anchor.setTo(.5, .5);
    this.x += this.width/2;
    this.y += this.height/2;
    this.ydir = door_dir;

    if(first_door && door_dir == -1 && level == 1)
    {
        console.log("First door", x, y);
        this.text = game.add.sprite(x*3-10, y*3-70, "TextEnterMe");
        this.text.scale.set(3);
        this.text.alpha = 0;
        tween = game.add.tween(this.text).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        first_door = false;
    }

};
DoorSprite.prototype = Object.create(Phaser.Sprite.prototype);
DoorSprite.prototype.constructor = DoorSprite;

DoorSprite.prototype.touched = function(player) {
    if(player.in_air || player.blocked)
        return;
    if((controls.down && player.ydir == 1 && this.ydir == -1) || (controls.up && player.ydir == -1 && this.ydir == 1))
    {

        for(var i = 0; i < doors.length; i++)
        {
            var other_door = doors.getChildAt(i);

            if(other_door != this)
            {
                if(this.text)
                    this.text.kill();
                controls.dir_up = false;
                controls.dir_down = false;
                //player.blocked = true;
                //player.target = {x: this.body.x+8, y: this.body.y};
                //player.target_reached.addOnce(function() {player.animations.play('cave');});
                player.animations.play('cave');
                player.blocked = true;
                enter = function() {
                    console.log(player.y, (Math.floor(player.y/(16*3)))*(16*3));
                    player.x = other_door.body.x+16*3/2+5;
                    player.y = other_door.body.y+16*3/2;
                    //player.y = (Math.floor(player.y/(16*3)))*(16*3)+player.height/2;
                    if(other_door.ydir == -1)
                        player.y = (Math.floor(player.y/(16*3)))*(16*3)+30;
                    else
                        player.y = (Math.floor(player.y/(16*3)))*(16*3)+18;
                    player.body.velocity.y = 0;
                    //player.body.gravity.y = 0;
                    console.log("turn", player.ydir);

                    player.turn();
                    console.log("turn2", player.ydir);
                    exited = function () {
                        console.log("Exited");
                        player.animations.play("standing");
                        controls.dir_up = false;
                        controls.dir_down = false;
                        player.blocked = false;
                    };
                    player.animations.getAnimation("cave2").onComplete.addOnce(exited);
                    console.log(player.animations.currentAnim);
                    player.animations.play('cave2');
                    console.log(player.animations.currentAnim);
                };

                player.animations.getAnimation("cave").onComplete.addOnce(enter);

                break;
            }
        }
        console.log("down");
    }
    console.log("test");
    /*
    player.alive = true;
    player.body.gravity.y = -player.body.gravity.y;
    player.ydir = -player.ydir;
    player.scale.y = -player.scale.y;
    // Removes the star from the screen
    this.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;
    if (score == score_max)
        game.state.start('win');
        */

};