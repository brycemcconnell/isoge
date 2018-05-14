import * as C from '../constants.js';
import PopupText from './components/PopupText.js'
export let container;
let moneySymbol;
let moneyCount;
export function init() {
	container = new PIXI.Container();
	container.position.y = 20;
	moneySymbol = new PIXI.Sprite(PIXI.loader.resources["coin"].texture);
	moneySymbol.height = 32;
	moneySymbol.width = 32;
	container.addChild(moneySymbol);
	moneyCount = new PIXI.Text('200', C.textStyle);
	moneyCount.position.x = 32;
	moneyCount.position.y = 10;
	container.addChild(moneyCount);
	moneySymbol.interactive = true;
	let change = new PopupText({});
	container.addChild(change.content);
	moneySymbol.on('click', () => {
		change.run();
	})

}