import Button from './Button.js';
import * as C from '../constants.js';
import * as layers from '../layers.js';
export default class ItemButton extends Button {
	constructor(config) {
		super(config);
		let itemCount = 0;
		let itemCountDisplay = new PIXI.Text(itemCount, C.textStyle);
		this.button.addChild(itemCountDisplay)

		let description = new PIXI.Graphics();
		description.position.x = 64;
		description.beginFill(0x000000);
		description.drawRect(0,0,200, 300);
		description.beginFill(0xb5b5b5);
		description.drawRect(4, 4, 200 - 8, 300 - 8);
		// this.button.addChild(description);
		description.visible = false;
		description.parentGroup = layers.tooltips;

		let title = new PIXI.Text('Title', C.textStyle);
		title.position.x = 32;
		title.position.y = 32;
		description.addChild(title);

		this.button.on("mouseover", () => {
			description.visible = true;
		})
		this.button.on("mouseout", () => {
			description.visible = false;
		})
	}
}