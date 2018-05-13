import {offsetX, offsetY, scene} from '../setup.js'
import * as tools from './tools.js'

import {testLevel} from '../levels/testLevel.js'
export let mouseDown = false;
export function init() {
	window.resetView = () => {
		scene.position.x = 0;
		scene.position.y = 0;
		testLevel.updateCulling()
	}

	window.addEventListener('mousedown', function(e) {
		mouseDown = true;
	})

	window.addEventListener('mouseup', function(e) {
		mouseDown = false;
	})

	

	window.addEventListener('mousemove', function(e) {
		if (mouseDown == true && tools.currentTool.value == 'move') {
			scene.position.x += Math.round(e.movementX / 2)
			scene.position.y += Math.round(e.movementY / 2)
			testLevel.updateCulling()
			// console.log(scene.position.x / 16 + 16, scene.position.y / 32 + 1)
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