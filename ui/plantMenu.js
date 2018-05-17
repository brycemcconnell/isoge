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
	uiContainer.position.x = toolsUI.uiGroup.seed.button.position.x + settings.buttonSpacing*4;
	uiContainer.parentGroup = layers.ui;

	let weed = new Button({
		buttonName: "weed",
		handleClick: function() {tools.setTool({tile: 'weed'}) }
	})
	
	let pumpkin = new Button({
		buttonName: "pumpkin",
		handleClick: function() {tools.setTool({tile: 'pumpkin'}); }

	})

	let wheat = new Button({
		buttonName: "wheat",
		handleClick: function() {tools.setTool({tile: 'wheat'}) }
	})

	uiContainer.addChild(weed.button)
	uiContainer.addChild(pumpkin.button)
	uiContainer.addChild(wheat.button)
	pumpkin.button.position.x += settings.buttonSize
	wheat.button.position.x += settings.buttonSize*2

	app.stage.addChild(uiContainer);
	uiContainer.visible = false;
}