import Tile from './Tile.js'
import * as tools from '../controls/tools.js'
import {testLevel} from '../levels/testLevel.js'
export default class Room {
	constructor(config) {
		this.x1 = config.x1 || 0
		this.y1 = config.y1 || 0
		this.x2 = config.x2 || this.x1 + 3
		this.y2 = config.y2 || this.y1 + 3
		this.sizeX = this.x2 - this.x1
		this.sizeY = this.y2 - this.y1
		/*
			door: coords and what walls
			eg
			{
				coords: x, y,
				door: [0, 1]
			}
		*/
		this.door = config.door || []
	}

	render() {
		for (let i = 0; i < this.sizeX; i++) {
			for (let j = 0; j < this.sizeY; j++) {
				let walls = [];
				if (i == 0) {
					walls[0] = "wall-x"
					walls[1] = "wall-x"
				}
				if (j == 0) {
					walls[0] = "wall-x"
					walls[2] = "wall-x"
				}
				if (i == this.sizeX - 1) {
					walls[2] = "wall-x"
					walls[3] = "wall-x"
				}
				if (j == this.sizeY - 1) {
					walls[1] = "wall-x"
					walls[3] = "wall-x"
				}

				this.door.forEach(doorPair => {
					if (this.x1 + i == doorPair.x && this.y1 + j == doorPair.y) {
						doorPair.fill.forEach(space => {
							walls[space] = null;
						})
					}
				})
				
				testLevel.getTile(j + this.y1, i + this.x1).renderTile.setTexture(new PIXI.Texture(PIXI.loader.resources[tools.currentTool.tile].texture))
				testLevel.getTile(j + this.y1, i + this.x1).setWalls(walls)
				testLevel.getTile(j + this.y1, i + this.x1).buildWalls()
				// let tile = new Tile({
				// 	x: i + this.x1,
				// 	y: j + this.y1,
				// 	tile: "floor-wood",
				// 	walls: walls
				// })
			}
		}
	}
}