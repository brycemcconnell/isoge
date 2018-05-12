import {app} from './app.js'
import {testLevel} from './levels/testLevel.js'
import * as testUI from './ui/testUI.js'
import * as layers from './layers.js'
import * as buildUI from './ui/build.js'


export let offsetX = 32 * 7;
export let offsetY = 0;


export let scene;
export let glow;
export default function setup() {

	app.stage = new PIXI.display.Stage();
	app.stage.group.enableSort = true;
	scene = new PIXI.Container();
	app.stage.addChild(scene)
	testUI.init();
	buildUI.init();
	layers.init();

	glow = new PIXI.Sprite(PIXI.loader.resources["glow-white"].texture);
	scene.addChild(glow);
	testLevel.init();
	glow.parentGroup = layers.select

	let axisX = new PIXI.Text('X Axis >', {fill: 0xffffff})
	axisX.rotation = .6
	axisX.position.y += 120
	scene.addChild(axisX)
	let axisY = new PIXI.Text('Y Axis >', {fill: 0xffffff})
	axisY.rotation = -.6
	axisY.position.y += 120
	scene.addChild(axisY)
}
