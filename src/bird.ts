import * as PIXI from "pixi.js";
import Sound from "pixi-sound";
import AnimatedSprite = PIXI.AnimatedSprite;

export default class Bird {
	private sprite: AnimatedSprite;
	private view: HTMLCanvasElement;
	private speedX = 1.5;
	private speedY = 1;
	private directionX = 1;
	private directionY = 1;
	private scale = 0.4;

	// private updateTexture = () => {
	// 	this.sprite.texture = this.app.loader.resources[BIRD_FRAME_LIST[this.textureCounter++]].texture;
	// 	if (this.textureCounter === BIRD_FRAME_LIST.length)
	// 		this.textureCounter = 0;
	// }

	reset(x: number, y: number) {
		this.sprite.x = x;
		this.sprite.y = y;
	}

	static spriteSheet() {
		return "./images/sprites/bird.json"
	}

	constructor(app: PIXI.Application) {
		this.setup();
		app.stage.addChild(this.sprite);
		this.view = app.renderer.view;
		this.sprite.play();
		this.reset(this.view.width / 2,  this.view.height / 2);
	}

	setup() {
		let sheet = PIXI.Loader.shared.resources[Bird.spriteSheet()].spritesheet;
		this.sprite = new PIXI.AnimatedSprite(sheet.animations["skeleton-animation"]);
		this.sprite.scale.x = this.scale * this.directionX;
		this.sprite.scale.y = this.scale;
		this.sprite.animationSpeed = 0.5;
		Sound.add('bird1', './sounds/bird/sound1.mp3');
	}

	fly() {
			this.sprite.x += this.directionX * this.speedX;
			this.sprite.y += this.directionY * this.speedY;
			if (this.sprite.x <= this.sprite.width/2 ||
				  this.sprite.x >= (this.view.width - this.sprite.width/2)) {
				this.directionX *= -1;
				this.sprite.scale.x = this.scale * this.directionX;
				Sound.play('bird1');
			}
			if (this.sprite.y <= this.sprite.height/2 ||
				  this.sprite.y >= (this.view.height - this.sprite.height/2)) {
				this.directionY *= -1;
				this.sprite.animationSpeed = this.directionY == 1 ? 0.5 : 0.8;
				Sound.play('bird1');
			}

		// target.rotation += 0.01;
	}
}
