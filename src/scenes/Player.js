export default class Player extends Phaser.GameObjects.Sprite{
	//Phaser.GameObjects.Sprite
	constructor(scene, x, y) 
	{
		super(scene , x , y, 'player');

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.speed = 80;
		
		//das acceso a las teclas para poder ser usadas
		this.createInput();

		this.fuel = null;
	}

	preUpdate(t, dt) {
		// super.preUpdate(t, dt);
		super.preUpdate(t, dt);
		//movemos el player
		this.movePlayer();
	}

	movePlayer()
	{

		//A y D movimiento
		if (this.a.isDown) 
		{
			this.body.setVelocityX(-this.speed);
			this.setFlipX(true);
			// this.sprite.setFlipX(true);
		}
		else if (this.d.isDown) 
		{
			this.body.setVelocityX(this.speed);
			this.setFlipX(false);
			// this.sprite.setFlipX(false);
		}
		//sino se pulsa nada
		else this.body.setVelocityX(0);


		//limites toroidal
		if(this.x > this.scene.game.config.width)
		{
			this.x =0;
		}
		else if(this.x < 0)
		{
			this.x = this.scene.game.config.width;
		}

		//salto 
		if (this.cursorSpace.isDown) {
			this.body.setVelocityY(-this.speed);
		}

		this.animaciones();

		
	}

	animaciones()
	{
		//animaciones
		//sino toca suelo, vuela
		if(!this.body.onFloor())
		{
			this.play('fly', true);
		}
		//si toca suelo y anda hacia una direccion a o d
		else if( (this.body.onFloor() && this.d.isDown) || (this.body.onFloor() && this.a.isDown))
		{
			this.play('walk',true)
		}
		//si toca suelo y no se pulsa nada
		else
		{
			this.play('idle', true);
		}
	}

	createInput()
	{
		this.a = this.scene.input.keyboard.addKey('A');
    	this.d = this.scene.input.keyboard.addKey('D');
		this.cursorSpace =this.scene.input.keyboard.addKey('SPACE');
	}

	
	

}