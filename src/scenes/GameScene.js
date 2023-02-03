
//importamos el player y fuel, spaceShip y Meteorito
import Fuel from './Fuel.js';
import Player from './Player.js';
import SpaceShip from './SpaceShip.js';
import Meteor from './Meteorito.js';

export default class GameScene extends Phaser.Scene {
	
	constructor() {
		super({ key: 'GameScene' });
	}

	//inicializamos argumento de gasolina y frecuencia de meteoritos que cae
	init(obj)
	{
		this.maxFuel = obj.max;
		this.timeMeteor = obj.metTime;
	}

	
	preload()
	{
		
	}


	create()
	{
		//bool de juego
		this.playing=true;

		//accedemos a variables globales del juego para colocar todo y las hacemos constantes
		const width = this.game.config.width;
		const height = this.game.config.width;

		//sonido de perder
		this.lost = this.sound.add('lose');

				//objetos

		//creamos player
		this.player = new Player(this,width/2 ,height/2);
		//creamos fuel
		this.fuel = new Fuel(this,Phaser.Math.Between(0, this.scale.width), Phaser.Math.Between(0, this.scale.height));
		//creamos spaceShip fijo
		this.spaceShip = new SpaceShip(this , width/2 +40 , height/2+30 ,this.maxFuel);

		//creamos tileMap
		this.createTileMap();

		//creamos grupo de meteoritos
		this.meteoritos = this.add.group();

		//creamos evento para que cada cierto tiempo aparezca un meteorito y añadimos argumentos loop = true y callBackScope
		this.evento = this.time.addEvent({delay:this.timeMeteor, callback: ()=>{this.spawnAsteroid()} , callbackScope:this , loop:true});
		
		
			//colisiones de meteoritos
		
		//añadimos colisiones con suelo y meteoritos
		this.physics.add.collider(this.meteoritos, this.groundLayer , (meteoritos , suelo) =>
		{ 
			console.log("he");
            meteoritos.explode();
        });

		//colisiones player y meteorito
		this.physics.add.collider(this.meteoritos, this.player , (meteoritos , player) => 
		{ 
			meteoritos.explode();
            this.stopLevel();
			this.lose();
        });
	}

	//spawnear otro asteroide 
	spawnAsteroid()
	{
		if(this.playing)
		{
		  this.meteoritos.add(new  Meteor(this, Phaser.Math.Between(0, this.scale.width), 0));
		}
	}

	//parar nivel
	stopLevel()
	{
        this.playing=false;
        this.player.setActive(false);
        this.fuel.setVisible(false);
        this.player.setVisible(false);
    }


	createTileMap() 
	{
		//MAPA
		this.map = this.make.tilemap({
			key: 'tilesetJSON',
			tileWidth: 32,
			tileHeight:24
		});
		//tileSet , segundo parametro como lo he cargado arriba 'PatronesTileMap' , primer parametro como lo he llamado en la app de tiled al guardarlo
		const tileset = this.map.addTilesetImage('ground_ts' , 'PatronesTileMap');
		//por ultimo creamos las capas ground que poseen colisiones
		this.groundLayer = this.map.createLayer('ground' , tileset);
		//colisiones player y  capa suelo
		this.physics.add.collider(this.player, this.groundLayer);
		//añadimos colisiones con suelo
		this.physics.add.collider(this.fuel, this.groundLayer);
		this.groundLayer.setCollisionBetween(0,999);

	}

	lose()
	{
		this.lost.play();
		this.lost.once('complete', () => 
		{
			
			this.scene.start('MainMenu');
		});
	}

}