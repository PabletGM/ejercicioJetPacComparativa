export default class SpaceShip extends Phaser.GameObjects.Sprite {
	
	constructor(scene,x,y,maxFuel) {
		//cogemos como argumentos los datos del padre GameScene
		super(scene , x , y , 'spaceship');
		//añadimos objeto a escena
		this.scene.add.existing(this);
		//y sus fisicas
		this.scene.physics.add.existing(this);
		//desactivamos gravedad
		this.body.setAllowGravity(false);
		//numero de Fuels actuales
		this.numFuels = 0;
		//maximo de fuels
		this.maxFuel = maxFuel;
		//creamos texto con numero de Fuels
		//ponemos el texto en la x,y de la nave pero por encima , el texto y el stilo
		this.pickedFuels = this.scene.add.text(this.x , this.y -(this.y/5) ,  this.numFuels + '/' + this.maxFuel  ,{fontFamily: 'Pixeled', fontSize: 10, color: '#FFFFFF'} ).setOrigin(0.5,0.5);
		
		//comprobamos si coincide la posicion de fuel y spaceShip, en caso de coincidir funcion
		this.scene.physics.add.overlap(this.scene.fuel , this , (fuel, spaceShip)=>
		{
			//comprobamos si tiene el combustible encima el player
			if(this.scene.fuel.picked)
			{
				//ponemos pos aleatoria el fuel
				fuel.respawn();
				//lo añadimos en la nave
				spaceShip.addFuel();
			}
		});

		//añadimos sonido al ponner combustible en nave
		this.recargarNave = this.scene.sound.add('drop');
		//agregamos sonido al ganar
		const config = {
            volume: 0.5,
            rate: 1,
            delay: 1
        };
		this.win = this.scene.sound.add('win',config);
	}

	//update
	preUpdate(t, dt) 
	{
		super.preUpdate(t, dt);
	}

	addFuel()
	{
		//aumentamos numero de fuels 
		this.numFuels++;
		//cambiamos del text solo la propiedad del contenido del texto que indica cuantos fuels tienes
		this.pickedFuels.text = this.numFuels + "/" + this.maxFuel;
		//sonido de recarga de energia
		this.recargarNave.play();
		
		//comprobamos todo el rato si hemos recargado la nave del todo
	    if(this.numFuels>=this.maxFuel)
		{
			//tapamos texto de pickedFuels haciendolo invisible
			this.pickedFuels.setVisible(false);
			//creamos tween que moverá en ejeY e negativo(hacia arriba la nave) durante 2 segundos y con un tipo de ease(tipo de aceleracion, hay 32 , buscar)
			let tween = this.scene.tweens.add({targets:[this], y: - 100, duration: 2000, ease:"Sine.easeOutIn"});
			//hacemos player invisible
			this.scene.player.setVisible(false);
			//hacemos sonido de victoria
			this.win.play();
			//activamos evento tras completar el tween , empezar escena MainMenu
			tween.on('complete', ()=>{this.scene.scene.start('MainMenu')});
			
		}
		
		
	}

}