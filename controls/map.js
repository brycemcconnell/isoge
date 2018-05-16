import {app} from '../app.js'
import {scene} from '../setup.js'
import * as C from '../constants.js'
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
		let mousePos = app.renderer.plugins.interaction.mouse.global
		console.log(scene.toGlobal(new PIXI.Point(0,0)))
		if (scrollEnabled) {
			if (e.deltaY > 0) {
				zoom(-1, mousePos.x, mousePos.y)
			} else {
				zoom(1, mousePos.x, mousePos.y)
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
	// @Important, this zoom is broken
	scene.scale.x += amnt;
	scene.scale.y += amnt;

	scene.position.x += C.CANVAS_SIZEX / scene.scale.x
	scene.position.y += C.CANVAS_SIZEY / scene.scale.y
	
}

export function handleScenePan(x, y) {
	scene.position.x += x
	scene.position.y += y
	testLevel.updateCulling()
}
