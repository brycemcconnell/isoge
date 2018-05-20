import * as map from '../controls/map.js'
let maxSpeed = 12;
let vSpeed = 0;
let hSpeed = 0;
export function handlePanning() {
	if (map.keys.w || map.keys.s) {
		if (map.keys.w)	vSpeed = Math.min(vSpeed + 1, maxSpeed);
		if (map.keys.s)	vSpeed = Math.max(vSpeed - 1, -maxSpeed);
	} else {
		if (vSpeed > 0) vSpeed = Math.max(vSpeed - 1, 0)
		if (vSpeed < 0) vSpeed = Math.min(vSpeed + 1, 0)
	}
	if (map.keys.a || map.keys.d) {
		if (map.keys.a)	hSpeed = Math.min(hSpeed + 1, maxSpeed);
		if (map.keys.d)	hSpeed = Math.max(hSpeed - 1, -maxSpeed);
	} else {
		if (hSpeed > 0) hSpeed = Math.max(hSpeed - 1, 0)
		if (hSpeed < 0) hSpeed = Math.min(hSpeed + 1, 0)
	}

	if (vSpeed != 0 || hSpeed != 0) map.handleScenePan(hSpeed, vSpeed);
}