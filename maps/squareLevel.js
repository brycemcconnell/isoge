import * as C from '../constants.js';

export function create() {
	let grid = [];
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
	return grid;
}