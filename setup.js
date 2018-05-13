import {app} from './app.js'
import {testLevel} from './levels/testLevel.js'
// import * as testUI from './ui/testUI.js'
import * as toolsUI from './ui/tools.js'
import * as layers from './layers.js'
import * as buildUI from './ui/build.js'
import * as destroyUI from './ui/destroy.js'
import * as glow from './entities/glow.js' 


export let offsetX = 32 * 7;
export let offsetY = 0;


export let scene;
export default function setup() {

	app.stage = new PIXI.display.Stage();
	app.stage.group.enableSort = true;
	scene = new PIXI.Container();
	app.stage.addChild(scene)
	// testUI.init();
	toolsUI.init();
	buildUI.init();
	destroyUI.init();
	layers.init();
	glow.initGlowTextures()

	
	testLevel.init();

	let axisX = new PIXI.Text('X Axis >', {fill: 0xffffff})
	axisX.rotation = .6
	axisX.position.y += 120
	scene.addChild(axisX)
	let axisY = new PIXI.Text('Y Axis >', {fill: 0xffffff})
	axisY.rotation = -.6
	axisY.position.y += 120
	scene.addChild(axisY)
}
