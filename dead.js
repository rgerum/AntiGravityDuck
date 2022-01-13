var deadState = {

    create: function() {	
		
	//var winLabel = game.add.text(80, 80, 'Duck is dead :-(',
	//							{font: '50px Arial', fill: '#FFFFFF' });
    //winLabel.x = game.width/2-winLabel.width/2;
    //winLabel.y = game.height/3-winLabel.height/2;

        var winLabel = game.add.sprite(80, 120, 'TextDuckDead');
        winLabel.smoothed = false;
        winLabel.scale.set(3, 3);

        winLabel.x = game.width/2-winLabel.width/2;
        winLabel.y = game.height/3-winLabel.height/2;


        if(this.game.device.desktop) {
            var text = 'press the "SPACE" to restart';
        }
        else
            var text = 'tab to restart';
		// We give the player instructions on how to restart the game
	var startLabel = game.add.text(80, game.height-80,
								   text,
								   {font: '25px Arial', fill: '#FFF' });
    startLabel.x = game.width/2-startLabel.width/2;
    startLabel.y = game.height/3*2-startLabel.height/2;

        // We define the wkey as Phaser.Keyboard.W so that we can act
        // when the player presses it
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        // When the player presses the W key, we call the restart function
        wkey.onDown.addOnce(this.restart, this);
        game.input.onTap.add(this.restart, this);
    },
    
    // The restart function calls the menu state    
    restart: function () {
        game.state.start('play');
    }, 	
};
