import {Tile} from '../entities/Tile.js'
import AnimatedTile from '../entities/AnimatedTile.js'
import {Crystal} from '../entities/Crystal.js'
import * as C from '../constants.js'
import {bush} from '../plants/bush.js'
import {fish} from '../plants/fish.js'
import {berry_bush} from '../plants/berry_bush.js'
import * as tree from '../plants/tree.js'
import * as textures from '../textures.js';
import {scene, bob} from '../setup.js';
import * as eventUpdateHandler from '../game/eventUpdateHandler.js';
export default class Level {
	constructor(mapData) {
		this.grid = mapData
		this.tileset = {
			"null": null,
			"water":textures.water,
			"grass":textures.floorGrass,
			"dirt":textures.floorDirt,
			"grassRock1": textures.floorGrassRock1,
			"grassRock2": textures.floorGrassRock2,
			"grassRock3": textures.floorGrassRock3,
			"grassDirt1": textures.floorGrassDirt1,
			"grassDirt2": textures.floorGrassDirt2,
			"grassDirt3": textures.floorGrassDirt3
		}
		this.tileData = [];
		this.graphicObjects = [];
	}

	createTileData() {
		noise.seed(Math.random())
		this.grid.forEach((row, i) => {
			this.tileData[i] = new Array();
			row.forEach((cell, j) => {
				let testTile;
				if (Object.values(this.tileset)[cell] !== null) {
					let isWater = Object.keys(this.tileset)[cell] == 'water' ? true : false;
					// let isWater = true;
					let plantType;
					let solid = isWater ? true : false;
					if (!isWater) {
						var value = noise.simplex2(i / 40, j / 40);
						if (value > Math.random()) {
							let newTree = tree.getRandom()
							plantType = newTree;
							solid = true;
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
							type: Object.keys(this.tileset)[cell],
							height: 6,
							solid: solid
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
							type: "water",
							solid: solid
						});
					}
				}
				this.tileData[i].push(testTile)
			})
		});
		return true;
	}

	getTileData(x, y) {
		if (this.tileData[x]) return this.tileData[x][y]
	}
	getGraphicObject(x, y) {
		let index = x * this.tileData[x].length + y;
		if (this.graphicObjects[index]) return this.graphicObjects[index]
	}

	updateCulling() {
		let cullNegX = -64 //+ 320;
		let cullNegY = -64 //+ 384;
		let cullX = C.CANVAS_SIZEX +64//- 64;
		let cullY = C.CANVAS_SIZEY +64 //- 64;
		this.graphicObjects.forEach(cell => {
			if (cell) {
				let pos = cell.toGlobal(new PIXI.Point(0, 0));
				if (pos.x < cullNegX || pos.y < cullNegY || pos.x > cullX || pos.y > cullY) {
					cell.visible = false;
				} else {
					cell.visible = true;
				}
			}
		})
	}

	/*
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
	*/

	render() {

		this.tileData.forEach(row => {
			row.forEach(cell => {
				let renderCell;
				if (cell) {
					if (!cell.water) {
						renderCell = new PIXI.Sprite(cell.tile);
						renderCell.position.set(cell.isoX, cell.isoY)
						renderCell.anchor.set(.5, 1);
						if (Math.random() > .5) {
							renderCell.scale.set(-1, 1);
						}
						scene.addChild(renderCell)
						if (cell.occupant) {
							let occupant = new PIXI.Sprite(cell.occupant.textures);
							occupant.anchor.set(.5, 1)
							occupant.position.y = -cell.height;
							renderCell.addChild(occupant)
							if (Math.random() > .5) {
								occupant.scale.set(-1, 1);
							}
							if (Math.random() > .5) {
								occupant.tint = `0xbbbbbb`;
							}
						}
					}
					if (cell.water) {
						renderCell = new PIXI.extras.AnimatedSprite(cell.tile);
						renderCell.position.set(cell.isoX, cell.isoY)
						renderCell.animationSpeed = cell.animationSpeed
						renderCell.gotoAndPlay(0);
						renderCell.anchor.set(.5, 1);
						scene.addChild(renderCell)
						handleEdges(this.tileData, cell, renderCell)
						if (cell.occupant) {
							let occupant = new PIXI.extras.AnimatedSprite(cell.occupant.textures);
							occupant.anchor.set(.5, 1)
							occupant.gotoAndPlay(C.random(occupant.totalFrames));
							occupant.animationSpeed = .15
							if (Math.random() > .5) {
								occupant.scale.set(-1, 1);
							}
							occupant.userData = {};
							occupant.onLoop = () => {
								occupant.stop();
								occupant.userData.counter = 0
								occupant.userData.countMax = C.random(300, 60);
								occupant.handleUpdate = occupant.userData.handleUpdate = () => {
									occupant.userData.counter += 1;
									if (occupant.userData.counter > occupant.userData.countMax) {
										occupant.play();
										eventUpdateHandler.remove(occupant);
									}
								}
								eventUpdateHandler.add(occupant); 
							};
							renderCell.addChild(occupant)
						}
					}

					// Apply the hitArea defined in the tileData
					renderCell.hitArea = new PIXI.Polygon(cell.hitArea);
					// Supposed performance boost.
					renderCell.interactiveChildren = false;
					renderCell.interactive = true;
					renderCell.on('mouseover', () => renderCell.tint = 0xff5555);
					renderCell.on('mouseout', () => renderCell.tint = 0xffffff);
					renderCell.on('click', () => {
						// bob.changeTile(renderCell, cell)
						bob.moveTo(cell);
						// console.log(bob)
					})
					// set all cells on creation to invisible,
					// we will set culling on completion of render
					renderCell.visible = false;
				}
				cell.graphicObject = renderCell;
				renderCell.tileData = cell;
				this.graphicObjects.push(renderCell);
			})
		})
		// Finished rendering, now cull and set
		// tiles in the viewport to visible
		// console.log(this.tileData)
		this.updateCulling();
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

export function createLevel(mapData) {
	return new Level(mapData);
}