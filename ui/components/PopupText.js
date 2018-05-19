import * as C from '../../constants.js';
import * as eventUpdateHandler from '../../game/eventUpdateHandler.js'
export default class PopupText {
	constructor(config = {}) {
		this.style = config.style || C.textStyle;
		this.text = config.text || '+ 1 gold';
		this.content = new PIXI.Text(this.text, this.style);
		this.content.visible = false;
		this.animationRunning = false;
		this.counter = 0;
		this.delay = config.delay || 0;
	}

	changeText() {

	}
	run() {
		if (!this.animationRunning) {
			this.animationRunning = true;
			this.content.visible = true;
			eventUpdateHandler.add(this);
		}
	}

	handleAnimation() {
		this.counter += 1;
		if (this.counter > this.delay) {
			this.content.position.y -= .5;
			this.content.alpha -= .02;
			if (this.content.alpha < 0) {
				this.destroyInstance();
			}
		}
	}

	destroyInstance() {
		eventUpdateHandler.remove(this);
		this.content.parent.removeChild(this.content);
		this.content.destroy();
		delete this;
	}
}