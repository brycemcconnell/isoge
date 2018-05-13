/*
	This represents the configuration data that will be inserted into a Plant instance.

*/

export class Plant_Config {
	constructor(config) {
		this.grows = config.grows
		this.harvestableperishable = config.perishable
		this.growthHours  = config.growthHours
		this.maxStage = config.maxStage
		this.maxStageReached = config.maxStageReached
		this.wilt = config.wilt
		this.perish  = config.perish
		this.texture = config.texture
		this.visible = config.visible
		this.tall = config.tall
	}
}