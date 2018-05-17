/*
Invntory

Count item?
Add item
Remove item

Get info on item?

Duplicate items to be stored in one entity, with a count property?
*/

export const list = [];

export function add(item) {
	list.push(item);
}
export function remove(item) {
	list.splice(list.indexOf(item), 1);
}