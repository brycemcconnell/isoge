import {Plant_Config} from './Plant_Config.js'
import Yielder from '../entities/Yielder.js';
export let fish;
export function init() {
	fish = new Plant_Config({
		grows: false,
		visible: true,
		animSprite: "fish",
		frames: 12,
		maxStageReached: true,
		perishable: false,
		yielder: [new Yielder({name: 'Fish', quantity: [1, 0]})],
		animated: true
	})
} 