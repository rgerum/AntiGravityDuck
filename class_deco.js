
var DecoSprite = function (game, x, y, v) {
    Phaser.Sprite.call(this, game, x * 3, y * 3, v);
    game.add.existing(this);
    this.scale.set(3);
};
DecoSprite.prototype = Object.create(Phaser.Sprite.prototype);
DecoSprite.prototype.constructor = DecoSprite;
