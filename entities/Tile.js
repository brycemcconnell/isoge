import {scene} from './../setup.js';
import * as layers from './../layers.js';
import * as tools from '../controls/tools.js';
import {mouseDown} from '../controls/map.js';
import * as testLevel from '../levels/testLevel.js';
import * as glow from './glow.js';
import * as C from '../constants.js';
import PopupText from '../ui/components/PopupText.js'
import Plant from '../entities/Plant.js'

import * as pumpkin from '../plants/pumpkin.js';
import * as default_config from '../plants/default_config.js';

let lastClicked = {x: -1, y: -1};
let glowTiles = [];
let glowTileContainer;

export function initGlowContainer() {
	glowTileContainer = new PIXI.Container();
	glowTileContainer.visible = false;
	scene.addChild(glowTileContainer);
	glowTileContainer.parentGroup = layers.select;
	glowTileContainer.visible = true;
}
export class Tile {
	constructor(config) {
		this.scene = scene;
		this.x = config.x * 32 || 0;
		this.y = config.y * 32 || 0;
		this.playerTile = false;
		this.water = config.water || false;
		this.popupText= null;
		this.animated = config.animated || false;
		this.tile = Array.isArray(config.tile) && !this.animated ? config.tile[C.random(config.tile.length - 1)] : config.tile;
		this.defaultType = config.type;
		this.type = config.type;
		this.defaultTexture;
		this.renderTile;
		this.wall = config.wall || false;
		this.textures = [];
		if (this.animated) {
			this.renderTile = new PIXI.extras.AnimatedSprite(this.tile);
			this.renderTile.animationSpeed = .05;
			this.renderTile.play();
			this.renderTile.parentGroup = config.layer || layers.water;
		}
		
		if (!this.animated) {
			this.defaultTexture = this.tile;
			this.renderTile = new PIXI.Sprite(this.defaultTexture);
			this.renderTile.parentGroup = config.layer || layers.floor;
			// @Important - Perhaps set a height property that changes the anchor point, in order to have higher walls etc. (see the Plant and trees)
			this.renderTile.anchor.set(0, -0.25);

		}
		this.renderTile.scale.set(1, 1);
		this.renderTile.visible = config.visible || false;

		this.glow = new PIXI.Sprite(glow.glowDefault);
		this.glow.visible = false;
		glowTileContainer.addChild(this.glow);

		this.isoX = this.x - this.y;
		this.isoY = (this.x + this.y) / 2;

		this.glow.position.x = this.isoX;
		this.glow.position.y = this.isoY;
		
		this.renderTile.interactive = config.interactive || false;
		this.renderTile.hitArea = new PIXI.Polygon([
			32, 32,
			64, 48,
			32, 64,
			0, 48
		]);
		this.renderTile.position.set(this.isoX, this.isoY);
		this.scene.addChild(this.renderTile);
		this.renderTile.on('mouseover', () => {
			this.glow.visible = true;
			if (mouseDown) {
				if (tools.currentTool.value !== 'move') {
					glowTiles = [];
					testLevel.level.tiles.forEach(row => {
						row.forEach(tile => tile.glow.visible = false);
					});
					let currentX = this.x / 32;
					let currentY = this.y / 32;
					let diffY = currentY - lastClicked.y;
					let diffX = currentX - lastClicked.x;
					let signX = Math.sign(diffX);
					let signY = Math.sign(diffY);
					let tilesToUpdate = [];
					if (tools.currentTool.mode == 'area') {
						for (let i = 0; i <= Math.abs(diffY); i++) {
							for (let j = 0; j <= Math.abs(diffX); j++) {
								let loopTile = testLevel.level.tiles[signY * i + lastClicked.y][signX * j + lastClicked.x];
								tilesToUpdate.push(loopTile);
							}
						}
					}
					if (tools.currentTool.mode == 'line') {
						let midpoint;
						for (let i = 0; i <= Math.abs(diffY); i++) {
							let loopTile = testLevel.level.tiles[signY * i + lastClicked.y][lastClicked.x];
							tilesToUpdate.push(loopTile);
							if(i == Math.abs(diffY)) midpoint = signY * i;
						}
						for (let j = 0; j <= Math.abs(diffX); j++) {
							let loopTile = testLevel.level.tiles[lastClicked.y +midpoint][signX * j + lastClicked.x];
							tilesToUpdate.push(loopTile);
						}
					}
					let thereWasCollision = false;
					tilesToUpdate.forEach(loopTile => {
						loopTile.glow.setTexture(glow.glowFill);
						if (tools.currentTool.value == 'destroy') {
							loopTile.glow.tint = 0xff5500;
						} else if (tools.currentTool.value =='seed') {
							loopTile.glow.tint = 0xffff00;
						} else {
							loopTile.glow.tint = 0xffffff;
						}
						loopTile.glow.visible = true;
						if (!isTileClear(loopTile)) {
							thereWasCollision = true
						}
						glowTiles.push(loopTile)
					});
					if (thereWasCollision &&
						(tools.currentTool.value == 'build' ||
						tools.currentTool.value == 'plow')) {
						glowTiles.forEach(tile => tile.glow.tint = 0xff0000);
					}
				}
			}
		});
		this.renderTile.on('mousedown', () => {
			lastClicked = {x: this.x / 32, y: this.y / 32};
		});
		this.renderTile.on('mouseout', () => {
			this.glow.visible = false;

		});
		this.renderTile.on('click', () => {
			// testLevel.level.getTile(this.x / 32, this.y / 32);
			glowTiles = [this];
			handleTileActivation();
			if (tools.currentTool.value == 'query') {
				handleTileQuery(this);
			}
		});
		this.renderTile.on('mouseup', () => {
			handleTileActivation();
		});
		this.plowed = false;
		this.seeded = config.plant ? true : false;
		this.plant = config.plant ? new Plant(this, config.plant) : null;
	}

