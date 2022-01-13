var menuState = {
  
    create: function () {
		//  A simple background for our game
		var sky = game.add.sprite(0, 0, 'sky');
        sky.fixedToCamera = true;
        sky.width = game.width;

        sky.width = game.width;
        sky.height = sky.height < game.height ? game.height : sky.height;

        var map = [];
        map.push(game.add.tileSprite(0, 0, game.width/3, 16, 'MyTiles', 51));
        map.push(game.add.tileSprite(0, 16*3, game.width/3, 16, 'MyTiles', 61));
        bridge_start = game.width/3*2;
        plant_start = game.width/4;
        map.push(game.add.tileSprite(bridge_start+16*3*3, game.height-16*3*2, game.width-(bridge_start+16*3*3), 16, 'MyTiles', 41));
        map.push(game.add.tileSprite(bridge_start+16*3*4, game.height-16*3*1, game.width-(bridge_start+16*3*3), 16, 'MyTiles', 51));
        map.push(game.add.tileSprite(0, game.height-16*3*2, bridge_start/3, 16, 'MyTiles', 41));
        map.push(game.add.tileSprite(0, game.height-16*3*1, bridge_start/3-16, 16, 'MyTiles', 51));

        map.push(game.add.tileSprite(bridge_start, game.height-16*3*2, 16, 16, 'MyTiles', 70));
        map.push(game.add.tileSprite(bridge_start-16*3, game.height-16*3*1, 16, 16, 'MyTiles', 45));
        map.push(game.add.tileSprite(bridge_start+16*3, game.height-16*3*2, 16, 16, 'MyTiles', 71));
        map.push(game.add.tileSprite(bridge_start+16*3*2, game.height-16*3*2, 16, 16, 'MyTiles', 72));
        map.push(game.add.tileSprite(bridge_start+16*3*3, game.height-16*3*1, 16, 16, 'MyTiles', 44));

        map.push(game.add.tileSprite(plant_start, game.height-16*3*3, 16, 16, 'MyTiles', 24));
        for(var i = 0; i < map.length; i++)
            map[i].scale.set(3);
		
		// Here we display the name of the game. When defining text, the
		// first two parameters are x and y positional values, then the
		// actual text, and then the 'font' defines the font (of course)
		// and 'fill' refers to the font color.
        //var nameLabel = game.add.text(80, 120, 'Anti-Gravity Duck',
        //                            { font: '50px Arial', fill: '#ffffff' });

        var text = game.add.sprite(80, 120, 'TextAntiGravityDuck');
        text.smoothed = false;
        text.scale.set(4, 4);
        
        // We give the player instructions on how to start the game
        if(this.game.device.desktop) {
            var text = 'press the "SPACE" key to start';
        }
        else
            var text = 'tab to start';
        var startLabel = game.add.text(plant_start+16*3*1.5, game.world.height-80-16*3,
            text,
                                       {font: '25px Arial', fill: '#000' });
		
		startLabel.alpha = 0;
		tween = game.add.tween(startLabel).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        
        // We define the wkey as Phaser.Keyboard.W so that we can act
        // when the player presses it
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        // When the player presses the W key, we call the start function
        wkey.onDown.addOnce(this.start, this);
        game.input.onTap.add(this.start, this);
    },
    
    // The start function calls the play state    
    start: function () {
        game.state.start('play');    
    },    
};
