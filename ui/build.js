import {app} from '../app.js'
import * as C from '../constants.js'
import Button from './Button.js'
import * as tools from '../controls/tools.js'

export let uiContainer;
export function init() {
	uiContainer = new PIXI.Container();
	uiContainer.position.y = C.CANVAS_SIZEY - 64;
	uiContainer.position.x = C.CANVAS_SIZEX - 64;


	let stone = new Button({
		iconTexture: "floor-stone",
		handleClick: function() {tools.setBuild('floor-stone') }
	})
	let wood = new Button({
		iconTexture: "floor-wood",
		handleClick: function() {tools.setBuild('floor-wood') }
	})
	uiContainer.addChild(wood.button)
	uiContainer.addChild(stone.button)
	stone.button.position.x -= 64

	app.stage.addChild(uiContainer);
	uiContainer.visible = false;
}