import Level from './Level.js'
import * as layers from './../layers.js'

let grid = [];
for (let i = 0; i < 24; i++) {
	grid[i] = [];
	for (let j = 0; j < 24; j++) {
		grid[i][j] = 2
	}
}
export const testLevel = new Level({
	grid: grid,
	tileset: [
		"floor-grass",
		"floor-wood",
		[
			"floor-grass",
			"floor-grass",
			"floor-grass",
			"floor-grass",
			"floor-grass",
			"floor-grass",
			"floor-grass",
			"floor-grass",
			"floor-grass",
			"floor-grass",
			"floor-grass",
			"floor-grass",
			"floor-grass-rock1",
			"floor-grass-rock2",
			"floor-grass-rock3",
			"floor-grass-dirt1",
			"floor-grass-dirt2",
			"floor-grass-dirt3"
		],
		"elevated-floor-wood",
		"floor-grass",
		"floor-grass"
	],
	custom: {
		testTile1: {
			tile: "floor-wood",
			x: 5, 
			y: 5,
			walls: ["wall-x", null, null, null],
			layer: layers.floor
		},
		testTile2: {
			tile: "floor-wood",
			x: 7, 
			y: 5,
			walls: [null, "wall-x"],
			layer: layers.floor
		},
		testTile3: {
			tile: "floor-wood",
			x: 9, 
			y: 5,
			walls: [null, null, "wall-x"],
			layer: layers.floor
		},
		testTile4: {
			tile: "floor-wood",
			x: 11, 
			y: 5,
			walls: [null, null, null, "wall-x"],
			layer: layers.floor
		},
	}

})