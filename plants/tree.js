import {Plant_Config} from './Plant_Config.js';
import Yielder from '../entities/Yielder.js';
import * as C from '../constants.js';
import * as textures from '../textures.js';

export function getRandom() {
	return new Plant_Config({
		grows: false,
		visible: true,
		textures: [textures.tree00, textures.tree01, textures.tree02][C.random(2)],
		maxStageReached: true,
		perishable: false,
		tall: true,
		yielder: [new Yielder({name: 'Wood', quantity: [10, 1]})]
	});
}