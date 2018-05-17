import {Plant_Config} from './Plant_Config.js'
import Yielder from '../entities/Yielder.js';
import * as textures from '../textures.js';
export let config;
export function init() {
	config = new Plant_Config({
		grows: true,
		visible: true,
		texture: textures.wheat,
		maxStage: 11,
		wilt: 24,
		perish: 48,
		growthHours: 48,
		maxStageReached: false,
		perishable: true,
		yielder: [new Yielder({name: 'wheat', quantity: [10, 0]})]
	})
} 