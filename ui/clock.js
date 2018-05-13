import {app} from '../app.js'
import * as C from '../constants.js'
import Button from './Button.js'
import * as tools from '../controls/tools.js'

export let uiContainer;
let clock;
export function init() {
	let uiContainer = new PIXI.Container();
	uiContainer.position.x = C.CANVAS_SIZEX - 256;
	clock = new PIXI.Text('This is a PixiJS text', C.textStyle)
	uiContainer.addChild(clock)
	app.stage.addChild(uiContainer);
}

export function update(newValue) {
	if (clock) clock.text = newValue
}