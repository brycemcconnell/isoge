import Tile from '../entities/Tile.js'

export default class Level {
	constructor(config) {
		// this.background;
		this.grid = config.grid
		this.tileset = config.tileset
		this.custom = config.custom
	}

	init() {
		this.grid.forEach((row, i) => {
			row.forEach((cell, j) => {
				let testTile = new Tile({
					tile: this.tileset[cell],
					x: j, 
					y: i,
					interactive: true
				})
			})
		})
		for (let obj in this.custom) {
			console.log(obj)
			new Tile(this.custom[obj])
		}
	}
}
