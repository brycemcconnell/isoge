import {app} from '../app.js'
import * as C from '../constants.js'
import Button from './Button.js'
import * as tools from '../controls/tools.js'

export let uiContainer;
export function init() {
	uiContainer = new PIXI.Container();
	uiContainer.position.y = C.CANVAS_SIZEY - 64;
	uiContainer.position.x = C.CANVAS_SIZEX - 64;


	// let tile = new Button({
	// 	iconTexture: "floor-stone",
	// 	handleClick: function() {tools.setTool({type: 'tile'}) }
	// })
	
	// let wall = new Button({
	// 	iconTexture: "wall-x",
	// 	handleClick: function() {tools.setTool({type: 'wall'}); }

	// })
	// uiContainer.addChild(tile.button)
	// uiContainer.addChild(wall.button)
	// wall.button.position.x -= 64

	app.stage.addChild(uiContainer);
	uiContainer.visible = false;
}