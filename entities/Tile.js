import {offsetX, offsetY, scene} from './../setup.js';
import * as layers from './../layers.js';
import * as tools from '../controls/tools.js';
import {mouseDown} from '../controls/map.js';
import {testLevel} from '../levels/testLevel.js';
import * as glow from './glow.js';
export const random = (max, min) => {
	if (min == undefined) min = 0;
	return Math.round(Math.random() * (max - min) + min);
};
let lastClicked;


export class Tile {
	constructor(config) {
		this.scene = scene;
		this.x = config.x * 32 || 0;
		this.y = config.y * 32 || 0;

		this.tile = Array.isArray(config.tile) ? config.tile[random(config.tile.length - 1)] : config.tile;
		this.defaultTexture = new PIXI.Texture(PIXI.loader.resources[this.tile].texture);
		/* @walls - 
				[1]
			  [2] [3]
			   	[4]
		*/
		
		this.renderTile = new PIXI.Sprite(this.defaultTexture);
		this.renderTile.scale.set(1, 1);
		this.renderTile.visible = config.visible || false;
		this.walls = config.walls || [];
		this.wallContainer = new PIXI.Container();
		this.renderTile.addChild(this.wallContainer);

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
				if (tools.currentTool.value == 'move') {

				}
				if (tools.currentTool.value == 'build' || tools.currentTool.value == 'destroy') {
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
			if (tools.currentTool.value == 'build' || tools.currentTool.value == 'destroy') {
				if (tools.currentTool.type == 'tile') {
					testLevel.tiles.forEach(row => {
						row.forEach(tile => {
							if (tile.glow.visible) {
								if (tools.currentTool.value == 'build') {
									handleBuild(tile);
								}
								if (tools.currentTool.value == 'destroy') {
									handleDestroy(tile);
								}
							}
							tile.glow.visible = false;
							tile.glow.setTexture(glow.glowDefault);
							tile.glow.tint = 0xffffff;

						});
					});
				}
				if (tools.currentTool.type == 'wall') {
					testLevel.tiles.forEach(row => {
						row.forEach(tile => {
							if (tile.glow.visible) {
								console.log('a')
								if (tools.currentTool.value == 'build') {
									tile.setWalls(["wall-x","wall-x"])
									tile.buildWalls();
								}
								if (tools.currentTool.value == 'destroy') {
									tile.setWalls([null, null, null, null])
								}
							}
							tile.glow.visible = false;
							tile.glow.setTexture(glow.glowDefault);
							tile.glow.tint = 0xffffff;
						});
					});
				}
			}
		});
		this.buildWalls();
	}

	setWalls(newWalls) {
		this.wallContainer.children.forEach(child => {
			child.destroy();
		});
		this.wallContainer.children = []
		this.walls = newWalls;
	}

	buildWalls() {
		this.walls.forEach((wall,index) => {
			if (wall) {
				let thisIsoX = 16;
				let thisIsoY = -32;
				let alpha = 1;
				let layer = layers.wall;
				if (index == 1) { thisIsoX -= 16; thisIsoY += 8;}
				if (index == 2) { thisIsoY += 8; thisIsoX += 16; }
				if (index == 3) { thisIsoY += 16; }
				let renderWall = new PIXI.Sprite(PIXI.loader.resources[wall].texture);
				renderWall.scale.set(1, 1);
				renderWall.position.set(thisIsoX, thisIsoY);
				renderWall.alpha = alpha;
				renderWall.parentGroup = layer;
				this.wallContainer.addChild(renderWall);
				renderWall.hitArea = new PIXI.Polygon([
					0,  72,
					16, 66,
					32, 72,
					16, 80
				]);
			}
		});
	}
}

function handleBuild(tile) {
	let newTile = new PIXI.Texture(PIXI.loader.resources[tools.currentTool.tile].texture);
	tile.renderTile.setTexture(newTile);
}

function handleDestroy(tile) {
	tile.renderTile.setTexture(tile.defaultTexture);
}