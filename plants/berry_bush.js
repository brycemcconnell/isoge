import {Plant_Config} from './Plant_Config.js'
import Yielder from '../entities/Yielder.js';
export let berry_bush;
export function init() {
	berry_bush = new Plant_Config({
		grows: false,
		visible: true,
		texture: new PIXI.Texture(PIXI.loader.resources["berry-bush01"].texture),
		maxStageReached: true,
		perishable: false,
		yielder: new Yielder({name: 'Berry', quantity: [1, 0]})
	})
} 