import Tile from '../entities/Tile.js'
import Room from '../entities/Room.js'
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
		// for (let obj in this.custom) {
		// 	new Tile(this.custom[obj])
		// }
		let testRoom = new Room({
			x1: 8,
			y1: 8,
			x2: 13,
			y2: 13,
			door: [
				{
					x: 12,
					y: 11,
					fill: [2, 3]
				}
			]
		});
		testRoom.render();
		let testRoom2 = new Room({
			x1: 13,
			y1: 10,
			x2: 17,
			y2: 16,
			door: [
				{
					x: 13,
					y: 11,
					fill: [0, 1]
				},
				{
					x: 16,
					y: 14,
					fill: [2, 3]
				}
			]
		});
		testRoom2.render();
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
