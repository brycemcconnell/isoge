import {app} from '../app.js'
import * as C from '../constants.js'
export function init() {
	let uiContainer = new PIXI.Container();
	uiContainer.position.y = C.CANVAS_SIZEY - 64;
	let moveUp = new PIXI.Texture(PIXI.loader.resources["ui-move"].texture);
	let moveDown = new PIXI.Texture(PIXI.loader.resources["ui-move-down"].texture);
	let moveActive = new PIXI.Texture(PIXI.loader.resources["ui-move-active"].texture);
	let move = new PIXI.Sprite(moveUp);
	let buildUp = new PIXI.Texture(PIXI.loader.resources["ui-build"].texture);
	let buildDown = new PIXI.Texture(PIXI.loader.resources["ui-build-down"].texture);
	let buildActive = new PIXI.Texture(PIXI.loader.resources["ui-build-active"].texture);
	let build = new PIXI.Sprite(buildUp);
	let destroyUp = new PIXI.Texture(PIXI.loader.resources["ui-destroy"].texture);
	let destroyDown = new PIXI.Texture(PIXI.loader.resources["ui-destroy-down"].texture);
	let destroyActive = new PIXI.Texture(PIXI.loader.resources["ui-destroy-active"].texture);
	let destroy = new PIXI.Sprite(destroyUp);
	let theseButtons = [move, build, destroy]
	let theseButtonsUp = [moveUp, buildUp, destroyUp]
	let theseButtonsDown = [moveDown, buildDown, destroyDown]
	let theseButtonsActive = [moveActive, buildActive, destroyActive]
	
	theseButtons.forEach((button, index) => {
		button.position.x = index * 64
		button.interactive = true;
		button.buttonMode = true;
		button.on('mousedown', () => {
			button.setTexture(theseButtonsDown[index])
		})
		button.on('mouseup', () => {
			theseButtons.forEach((button, jndex) => {
				button.setTexture(theseButtonsUp[jndex])
			})
			button.setTexture(theseButtonsActive[index])
		})
	})
	theseButtons[0].setTexture(theseButtonsActive[0])
	uiContainer.addChild(move);
	uiContainer.addChild(build);
	uiContainer.addChild(destroy);
	app.stage.addChild(uiContainer);

}