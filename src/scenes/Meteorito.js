export default class Meteor extends Phaser.GameObjects.Sprite {
	
	constructor(scene,x,y)
	{
		 super(scene, x, y, 'meteorAnim');
		 this.scene = scene;
		 this.width = this.scene.game.config.width;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false)
        this.play('MeteorCayendo', true)
        this.body.setVelocity(Phaser.Math.Between(-20, 20), Phaser.Math.Between(20, 75));
		//sonido explosion
		this.explosion = this.scene.sound.add('explosion');
	}


    explode() 
	{
        // this.play('MeteorCayendo', false)
        this.play('Explote', true) 
		this.explosion.play();
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
            this.destroy();
        }, this);
    }


	
	
	//update
	preUpdate(t, dt) 
	{
		super.preUpdate(t, dt);

		// //limites toroidal
		// if(this.x > this.scene.game.config.width)
		// {
		// 	this.x =0;
		// }
		// else if(this.x < 0)
		// {
		// 	this.x = this.scene.game.config.width;
		// }
	}



}