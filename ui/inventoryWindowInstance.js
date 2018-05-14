import {app} from '../app.js'
import InventoryWindow from './InventoryWindow.js'
import * as ingameUI from './ingame.js'
// export let inventory;
// export function init() {
// 	inventory = new Window();
// }
let inventory;
let open = false;
export function handleToggle() {
	if (!open) {
		inventory.display();
		open = true;
	} else {
		inventory.hide();
		open = false;
	}
}
export function init() {
	inventory = new InventoryWindow({
		ingameUIButton: ingameUI.inventory
	});
	inventory.container.visible = false;
	app.stage.addChild(inventory.container);
}