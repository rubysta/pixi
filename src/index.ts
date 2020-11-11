import * as PIXI from 'pixi.js'
import Bird from './bird'

const canvasWidth = 512;
const canvasHeight = 256;

let app = new PIXI.Application({
	width: canvasWidth,
	height: canvasHeight,
	antialias: true,
});

document.body.appendChild(app.view);

PIXI.Loader.shared
	.add(Bird.spriteSheet())
	.load(setup);

let bird: Bird;

function setup() {
	app.stage.addChild(new PIXI.Container());
	bird = new Bird(app);
	app.ticker.add( delta => gameLoop( delta ) );
}

function gameLoop(delta: any) {
	bird.fly();
}

