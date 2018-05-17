import {scene} from '../setup.js';
import * as layers from '../layers.js';
export let allActors = [];
export class Actor {
	constructor() {
		this.sprite = new PIXI.Graphics();
		this.sprite.beginFill(0xff0000);
		this.sprite.drawRect(0, 0, 20, 60);
		this.sprite.parentGroup = layers.actors;
		this.velX = 0.1;
		this.velY = 0.1;
		allActors.push(this);
		scene.addChild(this.sprite);
	}

	update() {
		this.sprite.position.x += this.velX;
		this.sprite.position.y += this.velY;
	}
}