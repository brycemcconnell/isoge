import * as map from '../controls/map.js'

export function handlePanning() {
	if (map.keys.w) { map.handleScenePan(0, 10)}
	if (map.keys.a) { map.handleScenePan(10, 0)}
	if (map.keys.s) { map.handleScenePan(0, -10)}
	if (map.keys.d) { map.handleScenePan(-10, 0)}
}