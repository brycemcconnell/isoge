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
export let floorWood;
export let water;
let waterData = {
	frames: 4,
	sprite: "floor-water"
}
export let waterEdgeSouth;
let waterEdgeSouthData = {
	frames: 4,
	sprite: "water-edge-south"
}
export let waterEdgeEast;
let waterEdgeEastData = {
	frames: 4,
	sprite: "water-edge-east"
}
export let waterEdgeSouthEast;
let waterEdgeSouthEastData = {
	frames: 4,
	sprite: "water-edge-southeast"
}
export let pumpkin;
let pumpkinData = {
	frames: 8,
	sprite: "pumpkin"
}
export let defaultPlant;
let defaultPlantData = {
	frames: 7,
	sprite: "defaultPlant"
}
export let wheat;
let wheatData = {
	frames: 12,
	sprite: "wheat"
}
export let crystal;
let crystalData = {
	frames: 4,
	sprite: "crystal"
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
	floorWood = new PIXI.Texture(PIXI.loader.resources["floor-wood"].texture);

	textures = [];
	for (let i = 0; i < waterData.frames; i++) {
		let texture = PIXI.Texture.fromFrame(waterData.sprite + `${i < 9 ? 0 : ''}` + (i + 1) + '.png');
		textures.push(texture);
	}
	water = textures;
	textures = [];
	for (let i = 0; i < pumpkinData.frames; i++) {
		let texture = PIXI.Texture.fromFrame(pumpkinData.sprite + `${i < 9 ? 0 : ''}` + (i + 1) + '.png');
		textures.push(texture);
	}
	pumpkin = textures;

	textures = [];
	for (let i = 0; i < defaultPlantData.frames; i++) {
		let texture = PIXI.Texture.fromFrame(defaultPlantData.sprite + `${i < 9 ? 0 : ''}` + (i + 1) + '.png');
		textures.push(texture);
	}
	defaultPlant = textures;

	textures = [];
	for (let i = 0; i < wheatData.frames; i++) {
		let texture = PIXI.Texture.fromFrame(wheatData.sprite + `${i < 9 ? 0 : ''}` + (i + 1) + '.png');
		textures.push(texture);
	}
	wheat = textures;

	textures = [];
	for (let i = 0; i < waterEdgeSouthData.frames; i++) {
		let texture = PIXI.Texture.fromFrame(waterEdgeSouthData.sprite + `${i < 9 ? 0 : ''}` + (i + 1) + '.png');
		textures.push(texture);
	}
	waterEdgeSouth = textures;

	textures = [];
	for (let i = 0; i < waterEdgeSouthEastData.frames; i++) {
		let texture = PIXI.Texture.fromFrame(waterEdgeSouthEastData.sprite + `${i < 9 ? 0 : ''}` + (i + 1) + '.png');
		textures.push(texture);
	}
	waterEdgeSouthEast = textures;

	textures = [];
	for (let i = 0; i < waterEdgeEastData.frames; i++) {
		let texture = PIXI.Texture.fromFrame(waterEdgeEastData.sprite + `${i < 9 ? 0 : ''}` + (i + 1) + '.png');
		textures.push(texture);
	}
	waterEdgeEast = textures;

	textures = [];
	for (let i = 0; i < crystalData.frames; i++) {
		let texture = PIXI.Texture.fromFrame(crystalData.sprite + `${i < 9 ? 0 : ''}` + (i + 1) + '.png');
		textures.push(texture);
	}
	crystal = textures;
}