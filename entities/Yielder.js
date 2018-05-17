import * as C from '../constants.js';
import * as inventory from '../inventory.js';
/*
Perhaps this should recieve an item?
*/
export default class Yielder {
	constructor(config = {}) {
		this.name = config.name ||"unknown";
		this.quantity = config.quantity || 1;
		this.result = 0;
	}
	generateQuantity() {
		this.result = C.random(this.quantity[0], this.quantity[1]);
	}

	sendToInventory() {
		for (let i = 0; i < this.result; i++) {
			inventory.add(this.name);
		}
	}
}