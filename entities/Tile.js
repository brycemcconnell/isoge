import {offsetX, offsetY, scene, glow} from './../setup.js'
import * as layers from './../layers.js'
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
		// @walls - array, 0 N, 1, E, 2 S, 3 W
		this.walls = config.walls || []
		this.renderTile = new PIXI.Sprite(PIXI.loader.resources[this.tile].texture);
		this.renderTile.scale.set(1, 1);
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
		})
		this.renderTile.on('mouseout', (e) => {
			glow.visible = false;
		})
		this.walls.forEach((wall,index) => {
			if (wall) {
				let thisIsoX = this.isoX + 16;
				let thisIsoY = this.isoY - 32;
				let alpha = 1;
				let layer = layers.wall
				if (index == 1) { thisIsoY += 8; thisIsoX += 16 }
				if (index == 2) { thisIsoY += 16; /*thisIsoX += 16*/ }
				if (index == 3) { thisIsoX -= 16; thisIsoY += 8;}
				// if (index == 0 || index == 1) thisIsoY -= 32
				// if (index == 3 || index == 2) { thisIsoY -= 32; alpha = .5; /*layer = layers.dynamicFront*/}
				// if (index == 1 || index == 2) thisIsoX += 32
				let renderWall = new PIXI.Sprite(PIXI.loader.resources[wall].texture);
				renderWall.scale.set(1, 1);
				renderWall.position.set(thisIsoX + offsetX, thisIsoY + offsetY);
				renderWall.alpha = alpha;
				renderWall.parentGroup = layer
				this.scene.addChild(renderWall);
			}
		})
	}
}