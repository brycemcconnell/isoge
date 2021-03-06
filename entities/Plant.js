import * as C from '../constants.js';
import {dateTime} from '../game/time.js';
import Yielder from './Yielder.js';
import * as defaultPlant from '../plants/defaultPlant.js';

export default class Plant {
	constructor(plant_config = defaultPlant.config) {
		this.animated = plant_config.animated || false;
		// this.frames = plant_config.frames;
		this.textures = plant_config.textures || [];
		this.tall = plant_config.tall !== null ? plant_config.tall : false;
		this.yielder = plant_config.yielder || [new Yielder({name: 'No item', quantity: [0, 10]})];
		this.grows = plant_config.grows !== null ? plant_config.grows :  true;
		this.perishable = plant_config.perishable !== null ? plant_config.perishable : true;
		// Plant Config vars, these change on instancing the plant
		this.growthHours = plant_config.growthHours || 24;
		this.maxStage = plant_config.maxStage || 6;
		this.wilt = plant_config.wilt || 12; // hours after max stage reached
		this.perish = plant_config.perish || 24; // hours after max stage reached

		this.wilted = false;

		this.growRate = Math.floor(this.growthHours / this.maxStage);

		// These vars change dynamically
		this.stage = 0;
		this.growthSoFar = 0;
		this.wiltSet = 0; // holders used 
		this.perishSet = 0; // holders used 
		this.maxStageReached = plant_config.maxStageReached || false;

		this.datePlanted;
		this.harvestExpected;
	}

	seed() {
		this.datePlanted = dateTime;
		this.harvestExpected = dateTime + this.growthHours;
		this.tile.seeded = true;

		this.sprite.setTexture(this.textures[this.stage]);
		this.sprite.visible = true;
		this.sprite.tint = 0xffffff;
	}

	grow() {
		if (this.grows){
			this.stage = this.stage < this.maxStage ? this.stage + 1 : this.stage;
			this.sprite.setTexture(this.textures[this.stage]);
		}
	}

	setPerished() {
		if (this.perishable) {
			this.reset();
		}
	}

	reset() {
		this.stage = 0;
		this.tile.seeded = false;
		this.sprite.visible = false;
		this.maxStageReached = false;
		this.wiltSet = 0;
		this.wilted = false;
		this.perishSet = 0;
		this.sprite.anchor.set(0, 0);
	}

	changePlantConfig(plant_config) {
		// Plant Config vars, these change on instancing the plant
		this.growthHours = plant_config.growthHours || 24;
		this.maxStage = plant_config.maxStage || 6;
		this.wilt = plant_config.wilt || 12; // hours after max stage reached
		this.perish = plant_config.perish || 24; // hours after max stage reached
	}

	setWilted() {
		this.sprite.tint = 0xc2aa88;
		this.wilted = true;
	}
}