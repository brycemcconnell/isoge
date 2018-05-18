import {scene} from '../setup.js';
import * as C from '../constants.js';
import * as layers from '../layers.js';
import * as animationHandler from '../../game/animationHandler.js'

export let clouds = [];

export class Cloud {
	constructor() {
		this.sprite = new PIXI.Sprite(PIXI.loader.resources["cloud"].texture);
		this.sprite.parentGroup = layers.clouds;
		
		this.sprite.alpha = 0.8;
		this.velX = 1;
		clouds.push(this)
		scene.addChild(this.sprite)
		this.animationRunning = false;
		this.counter = 0;
		this.dir = 'out';
		this.boundaryX = -scene.width/2;
		this.startPos =(({width, height}) => ({width, height}))(scene);
		this.setPosition();
	}

	setPosition() {
		this.sprite.position.y = C.random(this.startPos.height);
		this.sprite.position.x = C.random(this.startPos.width);
	}

	update() {
		this.sprite.position.x -= this.velX;
		if (this.sprite.position.x < this.boundaryX) {
			this.run();
		}
	}
	run() {
		if (!this.animationRunning) {
			this.animationRunning = true;
			this.sprite.visible = true;
			animationHandler.add(this);
		}
	}
	handleAnimation() {
		if (this.dir == 'out') {
			this.counter += 1;
			this.sprite.alpha -=.02;
			if (this.sprite.alpha < 0) {
				this.setPosition();
				this.dir = 'in';
			}
		} 
		if (this.dir == 'in') {
			this.counter += 1;
			this.sprite.alpha +=.02;
			if (this.sprite.alpha >= .8) {
				this.resetAnimation();
				
			}
		}
	}
	resetAnimation() {
		this.counter = 0;
		this.sprite.alpha = .8;
		this.dir = 'out';
		this.animationRunning = false;
		animationHandler.remove(this);
	}
}

export function createSomeClouds() {
	for (let i = 0; i < 10; i ++) {
		let cloud = new Cloud();
	}
}