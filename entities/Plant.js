import * as plantTextures from '../resources/plant.js'
import {dateTime} from '../game.js'
export default class Plant {
	constructor(tile, plant_config = {}) {
		this.tile = tile;
		// Plant Config vars, these change on instancing the plant
		this.growthHours = plant_config.growthHours || 24
		this.maxStage = plant_config.maxStage || 6;
		this.wilt = plant_config.wilt || 12; // hours after max stage reached
		this.perish = plant_config.perish || 24; // hours after max stage reached

		this.growRate = Math.floor(this.growthHours / this.maxStage)

		// These vars change dynamically
		this.stage = 0;
		this.growthSoFar = 0;
		this.wiltSet = 0; // holders used 
		this.perishSet = 0; // holders used 
		this.maxStageReached = false;

		this.datePlanted;
		this.harvestExpected;

		this.sprite = new PIXI.Sprite(plantTextures.textures[0]);
		this.sprite.visible = false;

		this.tile.renderTile.addChild(this.sprite)
	}

	seed() {
		this.datePlanted = dateTime;
		this.harvestExpected = dateTime + this.growthHours;
		this.tile.seeded = true;
		this.sprite.setTexture(plantTextures.textures[this.stage]);
		this.sprite.visible = true;
		this.sprite.tint = 0xffffff
	}

	grow() {
		this.stage = this.stage < this.maxStage ? this.stage + 1 : this.stage;
		this.sprite.setTexture(plantTextures.textures[this.stage]);
	}

	reset() {
		this.stage = 0;
		this.tile.seeded = false;
		this.sprite.visible = false;
		this.maxStageReached = false;
		this.wiltSet = 0;
		this.perishSet = 0;
	}

	changePlantConfig(plant_config) {
		// Plant Config vars, these change on instancing the plant
		this.growthHours = plant_config.growthHours || 24;
		this.maxStage = plant_config.maxStage || 6;
		this.wilt = plant_config.wilt || 12; // hours after max stage reached
		this.perish = plant_config.perish || 24; // hours after max stage reached
	}

	setWilted() {
		this.sprite.tint = 0xc2aa88
	}
}