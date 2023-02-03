//escenas importadas para utilizar
import MainMenu from './scenes/MainMenu.js';
import GameScene from './scenes/GameScene.js';
import Boot from './scenes/Boot.js';

//plantilla base de game 
window.onload = ()=>{
    //configuraciones establecidas
    const config = {
        type: Phaser.AUTO,
        //escala
        scale: {
            width: 256,
            height: 192,
            zoom: 3,
            autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
        //tipo de fisicas
        pixelArt: true,
        //fisica
        physics:{
            default: 'arcade',
            arcade: {
                gravity: {y:150},
                debug : true
            }
        },
        scene: [Boot,MainMenu,GameScene ]
    };

    new Phaser.Game(config);
};