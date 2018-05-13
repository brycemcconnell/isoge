import * as buildUI from '../ui/build.js'
import * as destroyUI from '../ui/destroy.js'

export const currentTool = {
	value: 'move',
	tile: 'floor-wood',
	/* @mode - String - [area][line][single]*/
	mode: 'area',
	type: 'tile'
}

export function setTool(obj) {
	currentTool.value = obj.value ? obj.value : currentTool.value
	currentTool.tile = obj.tile ? obj.tile : currentTool.tile
	currentTool.mode = obj.mode ? obj.mode : currentTool.mode
	currentTool.type = obj.type ? obj.type : currentTool.type
	console.log(currentTool)
	if (currentTool.value == "build") {
		buildUI.uiContainer.visible = true
	} else {
		buildUI.uiContainer.visible = false
	}
	if (currentTool.value == "destroy") {
		destroyUI.uiContainer.visible = true
	} else {
		destroyUI.uiContainer.visible = false
	}
}

export function useTool(tool) {
	console.log('using' + tool)
}

export function setBuild(tile) {
	currentTool.tile = tile
	console.log(currentTool.tile)
}