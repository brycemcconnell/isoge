import * as C from '../constants.js';
import * as layers from '../layers.js';
import Button from './Button.js';


export default class Window {
	constructor(config = {}) {
		let x = config.x || 0;
		let y = config.y || 0;
		this.width = config.width || 600;
		this.height = config.height || 400;
		let posX = C.CANVAS_SIZEX/2 - this.width/2 + x
		let posY = C.CANVAS_SIZEY/2 - this.height/2 + y
		let color = "b5b5b5";
		this.borderWidth = 4;
		this.padding = 8;
		this.container = new PIXI.Container();
		this.container.parentGroup = layers.ui;
		this.container.position.set(posX, posY)


		// draw background
		this.background = new PIXI.Graphics();
		this.container.addChild(this.background)
		this.background.beginFill(`0x${color}`);
		this.background.drawRect(this.borderWidth, this.borderWidth, this.width - this.borderWidth*2, this.height - this.borderWidth*2)
		
		// draw borders
		this.borderT = new PIXI.TilingSprite(PIXI.loader.resources["ui-window-top"].texture);
		this.borderT.height = this.borderWidth;
		this.borderT.width = this.width;
		this.container.addChild(this.borderT);

		this.borderL = new PIXI.TilingSprite(PIXI.loader.resources["ui-window-left"].texture);
		this.borderL.height = this.height;
		this.borderL.width = this.borderWidth;
		this.container.addChild(this.borderL);

		this.borderR = new PIXI.TilingSprite(PIXI.loader.resources["ui-window-right"].texture);
		this.borderR.height = this.height;
		this.borderR.width = this.borderWidth;
		this.borderR.position.x = this.width - this.borderWidth;
		this.container.addChild(this.borderR);

		this.borderB = new PIXI.TilingSprite(PIXI.loader.resources["ui-window-bottom"].texture);
		this.borderB.height = this.borderWidth;
		this.borderB.width = this.width;
		this.borderB.position.y = this.height - this.borderWidth;
		this.container.addChild(this.borderB);

		// draw border corners
		this.cornerTR = new PIXI.Sprite(PIXI.loader.resources["ui-window-corner"].texture);
		this.cornerTR.position.y = this.height - this.cornerTR.height
		this.cornerBL = new PIXI.Sprite(PIXI.loader.resources["ui-window-corner"].texture);
		this.cornerBL.position.x = this.width - this.cornerBL.width;
		this.container.addChild(this.cornerTR);
		this.container.addChild(this.cornerBL);

		this.ingameUIButton = config.ingameUIButton;

		this.exitBtn = new Button({
			iconTexture: "ui-close",
			handleClick: () => {
				this.ingameUIButton.handleClick();
				this.ingameUIButton.setDefaultIcon();
			}
		});
		this.exitBtn.button.position.x = this.width - this.borderWidth - this.exitBtn.button.width - this.padding;
		this.exitBtn.button.position.y = this.borderWidth + this.padding;
		this.container.addChild(this.exitBtn.button);


	}

	display() {
		this.container.visible = true;
	}
	hide() {
		this.container.visible = false;
	}
}