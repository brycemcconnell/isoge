import {Plant_Config} from './Plant_Config.js'
import Yielder from '../entities/Yielder.js';
import * as textures from '../textures.js';
export let bush;
export function init() {
	bush = new Plant_Config({
		grows: false,
		visible: true,
		textures: textures.bush,
		maxStageReached: true,
		perishable: false,
		yielder: [new Yielder({name: 'Seed', quantity: [1, 0]})]
	})
} 