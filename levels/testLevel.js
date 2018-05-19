import Level from './Level.js'
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
			grid[i][j] = Math.random() > .9 ? C.random(4, 9) :
						 Math.random() > .8 ? 3 : 2;
			var value = noise.simplex2(i / 40, j / 40);
			if (value > 0.5) {
				grid[i][j] = 1;
			}
		}
	}

	level = new Level({
		grid: grid,
		tileset: {
			"null": null,
			"water":textures.water,
			"grass":textures.floorGrass,
			"dirt":textures.floorDirt,
			"grassRock1": textures.floorGrassRock1,
			"grassRock2": textures.floorGrassRock2,
			"grassRock3": textures.floorGrassRock3,
			"grassDirt1": textures.floorGrassDirt1,
			"grassDirt2": textures.floorGrassDirt2,
			"grassDirt3": textures.floorGrassDirt3,
		},
	})
}