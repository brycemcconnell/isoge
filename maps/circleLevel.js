import * as C from '../constants.js';

export function create() {
	let grid = [];
	let radius = 20;
	noise.seed(Math.random());
	for (let i = 0; i < radius*2; i++) {
		grid[i] = [];
		for (let j = 0; j < radius*2; j++) {
			let d = Math.sqrt((i-radius)*(i-radius)+(j-radius)*(j-radius))
			grid[i][j] = 0;
			if (d < radius) {
				grid[i][j] = Math.random() > .9 ? 4 :
						 Math.random() > .8 ? 3 : 2;
				var value = noise.simplex2(i / 40, j / 40);
				if (value > 0.5) {
					grid[i][j] = 1;
				}
			}
		}
	}
	return grid;	
}