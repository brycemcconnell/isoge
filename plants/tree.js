import {Plant_Config} from './Plant_Config.js'

export let tree;
export function init() {
	tree = new Plant_Config({
		grows: false,
		visible: true,
		texture: new PIXI.Texture(PIXI.loader.resources["tree01"].texture),
		maxStageReached: true,
		perishable: true,
		tall: true
	})
} 