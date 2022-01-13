var level = 0;
var levels = ["Test0.json", "Test0b.json", "Test4.json", "Test3.json", "Test1.json", "Test2.json"];

var loadState= {
	
	// The preload function is another standard Phaser function that we
	// use to define and load our assets
    preload: function() {
        
        // Add a loading label on the screen
        var loadingLabel = game.add.text(80, 150, 'loading...', 
                                         {font: '30px Courier', fill: '#ffffff'});        
        
        // Load all assets. The first parameter is the variable that 
        // will point to the image, and the second parameter is the
        // image file itsself.
        //game.load.tilemap('map', 'assets/my-tilemap2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map', 'assets/'+levels[level], null, Phaser.Tilemap.TILED_JSON);
		//game.load.tilemap('map_menu', 'assets/Menu.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('sky', 'assets/sky.png');
		//game.load.image('ground', 'assets/platform.png');
		//game.load.image('block', 'assets/block.png');
		game.load.image('star', 'assets/star_new.png', 14, 14);
        //game.load.image('platform', 'assets/platform.png');
        game.load.image('TextAntiGravityDuck', 'assets/TextAntiGravityDuck.png');
        game.load.image('TextCollectMe', 'assets/CollectMe.png');
        game.load.image('TextEnterMe', 'assets/TextEnterMe.png');
        game.load.image('TextLevelComplete', 'assets/TextLevelComplete.png');
        game.load.image('TextDuckDead', 'assets/TextDuckDead.png');
        game.load.image('tree', 'assets/Tree.png');
        game.load.image('grass', 'assets/Grass.png');
        game.load.image('shrub', 'assets/Shrub.png');
        game.load.image('flower', 'assets/Flower.png');
		game.load.spritesheet('chick', 'assets/Duck.png', 20, 20);
        game.load.spritesheet('buddy', 'assets/Reddie.png', 18, 20);

        //game.load.spritesheet('buttonvertical', 'assets/button-vertical.png', 32, 64);
        //game.load.spritesheet('buttonhorizontal', 'assets/button-horizontal.png', 64, 32);
        //game.load.spritesheet('buttondiagonal', 'assets/button-diagonal.png', 48, 48);
		
		//game.load.image('platformer_tiles', 'assets/platformer_tiles.png');
        game.load.spritesheet('MyTiles', 'assets/MyTiles.png', 16, 16);
        
    },
    
    create: function() {
        // Call the menu state
        game.state.start('menu');
    }    
};
