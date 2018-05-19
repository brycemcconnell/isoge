export let fish;
export let floorGrass;
export let floorDirt;
export let floorGrassRock1;
export let floorGrassRock2;
export let floorGrassRock3;
export let floorGrassDirt1;
export let floorGrassDirt2;
export let floorGrassDirt3;
export let floorWood;
export let water;
export let waterEdgeSouth;
export let waterEdgeEast;
export let waterEdgeSouthEast;
export let pumpkin;
export let defaultPlant;
export let wheat;
export let crystal;
export let plot2x2;
export let tree00;
export let tree01;
export let tree02;
export let berryBush;
export let bush;

export function init() {
	function createTextureFrames(sprite, frames) {
		let textures = [];
		for (let i = 0; i < frames; i++) {
			let texture = PIXI.Texture.fromFrame(sprite + `${i < 9 ? 0 : ''}` + (i + 1) + '.png');
			textures.push(texture);
		}
		return textures;
	}

	fish = createTextureFrames("fish", 12);
	water = createTextureFrames("floor-water", 4);
	waterEdgeSouth = createTextureFrames("water-edge-south", 4);
	waterEdgeEast = createTextureFrames("water-edge-east", 4);
	waterEdgeSouthEast = createTextureFrames("water-edge-southeast", 4);
	pumpkin = createTextureFrames("pumpkin", 8);
	defaultPlant = createTextureFrames("defaultPlant", 7);
	wheat = createTextureFrames("wheat", 12);
	crystal = createTextureFrames("crystal", 4);
	floorGrass = new PIXI.Texture(PIXI.loader.resources["floor-grass"].texture);
	floorDirt = new PIXI.Texture(PIXI.loader.resources["floor-dirt"].texture);
	floorGrassRock1 = new PIXI.Texture(PIXI.loader.resources["floor-grass-rock1"].texture);
	floorGrassRock2 = new PIXI.Texture(PIXI.loader.resources["floor-grass-rock2"].texture);
	floorGrassRock3 = new PIXI.Texture(PIXI.loader.resources["floor-grass-rock3"].texture);
	floorGrassDirt1 = new PIXI.Texture(PIXI.loader.resources["floor-grass-dirt1"].texture);
	floorGrassDirt2 = new PIXI.Texture(PIXI.loader.resources["floor-grass-dirt2"].texture);
	floorGrassDirt3 = new PIXI.Texture(PIXI.loader.resources["floor-grass-dirt3"].texture);
	floorWood = new PIXI.Texture(PIXI.loader.resources["floor-wood"].texture);
	plot2x2 = new PIXI.Texture(PIXI.loader.resources["plot2x2"].texture);
	tree00 = new PIXI.Texture(PIXI.loader.resources["tree00"].texture);
	tree01 = new PIXI.Texture(PIXI.loader.resources["tree01"].texture);
	tree02 = new PIXI.Texture(PIXI.loader.resources["tree02"].texture);
	berryBush = new PIXI.Texture(PIXI.loader.resources["berry-bush01"].texture);
	bush = new PIXI.Texture(PIXI.loader.resources["bush01"].texture);
}