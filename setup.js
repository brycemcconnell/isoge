import {app} from './app.js'
import {testLevel} from './levels/testLevel.js'
import * as testUI from './ui/testUI.js'
import * as layers from './layers.js'


export let offsetX = 32 * 7;
export let offsetY = 0;


export let scene;
export let glow;
export default function setup() {
	app.stage = new PIXI.display.Stage();
	app.stage.group.enableSort = true;
	scene = new PIXI.Container();
	app.stage.addChild(scene)
	testUI.init();
	layers.init();

	glow = new PIXI.Sprite(PIXI.loader.resources["glow-white"].texture);
	scene.addChild(glow);
	testLevel.init();
	glow.parentGroup = layers.select
	// glow.visible = false;
	
	/*loop1:
	// for (let i = grid.length - 1; i >= 0; i--) {
		// for (let j = grid[i].length - 1; j >= 0; j--) {
	for (let i = 0; i < 20; i++) {
		for (let j = 0; j < 20; j++) {
			let sprite = grid[i] && grid[i][j] ? tiles[grid[i][j]] : "floor-grass"
			let tile = new PIXI.Sprite(PIXI.loader.resources[sprite].texture);
			tile.scale.set(1, 1);
			tile.interactive = true;

			let x = i * 32;
			let y = j * 32;
			let isoX = x - y;
			let isoY = (x + y) / 2;
			tile.hitArea = new PIXI.Polygon(
				[32, 32,
				 64, 48,
				 32, 64,
				 0, 48])
			tile.position.set(isoX + offsetX, isoY + offsetY);
			
			
			
			tile.parentGroup = defaultLayer
			scene.addChild(tile);
		}
	}

	createWall({
		eastWest: 'east',
		x: 1,
		y: 3,
		type: "wall-x"
	})
	createWall({
		eastWest: 'east',
		x: 1,
		y: 4,
		type: "wall-x"
	})
	createWall({
		eastWest: 'east',
		northSouth: 'north',
		x: 1.5,
		y: 2.5,
		type: "wall-y"
	})
	createWall({
		eastWest: 'east',
		northSouth: 'north',
		x: 2.5,
		y: 2.5,
		type: "wall-y"
	})

	for (let i = 0; i < grid2.length - 1; i++) {
		for (let j = 0; j < grid2[i].length - 1; j++) {
			if (grid2[i][j] !== 0) {
				let sprite = tiles[grid2[i][j]]
				let tile = new PIXI.Sprite(PIXI.loader.resources[sprite].texture);
				tile.scale.set(1, 1);
				let x = i * 32;
				let y = j * 32;
				let isoX = x - y;
				let isoY = (x + y) / 2;
				tile.position.set(isoX + offsetX, isoY + offsetY);
				scene.addChild(tile);
			}
		}
	}*/
	let axisX = new PIXI.Text('X Axis >', {fill: 0xffffff})
	axisX.rotation = .6
	axisX.position.y += 120
	scene.addChild(axisX)
	let axisY = new PIXI.Text('Y Axis >', {fill: 0xffffff})
	axisY.rotation = -.6
	axisY.position.y += 120
	scene.addChild(axisY)
/*
	drawSquare({
		x: 8, y: 9, tile: "floor-wood", walls: ["edge-wall-x-inner", "edge-wall-y-inner", null, null]
	})
	drawSquare({
		x: 9, y: 9, tile: "floor-wood", walls: [null, "wall-y", null, null]
	})
	drawSquare({
		x: 10, y: 9, tile: "floor-wood", walls: [null, "wall-y", "edge-wall-x", null]
	})
	drawSquare({
		x: 10, y: 10, tile: "floor-wood", walls: [null, null, null, null]
	})
	drawSquare({
		x: 9, y: 10, tile: "floor-wood", walls: [null, null, null, null]
	})
	drawSquare({
		x: 8, y: 10, tile: "floor-wood", walls: ["wall-x", null, null, null]
	})
	drawSquare({
		x: 8, y: 11, tile: "floor-wood", walls: ["wall-x", null, null, "wall-y"]
	})
	drawSquare({
		x: 9, y: 11, tile: "floor-wood", walls: [null, null, null, "wall-y"]
	})
	drawSquare({
		x: 10, y: 11, tile: "floor-wood", walls: [null, null, null, "edge-wall-y"]
	})
	scene.scale.set(1, 1)*/
	
}

function createWall(pos) {
	let wallX = pos.x || 0;
	let wallY = pos.y || 0;
	let type = pos.type || "wall"
	let wall = new PIXI.Sprite(PIXI.loader.resources[type].texture);
	wall.scale.set(1, 1);
	let x = wallX * 32;
	let y = wallY * 32;
	let isoX = x - y
	let isoY = (x + y) / 2
	wall.position.set(isoX + offsetX, isoY + offsetY)
	scene.addChild(wall)
}

function drawSquare(config) {
	let x = config.x * 32 || 0
	let y = config.y * 32 || 0
	// @walls - array, 0 N, 1, E, 2 S, 3 W
	let tile = config.tile
	let walls = config.walls || []
	let renderTile = new PIXI.Sprite(PIXI.loader.resources[tile].texture);
	renderTile.scale.set(1, 1);
	let isoX = x - y;
	let isoY = (x + y) / 2;
	renderTile.parentGroup = defaultLayer
	renderTile.interactive = true;
	renderTile.hitArea = new PIXI.Polygon(
				[32, 32,
				 64, 48,
				 32, 64,
				 0, 48])
	renderTile.position.set(isoX + offsetX, isoY + offsetY);
	scene.addChild(renderTile);
	renderTile.on('mouseover', (e) => {
		glow.visible = true;
		glow.position.x = renderTile.position.x
		glow.position.y = renderTile.position.y
	})
	renderTile.on('mouseout', (e) => {
		glow.visible = false;
	})
	walls.forEach((wall,index) => {
		if (wall) {
			let thisIsoX = isoX;
			let thisIsoY = isoY;
			if (index == 0 || index == 1) thisIsoY -= 32
			if (index == 3 || index == 2) thisIsoY -= 16
			if (index == 1 || index == 2) thisIsoX += 32
			let renderTile = new PIXI.Sprite(PIXI.loader.resources[wall].texture);
			renderTile.scale.set(1, 1);
			renderTile.position.set(thisIsoX + offsetX, thisIsoY + offsetY);
			scene.addChild(renderTile);
		}
	})

}