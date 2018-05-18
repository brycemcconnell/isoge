import Level from './Level.js'
import * as layers from './../layers.js'
import * as C from '../constants.js';
import * as textures from '../textures.js'
let grid = [];
export let level;


export function createLevel() {
	noise.seed(Math.random());
	for (let i = 0; i < 100; i++) {
		grid[i] = [];
		for (let j = 0; j < 100; j++) {
			grid[i][j] = Math.random() > .9 ? 4 :
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
			"water": textures.water,
			"grass":textures.floorGrass,
			"dirt":textures.floorDirt,
			"grassDoodad":[
				textures.floorGrassRock1,
				textures.floorGrassRock2,
				textures.floorGrassRock3,
				textures.floorGrassDirt1,
				textures.floorGrassDirt2,
				textures.floorGrassDirt3,
			]
		},
	})

	
}