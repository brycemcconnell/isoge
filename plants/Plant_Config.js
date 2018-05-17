/*
	This represents the configuration data that will be inserted into a Plant instance.

*/

export class Plant_Config {
	constructor(config) {
		this.grows = config.grows
		this.harvestable = config.harvestable
		this.growthHours  = config.growthHours
		this.maxStage = config.maxStage
		this.maxStageReached = config.maxStageReached
		this.wilt = config.wilt
		this.perish = config.perish
		this.perishable  = config.perishable
		this.texture = config.texture
		this.visible = config.visible
		this.tall = config.tall
		this.yielder = config.yielder
		this.animated = config.animated
		this.animSprite = config.animSprite
		this.frames = config.frames
	}
}