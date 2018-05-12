import {offsetX, offsetY, scene, glow} from './../setup.js'
import * as layers from './../layers.js'
import * as tools from '../controls/tools.js'
import {mouseDown} from '../controls/map.js'
import {testLevel} from '../levels/testLevel.js'
export const random = (max, min) => {
  if (min == undefined) min = 0
  return Math.round(Math.random() * (max - min) + min);
};

export default class Tile {
	constructor(config) {
		this.scene = scene
		this.x = config.x * 32 || 0
		this.y = config.y * 32 || 0

		this.tile = Array.isArray(config.tile) ? config.tile[random(config.tile.length - 1)] : config.tile;
		this.defaultTexture = new PIXI.Texture(PIXI.loader.resources[this.tile].texture)
		/* @walls - 
				[1]
			  [2] [3]
			   	[4]
		*/
		
		this.renderTile = new PIXI.Sprite(this.defaultTexture);
		this.renderTile.scale.set(1, 1);
		this.renderTile.visible = config.visible || false
		this.walls = config.walls || []
		this.wallContainer = new PIXI.Container()
		this.renderTile.addChild(this.wallContainer)

		
		
		this.isoX = this.x - this.y;
		this.isoY = (this.x + this.y) / 2;
		this.renderTile.parentGroup = config.layer || layers.defaults
		this.renderTile.interactive = config.interactive || false;
		this.renderTile.hitArea = new PIXI.Polygon(
					[32, 32,
					 64, 48,
					 32, 64,
					 0, 48])
		this.renderTile.position.set(this.isoX + offsetX, this.isoY + offsetY);
		this.scene.addChild(this.renderTile);
		this.renderTile.on('mouseover', (e) => {
			glow.visible = true;
			glow.position.x = this.renderTile.position.x
			glow.position.y = this.renderTile.position.y
			if (mouseDown) {
				if (tools.currentTool.value == 'build') {
					handleBuild(this)
				}
				if (tools.currentTool.value == 'destroy') {
					handleDestroy(this)
				}
			}
		})
		this.renderTile.on('mousedown', () => {
			if (tools.currentTool.value == 'build') {
				handleBuild(this)
			}
			if (tools.currentTool.value == 'destroy') {
				handleDestroy(this)
			}
		})
		this.renderTile.on('mouseout', (e) => {
			glow.visible = false;
		})
		this.renderTile.on('click', (e) => {
			console.log(this.x / 32, this.y / 32)
			testLevel.getTile(this.y / 32, this.x / 32)
			// if (tools.currentTool.value == 'move') {
			// 	console.log('move mode')
			// }
			
		})
		this.buildWalls()
	}

	setWalls(newWalls) {
		this.wallContainer.children.forEach(child => {
			child.destroy();
		})
		this.walls = newWalls;
	}

	buildWalls() {
		this.walls.forEach((wall,index) => {
			if (wall) {
				let thisIsoX = 16;
				let thisIsoY = -32;
				let alpha = 1;
				let layer = layers.wall
				if (index == 1) { thisIsoX -= 16; thisIsoY += 8;}
				if (index == 2) { thisIsoY += 8; thisIsoX += 16 }
				if (index == 3) { thisIsoY += 16; /*thisIsoX += 16*/ }
				// if (index == 0 || index == 1) thisIsoY -= 32
				// if (index == 3 || index == 2) { thisIsoY -= 32; alpha = .5; /*layer = layers.dynamicFront*/}
				// if (index == 1 || index == 2) thisIsoX += 32
				let renderWall = new PIXI.Sprite(PIXI.loader.resources[wall].texture);
				renderWall.scale.set(1, 1);
				renderWall.position.set(thisIsoX, thisIsoY);
				renderWall.alpha = alpha;
				renderWall.parentGroup = layer
				this.wallContainer.addChild(renderWall);
				renderWall.hitArea = new PIXI.Polygon(
					[0,  72,
					 16, 66,
					 32, 72,
					 16, 80])
			}
		})

	}
}

function handleBuild(tile) {
	let newTile = new PIXI.Texture(PIXI.loader.resources[tools.currentTool.tile].texture);
	tile.renderTile.setTexture(newTile)

}

function handleDestroy(tile) {
	tile.renderTile.setTexture(tile.defaultTexture)
}