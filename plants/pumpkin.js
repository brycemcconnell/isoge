import {Plant_Config} from './Plant_Config.js'
import Yielder from '../entities/Yielder.js';
import * as textures from '../textures.js';
export let config;
export function init() {
	config = new Plant_Config({
		grows: true,
		visible: true,
		texture: textures.pumpkin,
		maxStageReached: false,
		perishable: true,
		yielder: [new Yielder({name: 'Pumpkin', quantity: [1, 0]})]
	})
} 