export default class Fuel extends Phaser.GameObjects.Sprite {
	
	constructor(scene,x,y) {
		//cogemos como argumentos los datos del padre GameScene
		super(scene , x , y , 'fuel');
		//añadimos objeto a escena
		this.scene.add.existing(this);
		//y sus fisicas
		this.scene.physics.add.existing(this);
		//comprobamos si coincide la posicion de player y fuel, en caso de coincidir funcion
		this.scene.physics.add.overlap(this.scene.player , this , (player, fuel)=>
		{
			this.AgregarFuel(player);
		});
		
		//agregamos sonido al recoger combustible
		this.fuelSound = this.scene.sound.add('pick');
		//booleano
		this.picked= false;
	}

	//update
	preUpdate(t, dt) {
		super.preUpdate(t, dt);

		//si se ha cogido el fuel , lo ponemos en pos de player
		if(this.picked)
		{
			this.setPosition(this.scene.player.x,this.scene.player.y);
		}	
	}

	//para que no se haga todo el rato utilizamos booleano
	AgregarFuel(player)
	{
		if(!this.picked)
		{
			//llamamos a metodo que agrega combustible encima y pasamos referencia de fuel
			// player.CombustibleAPlayer(this);
			this.fuelSound.play();
			//desactivamos gravedad de este objeto para que no se caiga al hacerse hijo de player y sea pos fija
			this.body.setAllowGravity(false);
			//impedimos que entre al if porque ya se ha cogido
			this.picked= true;
		}
	}

	//cambiamos posicion de fuel
	respawn()
	{
		let offset = 30;	
		//activamos gravedad de este objeto para que se caiga y no sea pos fija
		this.body.setAllowGravity(true);
		//permitimos que se pueda coger
		this.picked= false;
		//posicion aleatoria
		this.x = Math.random() * (this.scene.game.config.width- offset)
		this.y = Math.random() * (this.scene.game.config.height- offset)
	}

}