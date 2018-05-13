import {Tile} from '../entities/Tile.js'
import * as C from '../constants.js'
export default class Level {
	constructor(config) {
		// this.background;
		this.grid = config.grid
		this.tileset = config.tileset
		// this.custom = config.custom
		this.tiles = [];
	}

	init() {
		this.grid.forEach((row, i) => {
			this.tiles[i] = []
			row.forEach((cell, j) => {
				let visibleState = (i > 10 || j > 10) ? false : true
				let testTile = new Tile({
					tile: this.tileset[cell],
					x: j, 
					y: i,
					interactive: true,
					visible: visibleState
				})
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
				if (pos.x < -32 || pos.y < -32 || pos.x > C.CANVAS_SIZEX -64 || pos.y > C.CANVAS_SIZEY -64) {
					cell.renderTile.visible = false
				} else {
					cell.renderTile.visible = true
				}
			})
		})
	}
}
