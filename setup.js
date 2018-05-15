import {app} from './app.js'
import {testLevel} from './levels/testLevel.js'

import * as C from './constants.js'
import * as toolsUI from './ui/tools.js'
import * as layers from './layers.js'
import * as buildUI from './ui/build.js'
import * as destroyUI from './ui/destroy.js'
import * as fpsUI from './ui/fps.js'
import * as clockUI from './ui/clock.js'
import * as moneyUI from './ui/money.js'
import * as ingameUI from './ui/ingame.js'
import * as glow from './entities/glow.js' 
import * as plant from './resources/plant.js'
import * as default_config from './plants/default_config.js'
import * as game from './game.js'
import * as bush from './plants/bush.js'
import * as berry_bush from './plants/berry_bush.js'
import * as tree from './plants/tree.js'
import * as inventoryWindowInstance from './ui/inventoryWindowInstance.js'
import * as treeTextures from './resources/tree.js';

import * as TileUtils from './entities/Tile.js';

export let grass;
export let scene;
export let background;
export default function setup() {
	document.getElementById('loaderInfo').innerHTML = 'Done!';
	setTimeout(() => {document.getElementById('loader').classList.add('hidden')}, 1000);
	app.stage = new PIXI.display.Stage();
	stretch('stretch-height');
	app.stage.group.enableSort = true;
	background = new PIXI.Container();
	scene = new PIXI.Container();
	app.stage.addChild(background)
	app.stage.addChild(scene)
	bush.init();
	
	berry_bush.init();
	treeTextures.initTreeTextures();
	toolsUI.init();
	buildUI.init();
	destroyUI.init();
	moneyUI.init();
	fpsUI.init();
	clockUI.init();
	ingameUI.init();
	inventoryWindowInstance.init();
	layers.init();
	glow.initGlowTextures()
	TileUtils.initGlowContainer();
	plant.initPlantTextures()
	default_config.init();
	
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
