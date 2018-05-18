import {app} from '../app.js';
import {scene} from '../setup.js';
import * as C from '../constants.js';

export let container;
let text;


export function init() {
	container = new PIXI.Container();
	container.position.y = 100;
	container.position.x = C.CANVAS_SIZEX - 256;
	text = new PIXI.Text('Position', C.textStyle);
	container.addChild(text);
	app.stage.addChild(container);
}

export function update() {
	text.text = `x:${scene.position.x} : y:${scene.position.y}`;
}