import {app} from '../app.js'
import * as C from '../constants.js'
import Button from './Button.js'
import * as tools from '../controls/tools.js'
import * as layers from '../layers.js'
import * as settings from './settings.js'
import * as toolsUI from './tools.js'

export let uiContainer;
export function init() {

	uiContainer = new PIXI.Container();
	uiContainer.position.y = toolsUI.uiContainer.position.y - settings.buttonSize;
	uiContainer.position.x = toolsUI.uiGroup.build.button.position.x + settings.buttonSpacing*4;
	uiContainer.parentGroup = layers.ui;

	let stone = new Button({
		iconTexture: "floor-stone",
		handleClick: function() {tools.setTool({tile: 'floor-stone', mode: 'area'}); hide(); }
	})
	
	let wood = new Button({
		iconTexture: "floor-wood",
		handleClick: function() {tools.setTool({tile: 'floor-wood', mode: 'area'}); hide(); }

	})

	let wall = new Button({
		iconTexture: "wall-x",
		handleClick: function() {tools.setTool({tile: 'wall-x', mode: 'line'}); hide(); }
	})

	uiContainer.addChild(wood.button)
	uiContainer.addChild(stone.button)
	uiContainer.addChild(wall.button)
	stone.button.position.y -= settings.buttonSize
	wall.button.position.y -= settings.buttonSize*2
	wall.icon.height = 64;
	wall.icon.width = 32;

	app.stage.addChild(uiContainer);
	uiContainer.visible = false;
}

function hide() {
	uiContainer.visible = false;
}