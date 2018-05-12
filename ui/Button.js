import * as layers from '../layers.js'
export default class Button {
	constructor(config) {
		this.upTextureResource = config.upTexture ||"ui-btn-up"
		this.upTexture = new PIXI.Texture(PIXI.loader.resources[this.upTextureResource].texture);
		this.downTextureResource = config.downTexture ||"ui-btn-down"
		this.downTexture = new PIXI.Texture(PIXI.loader.resources[this.downTextureResource].texture);

		this.button = new PIXI.Sprite(this.upTexture)
		this.button.parentGroup = layers.ui
		// console.log(config.)
		this.iconTextureResource = config.iconTexture || "ui-icon-default"
		this.iconTexture = new PIXI.Texture(PIXI.loader.resources[this.iconTextureResource].texture);
		this.icon = new PIXI.Sprite(this.iconTexture)
		this.button.addChild(this.icon)

		this.button.buttonMode = true
		this.button.interactive = true

		this.handleClick = config.handleClick || function() { console.log('no click handler assigned')}


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
}