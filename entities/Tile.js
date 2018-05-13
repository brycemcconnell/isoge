import {offsetX, offsetY, scene} from './../setup.js';
import * as layers from './../layers.js';
import * as tools from '../controls/tools.js';
import {mouseDown} from '../controls/map.js';
import {testLevel} from '../levels/testLevel.js';
import * as glow from './glow.js';
import * as C from '../constants.js';

import Plant from '../entities/Plant.js'

let lastClicked;


export class Tile {
	constructor(config) {
		this.scene = scene;
		this.x = config.x * 32 || 0;
		this.y = config.y * 32 || 0;

		this.tile = Array.isArray(config.tile) ? config.tile[C.random(config.tile.length - 1)] : config.tile;
		this.defaultTexture = new PIXI.Texture(PIXI.loader.resources[this.tile].texture);
		
		this.renderTile = new PIXI.Sprite(this.defaultTexture);
		// @Important - Perhaps set a height property that changes the anchor point, in order to have higher walls etc. (see the Plant and trees)
		this.renderTile.scale.set(1, 1);
		this.renderTile.visible = config.visible || false;

		this.glow = new PIXI.Sprite(PIXI.loader.resources['glow-white'].texture);
		this.renderTile.addChild(this.glow);
		this.glow.visible = false;
		this.glow.parentGroup = layers.select;
		
		this.isoX = this.x - this.y;
		this.isoY = (this.x + this.y) / 2;
		this.renderTile.parentGroup = config.layer || layers.defaults;
		this.renderTile.interactive = config.interactive || false;
		this.renderTile.hitArea = new PIXI.Polygon([
			32, 32,
			64, 48,
			32, 64,
			0, 48
		]);
		this.renderTile.position.set(this.isoX + offsetX, this.isoY + offsetY);
		this.scene.addChild(this.renderTile);
		this.renderTile.on('mouseover', () => {
			this.glow.visible = true;
			if (mouseDown) {
				if (tools.currentTool.value !== 'move') {
					testLevel.tiles.forEach(row => {
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
								let loopTile = testLevel.tiles[signY * i + lastClicked.y][signX * j + lastClicked.x];
								tilesToUpdate.push(loopTile);
							}
						}
					}
					if (tools.currentTool.mode == 'line') {
						let midpoint;
						for (let i = 0; i <= Math.abs(diffY); i++) {
							let loopTile = testLevel.tiles[signY * i + lastClicked.y][lastClicked.x];
							tilesToUpdate.push(loopTile);
							if(i == Math.abs(diffY)) midpoint = signY * i;
						}
						for (let j = 0; j <= Math.abs(diffX); j++) {
							let loopTile = testLevel.tiles[lastClicked.y +midpoint][signX * j + lastClicked.x];
							tilesToUpdate.push(loopTile);
						}
					}
					tilesToUpdate.forEach(loopTile => {
						loopTile.glow.setTexture(glow.glowFill);
						if (tools.currentTool.value == 'destroy') {
							loopTile.glow.tint = 0xff0000;
						} else if (tools.currentTool.value =='seed') {
							loopTile.glow.tint = 0xffff00;
						} else {
							loopTile.glow.tint = 0xffffff;
						}
						loopTile.glow.visible = true;
					});
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
			testLevel.getTile(this.x / 32, this.y / 32);
		});
		this.renderTile.on('mouseup', () => {
			if (tools.currentTool.value !== 'move') {
				testLevel.tiles.forEach(row => {
					row.forEach(tile => {
						if (tile.glow.visible) {
							if (tools.currentTool.value == 'build') {
								handleBuild(tile);
							}
							if (tools.currentTool.value == 'destroy') {
								handleDestroy(tile);
							}
							if (tools.currentTool.value == 'seed') {
								handleSeed(tile);
							}
							if (tools.currentTool.value == 'harvest') {
								handleHarvest(tile);
							}
							if (tools.currentTool.value == 'plow') {
								handlePlow(tile);
							}
						}
						tile.glow.visible = false;
						tile.glow.setTexture(glow.glowDefault);
						tile.glow.tint = 0xffffff;

					});
				});
			}
		});
		this.plowed = false;
		this.seeded = false;
		this.plant = new Plant(this, config.plant);
	}

	setPlowed(boolean) {
		this.plowed = boolean;
	}
}

function handleBuild(tile) {
	if (tile.plowed) {
		tile.plowed = false;
		tile.seeded = false;
		tile.plant.reset();
	}

	let newTile = new PIXI.Texture(PIXI.loader.resources[tools.currentTool.tile].texture);
	tile.renderTile.setTexture(newTile);
}

function handleDestroy(tile) {
	tile.plowed = false;
	tile.seeded = false;
	tile.plant.reset();
	tile.renderTile.setTexture(tile.defaultTexture);
}

function handleSeed(tile) {
	if (tile.plowed) tile.plant.seed()
}


function handleHarvest(tile) {
	if (tile.plant.maxStageReached)	tile.plant.reset()
}

function handlePlow(tile) {
	tile.setPlowed(true)
	let newTile = new PIXI.Texture(PIXI.loader.resources[tools.currentTool.tile].texture);
	tile.renderTile.setTexture(newTile);
}