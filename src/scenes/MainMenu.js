export default class MainMenu extends Phaser.Scene {
	
	constructor() {
		super({ key: 'MainMenu' });
	}

	create() 
	{
		// this.add.text(this.game.config.width /3 , this.game.config.height/2 ,'JetPac' , {fontFamily:'Pixeled' , fontSize:16 , color:'#FFFFFF'})
		this.createButton(this.game.config.height/ 5 * 1 , 'Facil',2,2000);
		this.createButton(this.game.config.height/ 5 * 2 , 'Medio',3,1000);
		this.createButton(this.game.config.height/ 5 * 3 , 'Dificil',5,500);
	}

	createButton(y,texto,num,timeMeteor)
	{
		//definimos boton con width , height y lo hacemos interactive
		let boton = this.add.text(this.game.config.width /3 , y,texto,{fontFamily:'Pixeled' , fontSize:25 , color:'#FFFFFF'})
		.setOrigin(0,0).setAlign('center')
		.setInteractive();

		//definimos funcion, todos llevan a escena GameScene , maximo numero de fuel , tiempo entre meteoritos
		boton.on('pointerdown' , ()=> {this.scene.start('GameScene',{max:num , metTime:timeMeteor})});

		return boton;

	}
}