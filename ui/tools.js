import {app} from '../app.js'
import * as C from '../constants.js'
import Button from './Button.js'
import * as tools from '../controls/tools.js'
import * as hotkeys from '../controls/hotkeys.js'

export let uiContainer;
let uiGroup;


// on changing to build mode, reset the tile to whatever was last picked, stored in this lastBuilt variable
// @Important, this must have some way of changing based on last used tile
let lastBuilt = 'floor-wood'

export function init() {
	uiContainer = new PIXI.Container();
	uiContainer.position.y = C.CANVAS_SIZEY - 64;

	let move,
		build,
		plow,
		seed,
		harvest,
		destroy;
	
	move = new Button({
		iconTexture: "ui-move",
		iconActiveTexture: "ui-move-active",
		handleClick: function() {
			tools.setTool({value: 'move'});
		},
		hotkey: hotkeys.tools.move
	})
	
	build = new Button({
		iconTexture: "ui-build",
		iconActiveTexture: "ui-build-active",
		handleClick: function() {
			tools.setTool({value: 'build', tile: lastBuilt});
		},
		hotkey: hotkeys.tools.build
	})
	plow = new Button({
		iconTexture: "ui-plow",
		iconActiveTexture: "ui-plow-active",
		handleClick: function() {
			tools.setTool({value: 'plow', tile: 'floor-plowed'});
		},
		hotkey: hotkeys.tools.plow
	})
	seed = new Button({
		iconTexture: "ui-seed",
		iconActiveTexture: "ui-seed-active",
		handleClick: function() {
			tools.setTool({value: 'seed'});
		},
		hotkey: hotkeys.tools.seed
	})
	harvest = new Button({
		iconTexture: "ui-harvest",
		iconActiveTexture: "ui-harvest-active",
		handleClick: function() {
			tools.setTool({value: 'harvest'});
		},
		hotkey: hotkeys.tools.harvest
	})
	destroy = new Button({
		iconTexture: "ui-destroy",
		iconActiveTexture: "ui-destroy-active",
		handleClick: function() {
			tools.setTool({value: 'destroy', mode: 'area'});
		},
		hotkey: hotkeys.tools.destroy
	})
	
	uiGroup = [move, build, plow, seed, harvest, destroy]
	uiGroup.forEach((child, index) => {
		uiContainer.addChild(child.button)
		child.button.position.x = index*64
		addInteraction(child);
	})

	app.stage.addChild(uiContainer);
}

function addInteraction(child) {
	function handleIcons() {
		uiGroup.forEach(other => {
			other.setDefaultIcon();
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


