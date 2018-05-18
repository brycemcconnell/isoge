import {app} from '../app.js'
import QueryPanel from './QueryPanel.js'
import * as tools from './tools.js'

let queryPanelWindow;
let open = false;
export function handleToggle() {
	if (!open) {
		queryPanelWindow.display();
		open = true;
	} else {
		queryPanelWindow.hide();
		open = false;
	}
}
export function init() {
	queryPanelWindow = new QueryPanel({
		width: 200,
		x: 200,
		ingameUIButton: tools.uiGroup.query
	});
	queryPanelWindow.container.visible = false;
	app.stage.addChild(queryPanelWindow.container);
}