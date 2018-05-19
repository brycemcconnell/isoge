import {Plant_Config} from './Plant_Config.js'
import Yielder from '../entities/Yielder.js';
import * as textures from '../textures.js';
export let berry_bush;
export function init() {
	berry_bush = new Plant_Config({
		grows: false,
		visible: true,
		textures: textures.berryBush,
		maxStageReached: true,
		perishable: false,
		yielder: [
			new Yielder({name: 'Berry', quantity: [1, 0]}),
			new Yielder({name: 'Berry bush seed', quantity: [1, 0]}),
		]
	})
} 