import * as time from './game/time.js'
import * as keyboard_panning from './game/keyboard_panning.js'
import * as animationHandler from './game/animationHandler.js'
import * as Actor from './entities/Actor.js';
export function loop() {
 	time.handleTime();
 	keyboard_panning.handlePanning();
 	Actor.allActors.forEach(actor => actor.update());
 	animationHandler.run();
}

