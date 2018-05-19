import * as textures from '../textures.js';
import {PlayerBuilding} from './PlayerBuilding.js';

export class Crystal extends PlayerBuilding {
	constructor(tile) {
		super(tile);
		this.sprite.destroy();
		this.sprite = new PIXI.extras.AnimatedSprite(textures.crystal);
		this.sprite.animationSpeed = .05;
		this.sprite.gotoAndPlay(0);
		this.pixiParent.addChild(this.sprite)
	}

	reset() {
		this.sprite.destroy();
	}
}