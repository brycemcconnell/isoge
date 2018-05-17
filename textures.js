export let fish;
let fishData = {
	frames: 12,
	sprite: "fish"
}
export let floorGrass;
export let floorDirt;
export let floorGrassRock1;
export let floorGrassRock2;
export let floorGrassRock3;
export let floorGrassDirt1;
export let floorGrassDirt2;
export let floorGrassDirt3;
export let water;
let waterData = {
	frames: 4,
	sprite: "floor-water"
}

let textures = [];
export function init() {
	textures = [];
	for (let i = 0; i < fishData.frames; i++) {
		let texture = PIXI.Texture.fromFrame(fishData.sprite + `${i < 9 ? 0 : ''}` + (i + 1) + '.png');
		textures.push(texture);
	}
	fish = textures;

	floorGrass = new PIXI.Texture(PIXI.loader.resources["floor-grass"].texture);
	floorDirt = new PIXI.Texture(PIXI.loader.resources["floor-dirt"].texture);
	floorGrassRock1 = new PIXI.Texture(PIXI.loader.resources["floor-grass-rock1"].texture);
	floorGrassRock2 = new PIXI.Texture(PIXI.loader.resources["floor-grass-rock2"].texture);
	floorGrassRock3 = new PIXI.Texture(PIXI.loader.resources["floor-grass-rock3"].texture);
	floorGrassDirt1 = new PIXI.Texture(PIXI.loader.resources["floor-grass-dirt1"].texture);
	floorGrassDirt2 = new PIXI.Texture(PIXI.loader.resources["floor-grass-dirt2"].texture);
	floorGrassDirt3 = new PIXI.Texture(PIXI.loader.resources["floor-grass-dirt3"].texture);

	textures = [];
	for (let i = 0; i < waterData.frames; i++) {
		let texture = PIXI.Texture.fromFrame(waterData.sprite + `${i < 9 ? 0 : ''}` + (i + 1) + '.png');
		textures.push(texture);
	}
	water = textures;
}