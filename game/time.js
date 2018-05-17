import {app} from '../app.js';
import {scene} from '../setup.js'
import * as testLevel from '../levels/testLevel.js';
import * as clockUI from '../ui/clock.js';
import * as fpsUI from '../ui/fps.js';
import * as C from '../constants.js';

export let timer = 0;
export let seconds = 0;
export let gameHour = 6;
export let gameDay = 1;
export let sky = 1;
export let tickRate = 1; // how many seconds per hour
export let dateTime;

export function handleTime() {
	if (Math.floor(timer / 1000) < Math.floor((timer + app.ticker.elapsedMS)/ 1000)) {
		seconds += 1;
		fpsUI.update();
		if (seconds % tickRate == 0) {
			handleTick();
		}
	}
	timer += app.ticker.elapsedMS;
}

export function handleTick() {
	sky = ((gameHour / 24) + .5);
	let skyV = sky > 1 ? 1 - (sky - 1) : sky;
	testLevel.level.tiles.forEach((row, i) => {
		row.forEach((cell, j) => {			
		cell.renderTile.tint = `0x${PIXI.utils.rgb2hex([skyV, skyV, skyV]).toString(16)}`;
			if (cell.plant && cell.plant.grows) {
				handlePlantLogic(cell.plant);
			}
		});
	});
	if (gameHour < 23) {
		gameHour += 1;
	} else {
		gameHour = 0;
		gameDay += 1;
		dateTime = {hour: gameHour, day: gameDay};
	}
	clockUI.update(`Day ${gameDay}, ${gameHour}:00${gameHour < 12 ? 'am' : 'pm'} (☀${skyV.toFixed(2)})`);
}

function handlePlantLogic(plant) {
	plant.growthSoFar += 1;
	if (plant.growthSoFar % plant.growRate == 0) {
		if (C.random(10) > 1) {
			plant.grow();
		}
	}
	if (plant.maxStage == plant.stage && !plant.maxStageReached) {
		plant.maxStageReached = true;
		plant.wiltSet = plant.wilt + plant.growthSoFar;
		plant.perishSet = plant.perish + plant.growthSoFar;
	}
	if (plant.growthSoFar > plant.wiltSet && plant.maxStageReached && plant.grows) {
		plant.setWilted();
		if (plant.growthSoFar > plant.perishSet) {
			plant.setPerished();
		}	
	}
}