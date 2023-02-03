export default class Boot extends Phaser.Scene {
	
	/**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'boot' });
    }

	/**
     * Carga de los assets del juego,//cargamos las imagenes del juego
     */
    preload() 
	{
		//para el JSON dos pasos , cargar los tiles y el JSON file , tileset PNG file and the exported JSON file
		//cargamos el .JSON
		//si dudas abre simplemente con tiled la imagen y verás como has llamado a los tiles y al tileMap
		this.load.setPath('assets/map/');
		this.load.tilemapTiledJSON('tilesetJSON', 'tilemap.json');


		this.load.setPath('assets/sprites/');
		this.load.spritesheet('PatronesTileMap' , 'tileset.png', { frameWidth:8, frameHeight: 8, endFrame: 1 });
		this.load.image('spaceship' , 'spaceship.png')
		this.load.image('fuel' , 'fuel.png')
		//cargamos animacion del meteor explotando , los 4 frames
		this.load.spritesheet('meteorAnim' , 'meteor.png', { frameWidth:16, frameHeight: 14, endFrame: 3 });
		//cargamos segunda animacion de explosion
		this.load.spritesheet('meteorExp' , 'explosion.png', { frameWidth:24, frameHeight: 30, endFrame: 2 });
		//cargamos tiles , buscar en el JSON apartado "tileSets" name:
		//todo el spritesheet es 136*24 peor me interesa un frame de la animacion	, hay 8 , de 0 a 7
		this.load.spritesheet('player' , 'jetpac.png', { frameWidth:17, frameHeight: 24, endFrame: 7 });


		this.load.setPath('assets/sounds/');
		//añadimos sonido coger combustible
		this.load.audio('pick', 'pick.wav');
		//añadimos sonido recarga combustible
		this.load.audio('drop', 'drop.wav');
		//añadimos sonido explosion
		this.load.audio('explosion' , 'explosion.wav');
		//añadimos sonido de win
		this.load.audio('win' , 'win.wav');
		//añadimos sonido de lose
		this.load.audio('lose' , 'lose.wav');
	}
	
	
	create()
	{
		//animacion player geneeral en esta escena
		this.anims.create({
			key: 'playerAnim',
			frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
			frameRate: 7,
			repeat: -1
		});

		//animacion player walk
		this.anims.create({
			key: 'walk',
			frames: this.anims.generateFrameNumbers('player',  { frames: [5, 6, 7] }),
			frameRate: 7,
			repeat: -1
		});

		//animacion player fly
		this.anims.create({
			key: 'fly',
			frames: this.anims.generateFrameNumbers('player',  { frames: [0,1,2,3] }),
			frameRate: 7,
			repeat: -1
		});

		//animacion player idle o quieto
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('player',  { frames: [4] }),
			frameRate: 7,
			repeat: -1
		});








		//animacion de meteor chocando, se hace 1 vez
		this.anims.create({
			key: 'MeteorExplosion',
			frames: this.anims.generateFrameNames('meteorAnim', {start:2, end:3}),
			frameRate: 0.5,
			repeat: 0
		});
		//animacion de meteor cayendo
		this.anims.create({
			key: 'MeteorCayendo',
			frames: this.anims.generateFrameNames('meteorAnim', {start:0, end:1}),
			frameRate: 3,
			repeat: -1
		});
		//animacion de explosion2
		this.anims.create({
			key: 'Explote' ,
			frames: this.anims.generateFrameNames('meteorExp' , {start:0, end:2}),
			frameRate: 8,
			repeat: 0
		});

		// this.anims.create({
		// 	key: 'Explote' ,
		// 	frames: this.anims.generateFrameNames('meteorExp' , { frames: [0, 1, 2] }),
		// 	frameRate: 1,
		// 	repeat: 0
		// });
		

		this.scene.start('MainMenu');

	}
}