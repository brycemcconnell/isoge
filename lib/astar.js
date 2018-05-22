/*
This function when given a level, will return a path from point a to
b, in the form of an array of tiles. 

*/
let tileData = [];
let cols;
let rows;

class Cell {
	constructor(tile) {
		this.x = tile.x
		this.y = tile.y
		this.f = 0;
		this.g = 0;
		this.h = 0;
		this.solid = tile.solid
		this.previous;
		this.neighbors = [];
		this.type = tile.type
	}
	getNeighbors() {
		let r = [];
		let x = this.x;
		let y = this.y;
		if (x + 1 < rows)    r.push({cell: tileData[y][x + 1], d: 1, dir: "e" });
		if (x - 1 >= 0)      r.push({cell: tileData[y][x - 1], d: 1, dir: "w" });
		if (y + 1 < cols)    r.push({cell: tileData[y + 1][x], d: 1, dir: "s" });
		if (y - 1 >= 0)      r.push({cell: tileData[y - 1][x], d: 1, dir: "n" });
		// diagonals
		if (x - 1 >= 0   && y - 1 >= 0)    r.push({cell: tileData[y - 1][x - 1], d: 1.5, dir: "ne" });
		if (x + 1 < rows && y - 1 >= 0)    r.push({cell: tileData[y - 1][x + 1], d: 1.5, dir: "nw" });
		if (x - 1 >= 0   && y + 1 < cols)  r.push({cell: tileData[y + 1][x - 1], d: 1.5, dir: "sw" });
		if (x + 1 < rows && y + 1 < cols)  r.push({cell: tileData[y + 1][x + 1], d: 1.5, dir: "se" });
		this.neighbors = r;
	}
}

export function aStar(level, startTile, endTile) {
	let start;
	let end;
	cols = level.tileData.length;
	rows = level.tileData[0].length;
	for (let y = 0; y < cols; y++) {
		tileData[y] = new Array();
		for (let x = 0; x < rows; x++) {
			tileData[y][x] = new Cell(level.tileData[y][x]);
		}
	}
	for (let y = 0; y < cols; y++) {
		for (let x = 0; x < rows; x++) {
			tileData[y][x].getNeighbors();

		}
	}
	start = tileData[startTile.y][startTile.x];
	end = tileData[endTile.y][endTile.x];
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