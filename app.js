import * as C from './constants.js'
import * as loader from './loader.js';
import * as game from './game.js'

import * as tools from './controls/tools.js'
window.setTool = tools.setTool
let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
	type = "canvas"
}
PIXI.utils.sayHello(type)

export let app = new PIXI.Application({ 
    width: C.CANVAS_SIZEX,         // default: 800
    height: C.CANVAS_SIZEY,        // default: 600
    antialias: false,    // default: false
    transparent: false, // default: false
    resolution: 1,      // default: 1

});
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
app.renderer = PIXI.autoDetectRenderer(C.CANVAS_SIZEX, C.CANVAS_SIZEY, {
    roundPixels: false,
    resolution: window.devicePixelRatio || 1,
    // backgroundColor: 0x87CEEB
    backgroundColor: 0x2aa1cb
});
const wrapper = document.getElementById("wrapper");
wrapper.appendChild(app.view);

loader.load();


// initKeyboard();