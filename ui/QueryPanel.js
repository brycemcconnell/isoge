import Window from './Window.js';
import Button from './Button.js';
import * as C from '../constants.js';
export default class QueryPanel extends Window {
	constructor(config) {
		super(config);
		this.container.position.x = C.CANVAS_SIZEX - this.container.width;

		this.title = new PIXI.Text('Query', C.textStyles["black"]);
		this.title.position.set(20,20);
		this.container.addChild(this.title);
	}
}