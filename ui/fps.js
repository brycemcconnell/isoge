import * as C from '../constants.js';
import {app} from '../app.js';
export let container;
let fpsText;
export function init() {
	container = new PIXI.Container();
	container.position.y = 60;
	fpsText = new PIXI.Text('fps: ' + app.ticker.FPS.toFixed(2), C.textStyle);
	container.addChild(fpsText);
}

export function update() {
	fpsText.text = 'fps: ' + app.ticker.FPS.toFixed(2);
}