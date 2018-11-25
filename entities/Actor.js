import {scene, currentLevel} from '../setup.js';
import * as textures from '../textures.js';
import * as eventUpdateHandler from '../game/eventUpdateHandler.js';
import * as C from '../constants.js';
import {aStar} from '../lib/astar.js';
export let allActors = [];

/*
isoX = cartX - cartY;
isoY = (cartX + cartY) / 2;
*/

function toIsoX(x, y) {
	return x - y;
}
function toIsoY(x, y) {
	return (x+y)/2;
}



export class Actor {
	constructor(config) {
		this.walkerSet = textures[config.char];
		this.sprite = new PIXI.extras.AnimatedSprite(this.walkerSet[5]);
		this.sprite.animationSpeed = .1;
		this.sprite.anchor.set(.5, 1);
		this.destination;
		this.moving = false;
		this.selected = false;

		allActors.push(this);

		// Temporarily set the actor at 0,0 for test purposes.
		this.currentTile = currentLevel.getTileData(0, 0);
		this.currentTile.graphicObject.addChild(this.sprite);
		this.counter = 0;
		this.maxDefaultCount = 15;
		this.maxCount = this.maxDefaultCount;

		this.currentDirection = "south";
		this.vel = {
			x: 0,
			y: 0
		};
		this.offset = {x: 0, y: 0};
		this.path = [];
		console.log(this.sprite)
		
	}

	update() {
		// this.sprite.position.x += this.velX;
		// this.sprite.position.y += this.velY;
	}

	changeTile(newTileData) {
		this.sprite.parent.removeChild(this.sprite);
		this.sprite.setParent(newTileData.graphicObject);
		this.sprite.position.y = -24 - newTileData.height + this.offset.y;
		this.sprite.position.x = 0 + this.offset.x;
		this.currentTile = newTileData;
		
		// set new direction

		
	}

	moveTo(newTileData) {
		if (eventUpdateHandler.isPresent(this)) eventUpdateHandler.remove(this);
		
		this.destination = newTileData;
		let path = aStar(currentLevel, this.currentTile, this.destination);
		this.path = path;
		if (!this.path) {
			this.sprite.stop();
			// No path was found, do not move
			return;
		}
		// The returned path is in reverse order
		this.path.reverse();
		// You're already at the start, so shift it
		this.path.shift();
		if (this.path[0]) {
			eventUpdateHandler.add(this);
			
			this.moving = true;		
			this.direction = getDirection(this.path[0].x - this.currentTile.x, this.path[0].y - this.currentTile.y);
			this.maxCount = this.maxDefaultCount;

			this.sprite.textures = this.walkerSet[this.direction];
			this.sprite.gotoAndPlay(0);
			this.vel.x = this.path[0].x - this.currentTile.x
			this.vel.y = this.path[0].y - this.currentTile.y
			if ([1, 3, 5, 7].includes(this.direction)) {
				this.maxCount = this.maxDefaultCount * 1.5;
				this.vel.x *= .66;
				this.vel.y *= .66;
			}
		}
		
	}

	select() {
		let colorMatrix = new PIXI.filters.GlowFilter();
		this.sprite.filters = [colorMatrix];
		this.selected = true;
	}

	deselect() {
		this.sprite.filters = [];
		this.selected = false;
	}

	handleUpdate() {
		this.counter += 1;
		// this.sprite.position.x = this.sprite.position.x + toIsoX(this.vel.x, this.vel.y);
		// this.sprite.position.y = this.sprite.position.y + toIsoY(this.vel.x, this.vel.y);
		if (this.counter > this.maxCount ) {
			this.counter = 0;
			let tileData = currentLevel.getTileData(this.path[0].y, this.path[0].x);
			this.changeTile(tileData);
			if (tileData == this.destination) {
				eventUpdateHandler.remove(this);
				this.path = [];
				this.sprite.gotoAndStop(1);
				// let currentTileActors = allActors.filter(actor => actor.currentTile == this.currentTile && actor != this).length;
				// if (currentTileActors == 0) { this.offset = {x:0, y: 0};}
				// if (currentTileActors == 1) { this.offset = {x:16, y: 8};}
				// if (currentTileActors == 2) { this.offset = {x:-16, y:8};}
				// if (currentTileActors == 3) { this.offset = {x:0, y: 16};}
			} else {
				this.path.shift();
				if (this.path[0]) {
					this.direction = getDirection(this.path[0].x - this.currentTile.x, this.path[0].y - this.currentTile.y);
					this.maxCount = this.maxDefaultCount;
					this.vel.x = this.path[0].x - this.currentTile.x
					this.vel.y = this.path[0].y - this.currentTile.y
					if ([1, 3, 5, 7].includes(this.direction)) {
						this.maxCount = this.maxDefaultCount * 1.5;
						this.vel.x *= .66;
						this.vel.y *= .66;
					}
					this.sprite.textures = this.walkerSet[this.direction];
					this.sprite.gotoAndPlay(0);
				}
			}
		}
	}
}


function getDirection(x, y) {
	let newDirection = null;
	if (x == -1 && y ==  0) newDirection = 0 // "west"
	if (x == -1 && y == -1) newDirection = 1 // "northwest"
	if (x ==  0 && y == -1) newDirection = 2 // "north"
	if (x ==  1 && y == -1) newDirection = 3 // "northeast"
	if (x ==  1 && y ==  0) newDirection = 4 // "east"
	if (x ==  1 && y ==  1) newDirection = 5 // "southeast"
	if (x ==  0 && y ==  1) newDirection = 6 // "south"
	if (x == -1 && y ==  1) newDirection = 7 // "southwest"
	return newDirection;
}

export function getActorFromTile(tileData) {
	let actor = allActors.find(actor => actor.currentTile == tileData);
	if (actor) {
		actor.select();
	}
}

export function getAllActorFromTile(tileData) {
	let actors = allActors.filter(actor => actor.currentTile == tileData);
	actors.forEach(actor => {
		if (actor) {
			actor.select();
		}
	})
	
}

export function selectedActors() {
	return allActors.filter(actor => actor.selected);
}