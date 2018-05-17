import * as map from '../controls/map.js'
let maxSpeed = 10;
let wSpeed = 0;
let aSpeed = 0;
let sSpeed = 0;
let dSpeed = 0;
export function handlePanning() {
	if (map.keys.w) {
		wSpeed = Math.min(wSpeed + 1, maxSpeed);
	} else {
		wSpeed = Math.max(wSpeed - 1, 0)
	}
	if (map.keys.a) {
		aSpeed = Math.min(aSpeed + 1, maxSpeed);
	} else {
		aSpeed = Math.max(aSpeed - 1, 0)
	}
	if (map.keys.s) {
		sSpeed = Math.min(sSpeed + 1, maxSpeed);
	} else {
		sSpeed = Math.max(sSpeed - 1, 0)
	}
	if (map.keys.d) {
		dSpeed = Math.min(dSpeed + 1, maxSpeed);
	} else {
		dSpeed = Math.max(dSpeed - 1, 0)
	}
	wSpeed != 0 && map.handleScenePan(0, wSpeed)
	aSpeed != 0 && map.handleScenePan(aSpeed, 0)
	sSpeed != 0 && map.handleScenePan(0, -sSpeed)
	dSpeed != 0 && map.handleScenePan(-dSpeed, 0)
}