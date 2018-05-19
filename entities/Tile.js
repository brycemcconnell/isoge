import {scene, currentLevel, sceneHolder} from './../setup.js';
import * as tools from '../controls/tools.js';
import {mouseDown} from '../controls/map.js';
import * as glow from './glow.js';
import * as C from '../constants.js';
import PopupText from '../ui/components/PopupText.js';
import Plant from '../entities/Plant.js';
import {PlayerBuilding} from './PlayerBuilding.js';

import * as pumpkin from '../plants/pumpkin.js';
import * as defaultPlant from '../plants/defaultPlant.js';
import * as wheat from '../plants/wheat.js';

import * as textures from '../textures.js';

let lastClicked = {x: -1, y: -1};
let glowTiles = [];
let glowTileContainer;

export function initGlowContainer() {
	glowTileContainer = new PIXI.Container();
	glowTileContainer.visible = false;
	sceneHolder.addChild(glowTileContainer);
	glowTileContainer.visible = true;
}
export class Tile {
	constructor(config) {
		this.scene = scene;
		this.x = config.x || 0;
		this.y = config.y || 0;
		this.gridX = config.x * 32 || 0;
		this.gridY = config.y * 32 || 0;
		this.playerTile = false;
		this.water = config.water || false;
		this.popupText= null;
		this.animated = config.animated || false;
		this.animationSpeed = config.animationSpeed || .1;
		this.tile = Array.isArray(config.tile) && !this.animated ? config.tile[C.random(config.tile.length - 1)] : config.tile;
		this.defaultType = config.type;
		this.type = config.type;
		this.defaultTexture;
		this.renderTile;
		this.wall = config.wall || false;
		this.textures = [];

		this.isoX = this.gridX - this.gridY;
		this.isoY = (this.gridX + this.gridY) / 2;
		
		this.plowed = false;
		this.seeded = config.plant ? true : false;
		this.occupant = config.plant ? new Plant(config.plant) : null;
	}

	setPlowed(boolean) {
		this.plowed = boolean;
	}

	getNeighbors() {
		return [
			currentLevel.level.getTile(this.x + 1, this.y),
			currentLevel.level.getTile(this.x - 1, this.y),
			currentLevel.level.getTile(this.x, this.y + 1),
			currentLevel.level.getTile(this.x, this.y - 1),
		];
	}

	getXNeighborSquare(num) {
		const checkX = this.x + 1;
		const checkY = this.y + 1;
		// Give x and y offsets for isometric visibility
		const startX = checkX - num > 0 ? checkX - num : 0;
		const startY = checkY - num > 0 ? checkY - num : 0;
		const endX = checkX + num < currentLevel.level.tiles.length ? checkX + num : currentLevel.level.tiles.length;
		const endY = checkY + num < currentLevel.level.tiles[0].length ? checkY + num : currentLevel.level.tiles[0].length;
		const result = [];
		for (let x = startX; x < endX; x++) {
			for (let y = startY; y < endY; y++) {
				result.push(currentLevel.level.getTile(x, y));
			}
		}
		return result;
	}
}

function handleBuild(tile) {
	if (tile.plowed) {
		tile.plowed = false;
		tile.seeded = false;
	}
	tile.playerTile = true;
	tile.renderTile.setTexture(textures.floorDirt);
	let west = currentLevel.level.getTile(tile.x - 1, tile.y);
	let north = currentLevel.level.getTile(tile.x, tile.y - 1);
	let northWest = currentLevel.level.getTile(tile.x - 1, tile.y - 1);
	[west, north, northWest].forEach(tile => {
		tile.playerTile = true;
		tile.renderTile.setTexture(textures.floorDirt);
	});
	tile.occupant = new PlayerBuilding(tile, buildingConfig[tools.currentTool.tile]);
}

const buildingConfig = {
	"floor-wood": {
		textures: "floorWood"
	},
	"plot2x2": {
		textures: "plot2x2"
	},
}

function handleDestroy(tile) {
	if (tile.playerTile) {
		tile.plowed = false;
		tile.seeded = false;
		tile.playerTile = false;
		if (tile.occupant) {
			tile.occupant.reset();
		}
		tile.renderTile.setTexture(tile.defaultTexture);
		tile.type = tile.defaultTypel;
	}
}

function handleSeed(tile) {
	if (tile.plowed && !tile.seeded) {
		let plantConfig = defaultPlant.config;
		if (tools.currentTool.tile == 'pumpkin') plantConfig = pumpkin.config;
		if (tools.currentTool.tile == 'wheat') plantConfig = wheat.config;
		tile.occupant = new Plant(tile, plantConfig);
		tile.occupant.seed();
	}
}


function handleHarvest(tile) {
	if (tile.seeded && tile.occupant.maxStageReached) {
		let yielder = tile.occupant.yielder;
		let nothingFound = 0;
		yielder.forEach((yieldItem, index) => {
			yieldItem.generateQuantity(tile.occupant.wilted);
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
		});
		if (nothingFound == yielder.length) {
			let popupText = new PopupText({text: 'Nothing found!'});
			scene.addChild(popupText.content);
			let pos = tile.renderTile.position;
			popupText.content.position.set(pos.x, pos.y);
			popupText.run();
		}
		
		tile.occupant.reset();
	}
}

function handlePlow(tile) {
	tile.setPlowed(true);
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
	console.log(tile);
	console.log(tile.x, tile.y, tile.type);
	let east = currentLevel.level.getTile(tile.x + 1, tile.y);
	let west = currentLevel.level.getTile(tile.x - 1, tile.y);
	let south = currentLevel.level.getTile(tile.x, tile.y + 1);
	let north = currentLevel.level.getTile(tile.x, tile.y - 1);
}