import {Plant_Config} from './Plant_Config.js'

export let bush;
export function init() {
	bush = new Plant_Config({
		grows: false,
		visible: true,
		texture: new PIXI.Texture(PIXI.loader.resources["bush01"].texture),
		maxStageReached: true,
		perishable: true
	})
} 