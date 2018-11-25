import {app} from './app.js';

import * as level from './level/level.js';
import * as maps from './maps/index.js';

import * as C from './constants.js';
import * as toolsUI from './ui/tools.js';
import * as buildUI from './ui/build.js';
import * as destroyUI from './ui/destroy.js';
import * as fpsUI from './ui/fps.js';
import * as clockUI from './ui/clock.js';
import * as moneyUI from './ui/money.js';
import * as plantMenuUI from './ui/plantMenu.js';
import * as ingameUI from './ui/ingame.js';
import * as positionUI from './ui/position.js';
import * as glow from './entities/glow.js';
import * as game from './game.js';
import * as bush from './plants/bush.js';
import * as pumpkin from './plants/pumpkin.js';
import * as wheat from './plants/wheat.js';
import * as defaultPlant from './plants/defaultPlant.js';
import * as fish from './plants/fish.js';
import * as berry_bush from './plants/berry_bush.js';
import * as tree from './plants/tree.js';
import * as inventoryWindowInstance from './ui/inventoryWindowInstance.js';
import * as queryPanelInstance from './ui/queryPanelInstance.js';
import * as textures from './textures.js';
import * as map_controls from './controls/map.js';
import * as sessionControls from './controls/sessionControls.js';
import * as Cloud from './entities/Cloud.js';

import {Actor} from './entities/Actor.js';

import * as TileUtils from './entities/Tile.js';

export let currentLevel;
export let scene;
export let sceneHolder;
export default function setup() {
	document.getElementById('loaderInfo').innerHTML = 'Generating level';
	document.fonts.load('10px "PixelMPlus10"').then(() => {
		// Create hotkeys etc by merging user prefs and defaults
		sessionControls.init();

		textures.init();
		app.renderer.view.addEventListener('contextmenu', (e) => {
			e.preventDefault();
		});
		bush.init();
		pumpkin.init();
		wheat.init();
		defaultPlant.init();
		fish.init();
		berry_bush.init();

		sceneHolder = new PIXI.Container();
		scene = new PIXI.Container();
		sceneHolder.addChild(scene);

		TileUtils.initGlowContainer();
		app.stage.addChild(sceneHolder);
		
		

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

		glow.initGlowTextures();
		
		
		
		
		// Generate the level from a map (returned from maps.level.create()),
		// a 2d array also works fine here
		currentLevel = level.createLevel(maps.squareLevel.create());
		currentLevel.createTileData();
		currentLevel.render();
		console.log(scene)
		let ness = new Actor({char:"ness"});
		let paula = new Actor({char:"paula"});
		let jeff = new Actor({char:"jeff"});
		let tracy = new Actor({char:"tracy"});
		// Initialize panning and zooming on the map
		map_controls.init();

		

		Cloud.createSomeClouds();
		app.ticker.add(delta => game.loop(delta));
		setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1000);
	});
}
