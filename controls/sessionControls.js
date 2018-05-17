export let sessionControls;



export function init() {
	let userControls = PIXI.loader.resources["userControls"].data;
	let defaultControls = PIXI.loader.resources["defaultControls"].data;
	sessionControls = {...defaultControls, ...userControls};
}

export function changeHotkey(hotkey, newValue) {
	sessionControls[hotkey] = newValue;
}