import {app} from '../app.js'
import {sceneHolder, currentLevel} from '../setup.js'
import * as C from '../constants.js'
import * as tools from './tools.js'
import {sessionControls} from './sessionControls.js';
export let mouseDown = false;
export let mousePos;
export let keys = {
	w: false,
	a: false,
	s: false,
	d: false
}
export let handleScenePan = function() {};
export let scrollEnabled;
export function init() {
	scrollEnabled = sessionControls.scrollZoomEnabled;
	handleScenePan = (x, y) => {
		sceneHolder.position.x += x
		sceneHolder.position.y += y
		currentLevel.updateCulling()
	}
	window.resetView = () => {
		sceneHolder.position.x = 0;
		sceneHolder.position.y = 0;
		sceneHolder.scale.x = 1;
		sceneHolder.scale.y = 1;
		currentLevel.updateCulling()
	}

	window.addEventListener('mousedown', function(e) {
		mouseDown = true;
	})

	window.addEventListener('mouseup', function(e) {
		mouseDown = false;
	})

	

	window.addEventListener('mousemove', function(e) {
		mousePos = app.renderer.plugins.interaction.mouse.global
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
		if (scrollEnabled) {
			if (e.deltaY > 0) {
				zoom(-.1, mousePos.x, mousePos.y)
			} else {
				zoom(.1, mousePos.x, mousePos.y)
			}
			currentLevel.updateCulling()
		}
	})

	
}
function zoom(amnt, x, y) {
	if (sceneHolder.scale.x + amnt < 1 || sceneHolder.scale.x + amnt > 4) {
		return
	}
	// Note the use of Math.sign is in case zoom amnt changes
	// @Important, this zoom is broken
	sceneHolder.scale.x += amnt;
	sceneHolder.scale.y += amnt;
	if (Math.sign(amnt) == 1) {

	}
	
	
}