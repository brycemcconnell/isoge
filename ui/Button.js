import * as layers from '../layers.js'

export default class Button {
	constructor(config) {
		this.upTexture = new PIXI.Texture(PIXI.loader.resources[config.upTexture || "ui-btn-up"].texture);
		this.downTexture = new PIXI.Texture(PIXI.loader.resources[config.downTexture || "ui-btn-down"].texture);

		this.button = new PIXI.Sprite(this.upTexture)
		this.button.parentGroup = layers.ui
		// console.log(config.)
		this.iconTexture = new PIXI.Texture(PIXI.loader.resources[config.iconTexture || "ui-icon-default"].texture);
		this.iconActiveTexture = new PIXI.Texture(PIXI.loader.resources[config.iconActiveTexture || "ui-icon-default"].texture);
		this.icon = new PIXI.Sprite(this.iconTexture)
		this.button.addChild(this.icon)

		this.button.buttonMode = true
		this.button.interactive = true

		this.handleClick = config.handleClick || function() { console.log('no click handler assigned')}
		this.hotkey = config.hotkey || null;
	

		// handle hover
		this.button.on("mouseover", () => {
			
		})
		this.button.on("mouseout", () => {
			this.button.setTexture(this.upTexture)
		})

		this.button.on("mousedown", () => {
			this.button.setTexture(this.downTexture)
		})
		this.button.on("mouseup", () => {
			this.button.setTexture(this.upTexture)
		})

		this.button.on('click', () => {
			this.handleClick();
		})
		// this.parent.addChild(this.button)
	}
	setDefaultIcon() {
		this.icon.setTexture(this.iconTexture);
	}
	setActiveIcon() {
		this.icon.setTexture(this.iconActiveTexture);
	}
}