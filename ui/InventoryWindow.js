import Window from './Window.js';
import ItemButton from './ItemButton.js';
import Button from './Button.js';
export default class InventoryWindow extends Window {
	constructor(config) {
		super(config);
		let testType1 = new Button({})
		let testType2 = new Button({})
		let types = new PIXI.Container();
		types.position.x = this.borderWidth + this.padding;
		types.position.y = this.borderWidth + this.padding;
		types.addChild(testType1.button)
		types.addChild(testType2.button)
		types.children.forEach((child, index) => {
			child.position.x = index*64;
		})
		this.container.addChild(types)
		this.inventoryContainer = new PIXI.Container();
		this.inventoryContainer.position.set(this.borderWidth + this.padding, this.borderWidth + this.padding + 68);
		let inventoryHeight = this.height - this.inventoryContainer.position.y;
		// for (let i = 0; i < Math.floor(this.width / 64); i++) {
		// 	for (let j = 0; j < Math.floor(inventoryHeight / 64); j++) {
		// 		let testInvItem = new ItemButton({});
		// 		testInvItem.button.position.x = i * 64;
		// 		testInvItem.button.position.y = j * 64;
		// 		this.inventoryContainer.addChild(testInvItem.button);
		// 	}
		// }
		
		this.container.addChild(this.inventoryContainer);
	}
}