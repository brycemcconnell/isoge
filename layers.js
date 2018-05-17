import {app} from './app.js'
export const background       = new PIXI.display.Group(-4, true);
export const defaults         = new PIXI.display.Group(-3, true);
export const water            = new PIXI.display.Group(-2, true);
export const floor            = new PIXI.display.Group(0, true);
export const wall             = new PIXI.display.Group(2, true);
export const dynamicBack      = new PIXI.display.Group(3, true);
export const avatar           = new PIXI.display.Group(4, true);
export const dynamicFront     = new PIXI.display.Group(5, true);
export const select           = new PIXI.display.Group(6, true);
export const ui               = new PIXI.display.Group(7, true);
export const user             = new PIXI.display.Group(8, true);
export const tooltips         = new PIXI.display.Group(9, true);
export function init() {
	[background,defaults,  water, floor, wall, dynamicBack, avatar, dynamicFront, select, ui, user, tooltips].forEach(layer => {
		app.stage.addChild(new PIXI.display.Layer(layer))
	})
}
// scene.addChild(new PIXI.display.Layer(defaultLayer))
// 	scene.addChild(new PIXI.display.Layer(userLayer))