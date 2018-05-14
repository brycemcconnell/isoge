import Level from './Level.js'
import * as layers from './../layers.js'
import * as C from '../constants.js';
let grid = [];
noise.seed(Math.random());
for (let i = 0; i < 30; i++) {
	grid[i] = [];
	for (let j = 0; j < 30; j++) {
		grid[i][j] = Math.random() > .9 ? 2 : 1;
		var value = noise.simplex2(i / 40, j / 40);
		if (value > 0.5) {
			grid[i][j] = 0;
		}
	}
}
export const testLevel = new Level({
	grid: grid,
	tileset: [
		"floor-water",
		"floor-grass",
		[
			"floor-dirt",
			"floor-grass-rock1",
			"floor-grass-rock2",
			"floor-grass-rock3",
			"floor-grass-dirt1",
			"floor-grass-dirt2",
			"floor-grass-dirt3"
		]
	],
})