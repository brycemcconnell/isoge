import * as textures from '../textures.js';
export class PlayerBuilding {
	constructor(tile, data) {
		this.parent = tile;
		this.pixiParent = tile.renderTile;
		this.sprite = new PIXI.Sprite(textures.floorWood);
		this.sprite.position.y = 10;
		this.pixiParent.addChild(this.sprite);
		console.log('created')
	}

	reset() {
		this.sprite.destroy();
	}
}