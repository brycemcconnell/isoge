export let glowDefault
export let glowFill

let rect = new PIXI.Rectangle(0, 0, 64, 64);
export function initGlowTextures() {
	glowDefault = new PIXI.Texture(PIXI.loader.resources["glow-white"].texture)
	glowFill = new PIXI.Texture(PIXI.loader.resources["glow-white-fill"].texture)
}