	setPlowed(boolean) {
		this.plowed = boolean;
	}
}

function handleBuild(tile) {
	if (tile.plowed) {
		tile.plowed = false;
		tile.seeded = false;
	}
	tile.playerTile = true;
	let newTile = new PIXI.Texture(PIXI.loader.resources[tools.currentTool.tile].texture);
	if (tools.currentTool.tile == 'wall-x') {
		tile.renderTile.anchor.set(0,0.375)
	}
	tile.renderTile.setTexture(newTile);
	tile.type = tools.currentTool.tile;
}

function handleDestroy(tile) {
	if (tile.playerTile) {
		tile.plowed = false;
		tile.seeded = false;
		tile.playerTile = false;
		tile.renderTile.setTexture(tile.defaultTexture);
		tile.type = tile.defaultTypel;
	}
}

function handleSeed(tile) {
	if (tile.plowed) {
		let plantConfig = default_config.config;
		if (tools.currentTool.tile == 'pumpkin') plantConfig = pumpkin.config;
		tile.plant = new Plant(tile, plantConfig);
		tile.plant.seed()
	}
}


function handleHarvest(tile) {
	if (tile.seeded && tile.plant.maxStageReached) {
		let yielder = tile.plant.yielder;
		let nothingFound = 0;
		tile.plant.yielder.forEach((yieldItem, index) => {
			yieldItem.generateQuantity();
			yieldItem.sendToInventory();
			let text = `+ ${yieldItem.result} ${yieldItem.name}`;
			if (yieldItem.result == 0) {
				nothingFound += 1;
			} else {
				let popupText = new PopupText({text: text});
				scene.addChild(popupText.content);
				let pos = tile.renderTile.position;
				popupText.content.position.set(pos.x, pos.y + (index * 32));
				popupText.run();
			}
		})
		if (nothingFound == tile.plant.yielder.length) {
			let popupText = new PopupText({text: 'Nothing found!'});
			scene.addChild(popupText.content);
			let pos = tile.renderTile.position;
			popupText.content.position.set(pos.x, pos.y);
			popupText.run();
		}
		
		tile.plant.reset();
	}
}

function handlePlow(tile) {
	tile.setPlowed(true)
	let newTile = new PIXI.Texture(PIXI.loader.resources[tools.currentTool.tile].texture);
	tile.type = tools.currentTool.tile;
	tile.renderTile.setTexture(newTile);
	tile.playerTile = true;
}

function allTilesClear(glowTiles) {
	let result = true;
	glowTiles.some(tile => {
		if ((tile.plowed || tile.seeded || tile.playerTile || tile.water) && tile.type !== tools.currentTool.tile) {
			result = false;
			return true;
		}
	});
	return result;
}

function isTileClear(tile) {
	if ((tile.plowed || tile.seeded || tile.playerTile || tile.water) && tile.type !== tools.currentTool.tile) {
		return false;
	}
	return true;
}

function handleTileActivation() {
	if (tools.currentTool.value !== 'move' && allTilesClear(glowTiles)) {
		glowTiles.forEach(tile => {
			if (tools.currentTool.value == 'build') {
				handleBuild(tile);
			}
			if (tools.currentTool.value == 'plow') {
				handlePlow(tile);
			}
			tile.glow.visible = false;
			tile.glow.setTexture(glow.glowDefault);
			tile.glow.tint = 0xffffff;
		});
	}
	glowTiles.forEach(tile => {
		if (tools.currentTool.value == 'destroy') {
			handleDestroy(tile);
		}
		if (tools.currentTool.value == 'seed') {
			handleSeed(tile);
		}
		if (tools.currentTool.value == 'harvest') {
			handleHarvest(tile);
		}
		tile.glow.visible = false;
		tile.glow.setTexture(glow.glowDefault);
		tile.glow.tint = 0xffffff;
	});
	glowTiles = [];
}

function handleTileQuery(tile) {
	console.log(tile)
}