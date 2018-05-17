import Level from './Level.js'
import * as layers from './../layers.js'
import * as C from '../constants.js';
import * as textures from '../textures.js'
let grid = [];
export let level;


export function createLevel() {
	noise.seed(Math.random());
	for (let i = 0; i < 40; i++) {
		grid[i] = [];
		for (let j = 0; j < 40; j++) {
			// grid[i][j] = 1
			grid[i][j] = Math.random() > .9 ? 3 :
						 Math.random() > .8 ? 2 : 1;
			var value = noise.simplex2(i / 40, j / 40);
			if (value > 0.5) {
				grid[i][j] = 0;
			}
		}
	}

	level = new Level({
		grid: grid,
		tileset: [
			textures.water,
			textures.floorGrass,
			textures.floorDirt,
			[
				textures.floorGrassRock1,
				textures.floorGrassRock2,
				textures.floorGrassRock3,
				textures.floorGrassDirt1,
				textures.floorGrassDirt2,
				textures.floorGrassDirt3,
			]
		],
	})
}