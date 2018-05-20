import {scene, currentLevel} from '../setup.js';
import * as textures from '../textures.js';
import * as eventUpdateHandler from '../game/eventUpdateHandler.js';
import {aStar} from '../lib/astar.js';
export let allActors = [];
export class Actor {
	constructor() {
		this.sprite = new PIXI.Sprite(textures.pirate);
		this.sprite.anchor.set(.5, 1);
		this.destination;
		this.moving = false;
		allActors.push(this);
		currentLevel.getGraphicObject(0, 0).addChild(this.sprite);
		this.tileDataParent = currentLevel.getTileData(0, 0);

		this.counter = 0;
		this.maxCount = 30;

		this.path = [];
	}

	update() {
		// this.sprite.position.x += this.velX;
		// this.sprite.position.y += this.velY;
	}

	changeTile(newGraphicObject, newTileData) {
		this.sprite.parent.removeChild(this.sprite);
		this.sprite.setParent(newGraphicObject);
		this.sprite.position.y = -16 - newTileData.height
		this.tileDataParent = newTileData;
	}

	moveTo(newTileData) {
		if (eventUpdateHandler.isPresent(this)) eventUpdateHandler.remove(this);
		
		this.destination = newTileData;
		let path = aStar(currentLevel, this.tileDataParent, this.destination);
		this.path = path;
		if (!this.path) {
			// No path was found, do not move
			return;
		}
		eventUpdateHandler.add(this);
		this.sprite.tint = 0xaaaaff;
		this.moving = true;
		// The returned path is in reverse order
		this.path.reverse();
		// You're already at the start, so shift it
		this.path.shift();
	}

	handleUpdate() {
		this.counter += 1;
		if (this.counter > this.maxCount ) {
			this.counter = 0;
			let graphicData = currentLevel.getGraphicObject(this.path[0].x, this.path[0].y);
			let tileData = currentLevel.getTileData(this.path[0].x, this.path[0].y);
			this.changeTile(graphicData, tileData);
			// console.log(this.path[0], this.destination)
			if (tileData == this.destination) {
				console.log('complete');
				eventUpdateHandler.remove(this);
				this.path = [];
				this.sprite.tint = 0xffffff;
			} else {
				this.path.shift();
			}
		}
	}
}