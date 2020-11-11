import * as PIXI from 'pixi.js'

// import _ from 'lodash';
//
// function component() {
// 	const element = document.createElement('div');
//
// 	// Lodash, now imported by this script
// 	element.innerHTML = _.join(['Hello', 'webpack!!!'], ' ');
//
// 	return element;
// }
//
// document.body.appendChild(component());

let Application			= PIXI.Application,
	Container			= PIXI.Container,
	// loader				= PIXI.Loader(),
	// resources			= PIXI.loader.resources,
	Graphics			= PIXI.Graphics,
	TextureCache		= PIXI.utils.TextureCache,
	Sprite				= PIXI.Sprite,
	Text				= PIXI.Text,
	TextStyle			= PIXI.TextStyle;
	let targetDirectX = -1;
	let targetDirectY = -1;
	let targetSpeedX = 2;
	let targetSpeedY = 1;
	let targetTextureCounter = 0;
	let targetScale = 0.5;
	const BIRD_FRAME_LIST = [
		'./images/bird/skeleton-animation_00.png',
		'./images/bird/skeleton-animation_01.png',
		'./images/bird/skeleton-animation_02.png',
		'./images/bird/skeleton-animation_03.png',
		'./images/bird/skeleton-animation_04.png',
		'./images/bird/skeleton-animation_05.png',
		'./images/bird/skeleton-animation_06.png',
		'./images/bird/skeleton-animation_07.png',
		'./images/bird/skeleton-animation_08.png',
		'./images/bird/skeleton-animation_09.png',
		'./images/bird/skeleton-animation_10.png'
	];


let app = new Application({
	width: 512,
	height: 512,
	antialias: true,
});

let resources	= app.loader.resources;


document.body.appendChild( app.view );

let state, scoreBar, value = 0, score, target, gameScene,
	id, bg, timer = 10, targetClick = true;

app.loader
	.add("images/atlas.json")
	.add(BIRD_FRAME_LIST)
	.load( setup );

function setup() {
	id = resources["images/atlas.json"].textures;

	gameScene = new Container();
	app.stage.addChild( gameScene );

	bg = new Sprite( id["background.png"] );
	bg.anchor.set(0, 0);
	gameScene.addChild( bg );

	let scoreBar = new Container();
	scoreBar.position.set( app.stage.width / 2 - scoreBar.width / 2, 22 );
	gameScene.addChild( scoreBar );

	let bgScoreBar = new Sprite( id["score.png"] );
	scoreBar.addChild( bgScoreBar );

	let style = new TextStyle({
		fontFamily: "Arial",
		fontSize: 28,
		fill: "white",
	});

	score = new Text( "0", style );
	score.x = -score.width / 2;
	score.y = -score.height / 2 - 1;
	scoreBar.addChild( score );

	// target = new Sprite( id["cookie.png"] );
	target = new Sprite();
	target.texture = app.loader.resources[BIRD_FRAME_LIST[targetTextureCounter++]].texture;
	target.scale.x = targetScale;
	target.scale.y = targetScale;
	target.x = gameScene.width / 2 - target.width / 2;
	target.y = gameScene.height / 2  - target.height / 2;
	target.interactive = true;
	target.buttonMode = true;
	target.on("pointerdown", handlerClick);
	gameScene.addChild( target );

	state = play;
	app.ticker.add( delta => gameLoop( delta ) );
}

function gameLoop(delta) {
	state( delta );
	updateTargetTexture();
	moveTarget();
}

function updateTargetTexture() {
	target.texture = app.loader.resources[BIRD_FRAME_LIST[targetTextureCounter++]].texture;

	if (targetTextureCounter === BIRD_FRAME_LIST.length) targetTextureCounter = 0;
}

function moveTarget() {
	target.x += targetDirectX * targetSpeedX;
	target.y += targetDirectY * targetSpeedY;
	if (target.x <= 1 || target.x >= (gameScene.width - target.width - 1)) targetDirectX *= -1;
	if (target.y <= 1 || target.y >= (gameScene.height - target.height - 1)) targetDirectY *= -1;
	// target.rotation += 0.01;
	console.log(gameScene.width, target.x);
}

function play() {
	if ( timer == 0 ) {
		targetClick = true;

		target.scale.x = targetScale * targetDirectX;
		target.scale.y = targetScale;
	} else if ( timer > 0 ) {
		timer--;
	}
}

function handlerClick () {
	if ( targetClick ) {
		value++;
		score.text = value;

		score.x = -score.width / 2;
		score.y = -score.height / 2;

		target.scale.x = targetScale * 0.95;
		target.scale.y = targetScale * 0.95;

		targetClick = false;

		timer = 10;
	}
}
