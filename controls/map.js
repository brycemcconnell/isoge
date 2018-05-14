import {scene} from '../setup.js'
import * as tools from './tools.js'
import {testLevel} from '../levels/testLevel.js'
export let mouseDown = false;
export let keys = {
	w: false,
	a: false,
	s: false,
	d: false
}
export let scrollEnabled = true;
export function init() {
	window.resetView = () => {
		scene.position.x = 0;
		scene.position.y = 0;
		scene.scale.x = 1;
		scene.scale.y = 1;
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
			handleScenePan(Math.round(e.movementX / 2), Math.round(e.movementY / 2));
		}
	})
	window.addEventListener('keydown', function(e) {
		if (e.key == 'w') {	keys.w = true; }
		if (e.key == 'a') {	keys.a = true; }
		if (e.key == 's') {	keys.s = true; }
		if (e.key == 'd') {	keys.d = true; }
	})
	window.addEventListener('keyup', function(e) {
		if (e.key == 'w') {	keys.w = false; }
		if (e.key == 'a') {	keys.a = false; }
		if (e.key == 's') {	keys.s = false; }
		if (e.key == 'd') {	keys.d = false; }
	})
	window.addEventListener('wheel', function(e) {
		if (scrollEnabled) {
			if (e.deltaY > 0) {
				zoom(-1, e.clientX, e.clientY)
			} else {
				zoom(1, e.clientX, e.clientY)
			}
			testLevel.updateCulling()
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

export function handleScenePan(x, y) {
	scene.position.x += x
	scene.position.y += y
	testLevel.updateCulling()
}
