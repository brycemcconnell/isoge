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
		handleClick: function() {tools.setTool({tile: 'floor-stone', mode: 'area'}) }
	})
	
	let wood = new Button({
		iconTexture: "floor-wood",
		handleClick: function() {tools.setTool({tile: 'floor-wood', mode: 'area'}); }

	})

	let wall = new Button({
		iconTexture: "wall-x",
		handleClick: function() {tools.setTool({tile: 'wall-x', mode: 'line'}) }
	})

	let plowed = new Button({
		iconTexture: "floor-plowed",
		handleClick: function() {tools.setTool({tile: 'floor-plowed', mode: 'area'}) }
	})
	uiContainer.addChild(wood.button)
	uiContainer.addChild(stone.button)
	uiContainer.addChild(wall.button)
	uiContainer.addChild(plowed.button)
	stone.button.position.x -= 64
	wall.button.position.x -= 128
	plowed.button.position.x -= 192

	app.stage.addChild(uiContainer);
	uiContainer.visible = false;
}