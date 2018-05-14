import {Plant_Config} from './Plant_Config.js'
import Yielder from '../entities/Yielder.js';
import * as plantTextures from '../resources/plant.js'
export let config;
export function init() {
	config = new Plant_Config({
		grows: true,
		visible: true,
		texture: new PIXI.Texture(plantTextures.textures[0]),
		maxStageReached: false,
		perishable: true,
		yielder: new Yielder({name: 'Seed', quantity: [1, 0]})
	})
} 