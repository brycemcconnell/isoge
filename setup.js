import {app} from './app.js'
import * as testLevel from './levels/testLevel.js'
// import * as circleLevel from './levels/circleLevel.js'
// import * as floatingIslands from './levels/floatingIslands.js'

import * as C from './constants.js'
import * as toolsUI from './ui/tools.js'
import * as layers from './layers.js'
import * as buildUI from './ui/build.js'
import * as destroyUI from './ui/destroy.js'
import * as fpsUI from './ui/fps.js'
import * as clockUI from './ui/clock.js'
import * as moneyUI from './ui/money.js'
import * as plantMenuUI from './ui/plantMenu.js'
import * as ingameUI from './ui/ingame.js'
import * as positionUI from './ui/position.js'
import * as glow from './entities/glow.js' 
import * as game from './game.js'
import * as bush from './plants/bush.js'
import * as pumpkin from './plants/pumpkin.js'
import * as wheat from './plants/wheat.js'
import * as defaultPlant from './plants/defaultPlant.js'
import * as fish from './plants/fish.js'
import * as berry_bush from './plants/berry_bush.js'
import * as tree from './plants/tree.js'
import * as inventoryWindowInstance from './ui/inventoryWindowInstance.js'
import * as queryPanelInstance from './ui/queryPanelInstance.js'
import * as treeTextures from './resources/tree.js';
import * as textures from './textures.js';
import * as map_controls from './controls/map.js'
import * as sessionControls from './controls/sessionControls.js'
import * as Cloud from './entities/Cloud.js'

import {Actor} from './entities/Actor.js';

import * as TileUtils from './entities/Tile.js';
import PopupText from './ui/components/PopupText.js';

export let currentLevel;
export let scene;

export default function setup() {
	document.getElementById('loaderInfo').innerHTML = 'Generating level';
	document.fonts.load('10px "PixelMPlus10"').then(() => {
		textures.init();
		app.stage = new PIXI.display.Stage();
		app.stage.group.enableSort = true;
		scene = new PIXI.Container();
		app.stage.addChild(scene)
		bush.init();
		pumpkin.init();
		wheat.init();
		defaultPlant.init();
		fish.init();
		berry_bush.init();


		// let bob = new Actor();
		
		treeTextures.initTreeTextures();

		toolsUI.init();
		buildUI.init();
		plantMenuUI.init();
		destroyUI.init();
		moneyUI.init();
		fpsUI.init();
		clockUI.init();
		positionUI.init();
		ingameUI.init();

		inventoryWindowInstance.init();
		queryPanelInstance.init();

		layers.init();
		glow.initGlowTextures();
		TileUtils.initGlowContainer();
		
		setTimeout(() => {document.getElementById('loader').classList.add('hidden')}, 1000);
		

		testLevel.createLevel();
		testLevel.level.init();
		currentLevel = testLevel;
	

		let axisX = new PIXI.Text('X Axis >', {fill: 0xffffff})
		axisX.rotation = .6
		axisX.position.y -= 100
		scene.addChild(axisX)
		let axisY = new PIXI.Text('Y Axis >', {fill: 0xffffff})
		axisY.rotation = -.6
		axisY.position.y -= 120
		scene.addChild(axisY)
		map_controls.init();
		sessionControls.init();
		/*
		// Maybe add a option in menu to play with filters
		let colorMatrix = new PIXI.filters.TiltShiftFilter();
		app.stage.children[12].filters = [colorMatrix] // land
		
		app.stage.children[11].filters = [colorMatrix] // water
		*/

		Cloud.createSomeClouds();
		app.ticker.add(delta => game.loop(delta));

		
	})
}
