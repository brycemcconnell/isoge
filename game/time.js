import {app} from '../app.js'
import {testLevel} from '../levels/testLevel.js'
import * as clockUI from '../ui/clock.js'
import * as C from '../constants.js'

export let timer = 0;
export let seconds = 0;
export let hour = 6;
export let day = 1
export let sky = 1
export let hourRate = 1 // how many seconds per hour
export let dateTime;

export function handleTime() {
	if (Math.floor(timer / 1000) < Math.floor((timer + app.ticker.elapsedMS)/ 1000)) {
 		seconds += 1
 		if (seconds % hourRate == 0) {
 			handleHourlyTick()
 		}
 	}
 	timer += app.ticker.elapsedMS;
}

export function handleHourlyTick() {
	sky = ((hour / 24) + .5);
	let skyV = sky > 1 ? 1 - (sky - 1) : sky
	testLevel.tiles.forEach((row, i) => {
		row.forEach((cell, j) => {			
			cell.renderTile.tint = `0x${PIXI.utils.rgb2hex([skyV, skyV, skyV]).toString(16)}`
			cell.plant.growthSoFar += 1
			if (cell.plant.growthSoFar % cell.plant.growRate == 0) {
				if (C.random(10) > 1 && cell.plowed && cell.seeded) {
					cell.plant.grow()
				}
			}
			if (cell.plant.maxStage == cell.plant.stage && !cell.plant.maxStageReached) {
				cell.plant.maxStageReached = true;
				cell.plant.wiltSet = cell.plant.wilt + cell.plant.growthSoFar
				cell.plant.perishSet = cell.plant.perish + cell.plant.growthSoFar
			}
			if (cell.plant.growthSoFar > cell.plant.wiltSet && cell.plant.maxStageReached) {
				cell.plant.setWilted()
				if (cell.plant.growthSoFar > cell.plant.perishSet) {
					cell.plant.setPerished()
				}	
			}
		})
	})
	if (hour < 23) {
		hour += 1
	} else {
		hour = 0
		day += 1
		dateTime = {hour: hour, day: day}
	}
	clockUI.update(`Day ${day}, ${hour}:00${hour < 12 ? 'am' : 'pm'} (☀${skyV.toFixed(2)})`)
}