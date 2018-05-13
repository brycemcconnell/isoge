export let textures = [];
export function initPlantTextures () {
	textures[0] = new PIXI.Texture(PIXI.loader.resources['farm-seeds00'].texture)
	textures[1] = new PIXI.Texture(PIXI.loader.resources['farm-seeds01'].texture)
	textures[2] = new PIXI.Texture(PIXI.loader.resources['farm-seeds02'].texture)
	textures[3] = new PIXI.Texture(PIXI.loader.resources['farm-seeds03'].texture)
	textures[4] = new PIXI.Texture(PIXI.loader.resources['farm-seeds04'].texture)
	textures[5] = new PIXI.Texture(PIXI.loader.resources['farm-seeds05'].texture)
	textures[6] = new PIXI.Texture(PIXI.loader.resources['farm-seeds06'].texture)
}
	