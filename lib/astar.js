/*
This function when given a level, will return a path from point a to
b, in the form of an array of tiles. 

*/
let tileData = [];
let cols;
let rows;

class Cell {
	constructor(tile) {
		this.y = tile.x
		this.x = tile.y
		this.f = 0;
		this.g = 0;
		this.h = 0;
		this.solid = tile.solid
		this.previous;
		this.neighbors = [];
	}
	getNeighbors() {
		let x = this.x;
		let y = this.y;
		let r = [];
		if (y + 1 < rows)    r.push({cell: tileData[y + 1][x], d: 1});
		if (y - 1 >= 0)      r.push({cell: tileData[y - 1][x], d: 1});
		if (x + 1 < cols)    r.push({cell: tileData[y][x + 1], d: 1});
		if (x - 1 >= 0)      r.push({cell: tileData[y][x - 1], d: 1});
		// diagonals
		if (y - 1 >= 0   && x - 1 >= 0)    r.push({cell: tileData[y - 1][x - 1], d: 1.5});
		if (y + 1 < rows && x - 1 >= 0)    r.push({cell: tileData[y + 1][x - 1], d: 1.5});
		if (y - 1 >= 0   && x + 1 < cols)  r.push({cell: tileData[y - 1][x + 1], d: 1.5});
		if (y + 1 < rows && x + 1 < cols)  r.push({cell: tileData[y + 1][x + 1], d: 1.5});
		this.neighbors = r;
	}
}

export function aStar(level, startTile, endTile) {
	let start;
	let end;
	cols = level.tileData.length;
	rows = level.tileData[0].length;
	for (let i = 0; i < cols; i++) {
		tileData[i] = new Array();
		for (let j = 0; j < rows; j++) {
			tileData[i][j] = new Cell(level.tileData[j][i]);
		}
	}
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			tileData[i][j].getNeighbors();
		}
	}
	start = tileData[startTile.x][startTile.y];
	end = tileData[endTile.x][endTile.y];
	if (end.solid) {
		return null;
	}
	const openSet = [];
	const closedSet = [];
	let path = [];

	openSet.push(start);
	while (openSet.length > 0) {
		let winner = 0;
		for (var i = 0; i < openSet.length; i ++) {
			if (openSet[i].f < openSet[winner].f) {
				winner = i;
			}
		}
		let current = openSet[winner];
		if (current == end) {
			let temp = current;
			path.push(temp);
			while (temp.previous) {
				path.push(temp.previous);
				temp = temp.previous;
			}
			// Find the path
			console.log("Path found!");
			// Path found, return path.
			return path;
		} else {

			removeFromArray(openSet, current);
			closedSet.push(current);
			
			let neighbors = current.neighbors;
			for (let i = 0; i < neighbors.length; i++) {
				
				let neighbor = neighbors[i].cell;
				let distance = neighbors[i].d;
				if (!closedSet.includes(neighbor) && !neighbor.solid) {
					let tempG = current.g + distance;
					let newPath = false;
					if (openSet.includes(neighbor)) {

						if (tempG < neighbor.g) {

							neighbor.g = tempG;
							newPath = true;
						}
					} else {

						neighbor.g = tempG;
						openSet.push(neighbor);
						newPath = true;
					}
					if (newPath) {
						neighbor.h = heuristic(neighbor, end);
						neighbor.f = neighbor.g + neighbor.h;
						neighbor.previous = current;
					}
					
				}
			}
		}
	}
	// Np path was found, return nothing
	return null;
}

function heuristic(a, b) {
	// Distance
	return Math.hypot(a.x - b.x, a.y - b.y);
	// Manhattan
	// return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function removeFromArray(arr, elt) {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] == elt) {
			arr.splice(i, 1);
		}
	}
} 