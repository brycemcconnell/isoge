import {app} from '../app.js'
import * as C from '../constants.js'
import Button from './Button.js'
import * as tools from '../controls/tools.js'

export let uiContainer;
let time;
export function init() {
	let uiContainer = new PIXI.Container();
	uiContainer.position.x = C.CANVAS_SIZEX - 256;
	time = new PIXI.Text('This is a PixiJS text', C.textStyle)
	uiContainer.addChild(time)
	app.stage.addChild(uiContainer);
}

export function update(newValue) {
	time.text = newValue
}