import {Tile} from '../entities/Tile.js'
import AnimatedTile from '../entities/AnimatedTile.js'
import * as C from '../constants.js'
import {bush} from '../plants/bush.js'
import {fish} from '../plants/fish.js'
import {berry_bush} from '../plants/berry_bush.js'
import * as tree from '../plants/tree.js'
import * as textures from '../textures.js';
export default class Level {
	constructor(config) {
		this.grid = config.grid
		this.tileset = config.tileset
		this.tiles = [];
	}

	init() {
		noise.seed(Math.random())
		this.grid.forEach((row, i) => {
			this.tiles[i] = new Array();
			row.forEach((cell, j) => {
				let testTile;
				if (Object.values(this.tileset)[cell] !== null) {
					let isWater = Object.keys(this.tileset)[cell] == 'water' ? true : false;
					// let isWater = true;
					let plantType;
					if (!isWater) {
						var value = noise.simplex2(i / 40, j / 40);
						if (value > Math.random()) {
							let newTree = tree.getRandom()
							plantType = newTree;
						}
						if (cell == 2 && C.random(10) > 9) {
							let result = C.random(1)
							plantType = result == 0 ? bush :
							            result == 1 ? berry_bush :
							            null;
						}
						testTile = new Tile({
							tile: Object.values(this.tileset)[cell],
							x: j, 
							y: i,
							interactive: true,
							water: false,
							plant: plantType,
							type: Object.keys(this.tileset)[cell]
						});
						let colV = Math.max(0.7, Math.random());
						if (Math.random() > .5 && testTile.plant) testTile.plant.sprite.tint =`0x${PIXI.utils.rgb2hex([colV, colV, colV]).toString(16)}`
					} else {
						if (Math.random() > .9) {
							plantType = fish;
						}
						testTile = new Tile({
							tile: textures.water,
							x: j, 
							y: i,
							interactive: true,
							water: true,
							plant: plantType,
							animated: true,
							type: "water"
						});
					}
				}
				this.tiles[i].push(testTile)
				
			})
		})

		this.tiles.forEach(row => {
			row.forEach(cell => {
				if (cell && cell.type == 'water') {
					let south = this.tiles[cell.x][cell.y + 1];
					let east = this.tiles[cell.x + 1];
					if (this.tiles[cell.x + 1]) {
						east = this.tiles[cell.x + 1][cell.y];
					}
					if (south == null && east != null) {
						let waterfall = new PIXI.extras.AnimatedSprite(textures.waterEdgeSouth);
						waterfall.gotoAndPlay(0);
						waterfall.anchor.set(0, -.255);
						waterfall.animationSpeed = .1
						cell.renderTile.addChild(waterfall)
					}
					
					if (east == null && south != null) {
						let waterfall = new PIXI.extras.AnimatedSprite(textures.waterEdgeEast);
						waterfall.gotoAndPlay(0);
						waterfall.anchor.set(0, -.255);
						waterfall.animationSpeed = .1
						cell.renderTile.addChild(waterfall)
					}

					if (east == null && south == null) {
						let waterfall = new PIXI.extras.AnimatedSprite(textures.waterEdgeSouthEast);
						waterfall.gotoAndPlay(0);
						waterfall.anchor.set(0, -.25);
						waterfall.animationSpeed = .1
						cell.renderTile.addChild(waterfall)
					}
				}
			});
		});
		
		this.updateCulling();
		return true;
	}

	getTile(x, y) {
		if (this.tiles[y]) return this.tiles[y][x]
	}

	updateCulling() {
		this.tiles.forEach((row, i) => {
			row.forEach((cell, j) => {
				if (cell) {
					let pos = cell.renderTile.toGlobal(new PIXI.Point(0, 0))
					if (pos.x < -256 || pos.y < -256 || pos.x > C.CANVAS_SIZEX || pos.y > C.CANVAS_SIZEY -32) {
						cell.renderTile.visible = false
					} else {
						cell.renderTile.visible = true
					}
				}
			})
		})
	}

}
