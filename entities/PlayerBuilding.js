import * as textures from '../textures.js';
export class PlayerBuilding {
	constructor(tile, data) {
		this.parent = tile;
		this.pixiParent = tile.renderTile;
		this.sprite = new PIXI.Sprite(textures[data.textures]);
		// this.sprite.position.y = 10;
		this.sprite.anchor.set(.25, .5)
		this.pixiParent.addChild(this.sprite);
		console.log(this)
	}

	reset() {
		this.sprite.destroy();
	}
}