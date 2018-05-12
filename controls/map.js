import {scene} from '../setup.js'
let mouseDown = false;
export function init() {
	window.resetView = () => {
		scene.position.x = 0;
		scene.position.y = 0;
	}

	window.addEventListener('mousedown', function(e) {
		mouseDown = true;
	})

	window.addEventListener('mouseup', function(e) {
		mouseDown = false;
	})

	window.addEventListener('mousemove', function(e) {
		if (mouseDown == true) {
			scene.position.x += Math.round(e.movementX / 2)
			scene.position.y += Math.round(e.movementY / 2)
		}
	})
	window.addEventListener('wheel', function(e) {
		if (e.deltaY > 0) {
			zoom(-1, e.clientX, e.clientY)
		} else {
			zoom(1, e.clientX, e.clientY)
		}
	})
	
}
function zoom(amnt, x, y) {
	if (scene.scale.x + amnt < 1 || scene.scale.x + amnt > 4) {
		return
	}
	// Note the use of Math.sign is in case zoom amnt changes
	scene.position.x += x/2 * -Math.sign(amnt)
	scene.position.y += y/2 * -Math.sign(amnt)
	scene.scale.x += amnt;
	scene.scale.y += amnt;
}