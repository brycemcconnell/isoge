import {app} from '../app.js'
import * as C from '../constants.js'
import Button from './Button.js'
import * as tools from '../controls/tools.js'
import * as hotkeys from '../controls/hotkeys.js'
import * as settings from './settings.js'
import * as queryPanelInstance from './queryPanelInstance.js'
export let uiContainer;
export let uiGroup = {};


// on changing to build mode, reset the tile to whatever was last picked, stored in this lastBuilt variable
// @Important, this must have some way of changing based on last used tile
let lastBuilt = 'floor-wood'

export function init() {
	uiContainer = new PIXI.Container();
	uiContainer.position.y = C.CANVAS_SIZEY - settings.buttonSize - settings.uiOffset;
	uiContainer.position.x = settings.uiOffset;
	let move,
		build,
		plow,
		seed,
		harvest,
		destroy,
		query;
	
	uiGroup["move"] = new Button({
		buttonName: "move",
		iconTexture: "ui-move",
		iconActiveTexture: "ui-move-active",
		handleClick: function() {
			tools.setTool({value: 'move'});
		},
		hotkey: hotkeys.tools.move
	})
	
	uiGroup["build"] = new Button({
		buttonName: "build",
		iconTexture: "ui-build",
		iconActiveTexture: "ui-build-active",
		handleClick: function() {
			tools.setTool({value: 'build', tile: lastBuilt});
		},
		hotkey: hotkeys.tools.build
	})
	uiGroup["plow"] = new Button({
		buttonName: "plow",
		iconTexture: "ui-plow",
		iconActiveTexture: "ui-plow-active",
		handleClick: function() {
			tools.setTool({value: 'plow', tile: 'floor-plowed', mode: 'area'});
		},
		hotkey: hotkeys.tools.plow
	})
	uiGroup["seed"] = new Button({
		buttonName: "seed",
		iconTexture: "ui-seed",
		iconActiveTexture: "ui-seed-active",
		handleClick: function() {
			tools.setTool({value: 'seed'});
		},
		hotkey: hotkeys.tools.seed
	})
	uiGroup["harvest"] = new Button({
		buttonName: "harvest",
		iconTexture: "ui-harvest",
		iconActiveTexture: "ui-harvest-active",
		handleClick: function() {
			tools.setTool({value: 'harvest'});
		},
		hotkey: hotkeys.tools.harvest
	})
	uiGroup["destroy"] = new Button({
		buttonName: "destroy",
		iconTexture: "ui-destroy",
		iconActiveTexture: "ui-destroy-active",
		handleClick: function() {
			tools.setTool({value: 'destroy', mode: 'area'});
		},
		hotkey: hotkeys.tools.destroy
	})
	uiGroup["query"] = new Button({
		buttonName: "query",
		iconTexture: "ui-query",
		iconActiveTexture: "ui-query-active",
		handleClick: function() {
			tools.setTool({value: 'query', mode: 'single'});
			queryPanelInstance.handleToggle();
		},
	})
	
	Object.entries(uiGroup).forEach((child, index) => {
		uiContainer.addChild(child[1].button)
		child[1].button.position.x = index*settings.buttonSize + settings.buttonSpacing*index
		addInteraction(child[1]);
	})

	app.stage.addChild(uiContainer);
}

function addInteraction(child) {
	function handleIcons() {
		Object.entries(uiGroup).forEach(other => {
			other[1].setDefaultIcon();
		});
		child.setActiveIcon();
	}
	child.button.on('click', () => {
		handleIcons(child)
	})
	if (child.hotkey) {
		window.addEventListener('keypress', (e) => {
			if (e.key == child.hotkey) {
				handleIcons(child)
				child.handleClick();
			}
		})
	}
}


