import {Plant_Config} from './Plant_Config.js'
import * as treeTextures from '../resources/tree.js';
import Yielder from '../entities/Yielder.js';
import * as C from '../constants.js';

export function getRandom() {
	let textureResource = treeTextures.textures[C.random(treeTextures.textures.length - 1)];

	return new Plant_Config({
		grows: false,
		visible: true,
		texture: [new PIXI.Texture(PIXI.loader.resources[textureResource].texture)],
		maxStageReached: true,
		perishable: false,
		tall: true,
		yielder: [new Yielder({name: 'Wood', quantity: [10, 1]})]
	})
}