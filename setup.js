import {app} from './app.js'
import {testLevel} from './levels/testLevel.js'
// import * as testUI from './ui/testUI.js'
import * as C from './constants.js'
import * as toolsUI from './ui/tools.js'
import * as layers from './layers.js'
import * as buildUI from './ui/build.js'
import * as destroyUI from './ui/destroy.js'
import * as clockUI from './ui/clock.js'
import * as ingameUI from './ui/ingame.js'
import * as glow from './entities/glow.js' 
import * as plant from './resources/plant.js'
import * as game from './game.js'
import * as bush from './plants/bush.js'
import * as berry_bush from './plants/berry_bush.js'
import * as tree from './plants/tree.js'


export let offsetX = 32 * 7;
export let offsetY = 0;

export let scene;
export let background;
export default function setup() {
	document.getElementById('loaderInfo').innerHTML = 'Done!';
	setTimeout(() => {document.getElementById('loader').classList.add('hidden')}, 1000);
	app.stage = new PIXI.display.Stage();
	app.stage.group.enableSort = true;
	background = new PIXI.Container();
	backgroundInit();
	scene = new PIXI.Container();
	app.stage.addChild(background)
	app.stage.addChild(scene)
	// testUI.init();
	bush.init();
	berry_bush.init();
	tree.init();
	toolsUI.init();
	buildUI.init();
	destroyUI.init();
	clockUI.init();
	ingameUI.init();
	layers.init();
	glow.initGlowTextures()
	plant.initPlantTextures()
	
	testLevel.init();


	let axisX = new PIXI.Text('X Axis >', {fill: 0xffffff})
	axisX.rotation = .6
	axisX.position.y += 120
	scene.addChild(axisX)
	let axisY = new PIXI.Text('Y Axis >', {fill: 0xffffff})
	axisY.rotation = -.6
	axisY.position.y += 120
	scene.addChild(axisY)

	game.loop()
}

function backgroundInit() {
	let backgroundImage = new PIXI.TilingSprite(PIXI.loader.resources["bg-grass"].texture)
	backgroundImage.width = C.CANVAS_SIZEX;
	backgroundImage.height = C.CANVAS_SIZEY;
	// background.addChild(backgroundImage)
	background.parentGroup = layers.background
}