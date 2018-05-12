import * as buildUI from '../ui/build.js'

export const currentTool = {
	value: 'move',
	tile: 'floor-wood'
}

export function setTool(tool) {
	currentTool.value = tool
	console.log(currentTool.value)
	if (tool == "build") {
		buildUI.uiContainer.visible = true
		console.log(buildUI.uiContainer)
	} else {
		buildUI.uiContainer.visible = false
	}
}

export function useTool(tool) {
	console.log('using' + tool)
}

export function setBuild(tile) {
	currentTool.tile = tile
	console.log(currentTool.tile)
}