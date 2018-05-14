import {Plant_Config} from './Plant_Config.js'
import Yielder from '../entities/Yielder.js';
export let bush;
export function init() {
	bush = new Plant_Config({
		grows: false,
		visible: true,
		texture: new PIXI.Texture(PIXI.loader.resources["bush01"].texture),
		maxStageReached: true,
		perishable: false,
		yielder: new Yielder({name: 'Seed', quantity: [1, 0]})
	})
} 