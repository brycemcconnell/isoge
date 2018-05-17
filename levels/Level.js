import {Tile} from '../entities/Tile.js'
import AnimatedTile from '../entities/AnimatedTile.js'
import * as C from '../constants.js'
import {bush} from '../plants/bush.js'
import {fish} from '../plants/fish.js'
import {berry_bush} from '../plants/berry_bush.js'
import * as tree from '../plants/tree.js'
export default class Level {
	constructor(config) {
		this.grid = config.grid
		this.tileset = config.tileset
		this.tiles = [];
	}

	init() {
		noise.seed(Math.random())
		this.grid.forEach((row, i) => {
			this.tiles[i] = []
			row.forEach((cell, j) => {
				let isWater = cell == 0 ? true : false;
				let plantType;
				let testTile;
				if (!isWater) {
					var value = noise.simplex2(i / 40, j / 40);
					
					if (value > Math.random()) {
						let newTree = tree.getRandom()
						plantType = newTree;
					}
					if (cell == 1 && C.random(10) > 9) {
						let result = C.random(1)
						plantType = result == 0 ? bush :
						            result == 1 ? berry_bush :
						            null;
					}
					testTile = new Tile({
						tile: this.tileset[cell],
						x: j, 
						y: i,
						interactive: true,
						water: false,
						plant: plantType
					});
					let colV = Math.max(0.7, Math.random());
					if (Math.random() > .5 && testTile.plant) testTile.plant.sprite.tint =`0x${PIXI.utils.rgb2hex([colV, colV, colV]).toString(16)}`
				} else {
					if (Math.random() > .9) {
						plantType = fish;
					}
					testTile = new Tile({
						tile: this.tileset[cell],
						x: j, 
						y: i,
						interactive: true,
						water: true,
						plant: plantType,
						animated: true,
					});
				}
				

				this.tiles[i].push(testTile)
			})
		})
		this.updateCulling();
	}

	getTile(x, y) {
		return this.tiles[x][y]
	}

	updateCulling() {
		this.tiles.forEach((row, i) => {
			row.forEach((cell, j) => {
				let pos = cell.renderTile.toGlobal(new PIXI.Point(0, 0))
				if (pos.x < -256 || pos.y < -256 || pos.x > C.CANVAS_SIZEX || pos.y > C.CANVAS_SIZEY -32) {
					cell.renderTile.visible = false
				} else {
					cell.renderTile.visible = true
				}
			})
		})
	}

}
