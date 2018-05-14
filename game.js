import * as time from './game/time.js'
import * as keyboard_panning from './game/keyboard_panning.js'
import * as animationHandler from './game/animationHandler.js'
export function loop() {
	// console.log('hi')
 	time.handleTime();
 	keyboard_panning.handlePanning();
 	animationHandler.run();
}

