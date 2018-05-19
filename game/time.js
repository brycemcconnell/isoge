import {app} from '../app.js';
import {currentLevel, scene} from '../setup.js'
import * as clockUI from '../ui/clock.js';
import * as fpsUI from '../ui/fps.js';
import * as C from '../constants.js';

export let timer = 0;
export let seconds = 0;
export let gameHour = 6;
export let dayMinutes = 0;
export let gameMinutes = 0;
let minuteStep = 30;
export let gameDay = 1;
export let sky = 1;
export let tickRate = 1; // how many updates per second
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
// The world should be 1 brightness from 8am to 5pm
export function handleTick() {
	// let colorMatrix = new PIXI.filters.ColorMatrixFilter();
	// colorMatrix.brightness(gameHour/24);
	// scene.filters = [colorMatrix] 
	let skyV = 1;
	// sky = ((dayMinutes / 1440) + .5);
	// let skyV = sky > 1 ? 1 - (sky - 1) : sky;
	currentLevel.level.tiles.forEach((row, i) => {
		row.forEach((cell, j) => {
			if (cell) {
				cell.renderTile.tint = `0x${PIXI.utils.rgb2hex([skyV, skyV, skyV]).toString(16)}`;
				if (cell.occupant && cell.occupant.grows) {
					handlePlantLogic(cell.occupant);
				}
			}
		});
	});
	let newBG = PIXI.utils.hex2rgb(C.backgroundColor);
	newBG = newBG.map(val => val * skyV);
	app.renderer.backgroundColor = `0x${PIXI.utils.rgb2hex(newBG).toString(16)}`;
	dayMinutes += minuteStep;
	if (gameMinutes + minuteStep < 60) {
		gameMinutes += minuteStep;
	} else {
		gameMinutes = 0;
		if (gameHour < 23) {
			gameHour += 1;
		} else {
			dayMinutes = 0;
			gameHour = 0;
			gameDay += 1;
			dateTime = {hour: gameHour, day: gameDay};
		}
	}

	let displayMinutes = gameMinutes.toString().length == 1 ? '0'+gameMinutes : gameMinutes;
	clockUI.update(`Day ${gameDay}, ${gameHour}:${displayMinutes}${gameHour < 12 ? 'am' : 'pm'} (☀${skyV.toFixed(2)})`);
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