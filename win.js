var winState = {

    create: function() {	
		
	//var winLabel = game.add.text(80, 80, 'Level complete!',
	//							{font: '50px Arial', fill: '#FFFFFF' });
    //winLabel.x = game.width/2-winLabel.width/2;
    //winLabel.y = game.height/3-winLabel.height/2;

    var winLabel = game.add.sprite(80, 120, 'TextLevelComplete');
    winLabel.smoothed = false;
    winLabel.scale.set(3, 3);

    winLabel.x = game.width/2-winLabel.width/2;
    winLabel.y = game.height/3-winLabel.height/2;

		// We give the player instructions on how to restart the game
    if(this.game.device.desktop) {
        var text = 'press the "SPACE" to continue';
    }
    else
        var text = 'tab to continue';
	var startLabel = game.add.text(80, game.height-80,
								   text,
								   {font: '25px Arial', fill: '#ffffff' });
        startLabel.x = game.width/2-startLabel.width/2;
        startLabel.y = game.height/3*2-startLabel.height/2;

        // We define the wkey as Phaser.Keyboard.W so that we can act
        // when the player presses it
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        // When the player presses the W key, we call the restart function
        wkey.onDown.addOnce(this.restart, this);
        game.input.onTap.add(this.restart, this);

        game.cache.removeTilemap('map');
        level += 1;
        game.load.tilemap('map', 'assets/'+levels[level], null, Phaser.Tilemap.TILED_JSON);
        game.load.start();
    },
    
    // The restart function calls the menu state    
    restart: function () {

        game.state.start('play');
    }, 	
};
