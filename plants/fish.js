import {Plant_Config} from './Plant_Config.js'
import Yielder from '../entities/Yielder.js';
import * as textures from '../textures.js';

export let fish;
export function init() {
	fish = new Plant_Config({
		grows: false,
		visible: true,
		textures: textures.fish,
		frames: 12,
		maxStageReached: true,
		perishable: false,
		yielder: [new Yielder({name: 'Fish', quantity: [1, 0]})],
		animated: true
	})
} 