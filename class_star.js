var first_star = true;
var StarSprite = function (game, x, y, v) {
    Phaser.Sprite.call(this, game, x * 3, y * 3, v);
    game.add.existing(this);
    game.physics.arcade.enable(this);

    this.smoothed = false;
    this.scale.x = 3;
    this.scale.y = 3;
    score_max += 10;

    if(first_star && level == 0)
    {
        console.log("First start", x, y);
        this.text = game.add.sprite(x*3-30, y*3-70, "TextCollectMe");
        this.text.scale.set(3);
        this.text.alpha = 0;
        tween = game.add.tween(this.text).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        first_star = false;
    }

};
StarSprite.prototype = Object.create(Phaser.Sprite.prototype);
StarSprite.prototype.constructor = StarSprite;

StarSprite.prototype.touched = function(player) {
    if(!this.alive)
        return;
    this.alive = false;
    player.alive = true;
    player.turn();
    //player.body.gravity.y = -player.body.gravity.y;
    //player.ydir = -player.ydir;
    //player.scale.y = -player.scale.y;
    /*
    console.log("#--------", this.body.x, this.x, game.camera.x);
    this.x = this.x - game.camera.x;
    console.log("#--------", this.body.x, this.x);
    this.y = this.y - game.camera.y;
    this.fixedToCamera = true;
    console.log("#--------", this.body.x, this.x);
    this.body.x = 16;
    this.x = 16;
    */
    star_im = game.add.image(this.x - game.camera.x, this.y - game.camera.y, "star");
    star_im.fixedToCamera = true;
    star_im.scale.set(3);
    tween = game.add.tween(star_im.cameraOffset).to( { y: scoreText.y, x: scoreText.x}, 500, Phaser.Easing.Quadratic.In, true);
    tween = game.add.tween(star_im).to( { alpha: 0}, 500, Phaser.Easing.Quadratic.In, true);
    tween.onComplete.addOnce(function()
    {   star_im.kill();
        tween = game.add.tween(scoreText.scale).to( { x: 1.5, y: 1.5}, 200, Phaser.Easing.Quadratic.In, true);
        tween.onComplete.addOnce(function () {
            tween2 = game.add.tween(scoreText.scale).to({ x: 1, y: 1}, 200, Phaser.Easing.Quadratic.Out, true);
            score += 10;
            scoreText.text = score;
            if (score == score_max)
                game.state.start('win');
        });

        //me.scoreLabelTween = me.add.tween(me.scoreLabel.scale).to({ x: 1.5, y: 1.5}, 200, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 200, Phaser.Easing.Linear.In);
    });
    if(this.text)
        this.text.kill();
    // Removes the star from the screen
    this.kill();

    //  Add and update the score
    /*
    score += 10;
    scoreText.text = 'Score: ' + score;
    if (score == score_max)
        game.state.start('win');
       */
};