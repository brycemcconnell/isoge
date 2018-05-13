import {app} from '../app.js'
import * as C from '../constants.js'
import Button from './Button.js'
import * as tools from '../controls/tools.js'

export let uiContainer;
export function init() {
	let uiContainer = new PIXI.Container();
	uiContainer.position.y = C.CANVAS_SIZEY - 64;

	let move = new Button({
		iconTexture: "ui-move",
		iconActiveTexture: "ui-move-active",
		handleClick: function() {tools.setTool({value: 'move'}) }
	})
	
	let build = new Button({
		iconTexture: "ui-build",
		iconActiveTexture: "ui-build-active",
		handleClick: function() {tools.setTool({value: 'build'}) }
	})
	let seed = new Button({
		iconTexture: "seed-icon",
		handleClick: function() {tools.setTool({value: 'seed'}) }
	})
	let harvest = new Button({
		iconTexture: "ui-harvest",
		iconActiveTexture: "ui-harvest-active",
		handleClick: function() {tools.setTool({value: 'harvest'}) }
	})
	let destroy = new Button({
		iconTexture: "ui-destroy",
		iconActiveTexture: "ui-destroy-active",
		handleClick: function() {tools.setTool({value: 'destroy', mode: 'area'}) }
	})

	uiContainer.addChild(move.button)
	uiContainer.addChild(build.button)
	uiContainer.addChild(seed.button)
	uiContainer.addChild(harvest.button)
	uiContainer.addChild(destroy.button)

	let uiGroup = [move, build, destroy, harvest, seed]
	uiGroup.forEach(child => {
		child.button.on('click', () => {
			uiGroup.forEach(other => {
				other.setDefaultIcon();
			});
			child.setActiveIcon();
		})
	})
	build.button.position.x += 64
	seed.button.position.x += 128
	harvest.button.position.x += 192
	destroy.button.position.x += 256

	app.stage.addChild(uiContainer);
}