import {Tile} from '../entities/Tile.js'
import AnimatedTile from '../entities/AnimatedTile.js'
import {Crystal} from '../entities/Crystal.js'
import * as C from '../constants.js'
import {bush} from '../plants/bush.js'
import {fish} from '../plants/fish.js'
import {berry_bush} from '../plants/berry_bush.js'
import * as tree from '../plants/tree.js'
import * as textures from '../textures.js';
import {scene} from '../setup.js';
export default class Level {
	constructor(config) {
		this.grid = config.grid
		this.tileset = config.tileset
		this.tiles = [];
	}

	init() {
		noise.seed(Math.random())
		this.grid.forEach((row, i) => {
			this.tiles[i] = new Array();
			row.forEach((cell, j) => {
				let testTile;
				if (Object.values(this.tileset)[cell] !== null) {
					let isWater = Object.keys(this.tileset)[cell] == 'water' ? true : false;
					// let isWater = true;
					let plantType;
					if (!isWater) {
						var value = noise.simplex2(i / 40, j / 40);
						if (value > Math.random()) {
							let newTree = tree.getRandom()
							plantType = newTree;
						}
						if (cell == 2 && C.random(10) > 9) {
							let result = C.random(1)
							plantType = result == 0 ? bush :
							            result == 1 ? berry_bush :
							            null;
						}
						testTile = new Tile({
							tile: Object.values(this.tileset)[cell],
							x: j, 
							y: i,
							interactive: true,
							water: false,
							plant: plantType,
							type: Object.keys(this.tileset)[cell]
						});
						let colV = Math.max(0.7, Math.random());
						if (Math.random() > .5 && testTile.plant) testTile.plant.sprite.tint =`0x${PIXI.utils.rgb2hex([colV, colV, colV]).toString(16)}`
					} else {
						if (Math.random() > .9) {
							plantType = fish;
						}
						testTile = new Tile({
							tile: textures.water,
							x: j, 
							y: i,
							interactive: true,
							water: true,
							plant: plantType,
							animated: true,
							animationSpeed: .1,
							type: "water"
						});
					}
				}
				this.tiles[i].push(testTile)
				
			})
		});
		
	
		this.updateCulling();
		return true;
	}

	getTile(x, y) {
		if (this.tiles[y]) return this.tiles[y][x]
	}

	updateCulling() {
		let cullNegX = -256 + 256;
		let cullNegY = -256  + 256;
		let cullX = C.CANVAS_SIZEX - 64;
		let cullY = C.CANVAS_SIZEY - 32 - 64;
		// this.tiles.forEach((row, i) => {
		// 	row.forEach((cell, j) => {
		// 		if (cell) {
		// 			let pos = cell.renderTile.toGlobal(new PIXI.Point(0, 0))
		// 			if (pos.x < cullNegX || pos.y < cullNegY || pos.x > cullX || pos.y > cullY) {
		// 				cell.renderTile.visible = false
		// 			} else {
		// 				cell.renderTile.visible = true
		// 			}
		// 		}
		// 	})
		// })
	}

	generateCrystal() {
		let candidates = [];
		this.tiles.forEach((row, i) => {
			row.forEach((cell, j) => {
				if (cell) {
					if (!cell.occupant && !cell.isWater) {
						candidates.push(cell);
					}
				}
			});
		});
		let chosenTile = candidates[C.random(candidates.length)];
		chosenTile.occupant = new Crystal(chosenTile);
		console.log(chosenTile)
	}

	render() {
		let waterTiles = [];
		let landTiles = [];
		this.tiles.forEach(row => {
			row.forEach(cell => {
				if (cell && !cell.water) {
					landTiles.push(cell)
				}
				if (cell && cell.water) {
					waterTiles.push(cell);
				}
			})
		})
		waterTiles.forEach(cell => {
			let renderCell = new PIXI.extras.AnimatedSprite(cell.tile);
			renderCell.position.set(cell.isoX, cell.isoY)
			renderCell.animationSpeed = cell.animationSpeed
			renderCell.gotoAndPlay(0);
			renderCell.anchor.set(.5, 1);
			scene.addChild(renderCell)
			handleEdges(this.tiles, cell, renderCell)
			if (cell.occupant) {
				let occupant = new PIXI.extras.AnimatedSprite(cell.occupant.textures);
				occupant.anchor.set(.5, 1)
				occupant.gotoAndPlay(C.random(occupant.totalFrames));
				occupant.animationSpeed = .15
				if (Math.random() > .5) {
					occupant.scale.set(-1, 1);
				}
				occupant.onLoop = () => {occupant.stop(); setTimeout(() => occupant.play(), C.random(5000,1000));};
				renderCell.addChild(occupant)
			}
		}) 
		landTiles.forEach(cell => {
			let renderCell = new PIXI.Sprite(cell.tile);
			renderCell.position.set(cell.isoX, cell.isoY)
			renderCell.anchor.set(.5, 1);
			if (Math.random() > .5) {
				renderCell.scale.set(-1, 1);
			}
			scene.addChild(renderCell)
			if (cell.occupant) {
				let occupant = new PIXI.Sprite(cell.occupant.textures);
				occupant.anchor.set(.5, 1)
				occupant.position.y = -8;
				renderCell.addChild(occupant)
				if (Math.random() > .5) {
					occupant.scale.set(-1, 1);
				}
				if (Math.random() > .5) {
					occupant.tint = `0xbbbbbb`;
				}
			}
		})
	}
}



function handleEdges(tiles, cell, pixiObj) {
	let south = tiles[cell.x][cell.y + 1];
	let east = tiles[cell.x + 1];
	if (tiles[cell.x + 1]) {
		east = tiles[cell.x + 1][cell.y];
	}
	let waterfall;
	if (south == null && east != null) {
		waterfall = new PIXI.extras.AnimatedSprite(textures.waterEdgeSouth);
	}
	
	if (east == null && south != null) {
		waterfall = new PIXI.extras.AnimatedSprite(textures.waterEdgeEast);
	}

	if (east == null && south == null) {
		waterfall = new PIXI.extras.AnimatedSprite(textures.waterEdgeSouthEast);
	}
	if (waterfall) {
		waterfall.gotoAndPlay(0);
		waterfall.anchor.set(.5, 1);
		waterfall.animationSpeed = .1
		waterfall.position.y = 96;
		pixiObj.addChild(waterfall)
	}
}