/*
A button to view inventory


*/
import {app} from '../app.js'
import * as C from '../constants.js'
import Button from './Button.js'
import * as hotkeys from '../controls/hotkeys.js'

export let uiContainer;
let uiGroup;

let inventory;

export function init() {
	uiContainer = new PIXI.Container();
	uiGroup = [];

	uiGroup.push(inventory = new Button({
		iconTexture: "ui-inventory",
		iconActiveTexture: "ui-inventory-active",
		handleClick: function() {

		},
		hotkey: hotkeys.ingame.inventory
	}))

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
			if (!other.iconStatus) other.setDefaultIcon();
		});
		if (!child.iconStatus) {
			child.setActiveIcon();
		} else {
			child.setDefaultIcon();
		}
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


