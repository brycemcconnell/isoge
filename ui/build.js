import {app} from '../app.js'
import * as C from '../constants.js'
import Button from './Button.js'
import * as tools from '../controls/tools.js'
import * as settings from './settings.js'
import * as toolsUI from './tools.js'

export let uiContainer;
export function init() {

	uiContainer = new PIXI.Container();
	uiContainer.position.y = toolsUI.uiContainer.position.y - settings.buttonSize;
	uiContainer.position.x = toolsUI.uiGroup.build.button.position.x + settings.buttonSpacing*4;


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

	let plot2x2 = new Button({
		iconTexture: "plot2x2",
		handleClick: function() {tools.setTool({tile: 'plot2x2', mode: 'area'}); hide(); }
	})

	uiContainer.addChild(wood.button)
	uiContainer.addChild(stone.button)
	uiContainer.addChild(wall.button)
	uiContainer.addChild(plot2x2.button)
	stone.button.position.y -= settings.buttonSize
	wall.button.position.y -= settings.buttonSize*2
	plot2x2.button.position.y -= settings.buttonSize*3
	wall.icon.height = 64;
	wall.icon.width = 32;
	plot2x2.icon.height = 64;
	plot2x2.icon.width = 64;

	app.stage.addChild(uiContainer);
	uiContainer.visible = false;
}

function hide() {
	uiContainer.visible = false;
}