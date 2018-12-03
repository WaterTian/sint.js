
import Game from './game/Game';
// import * as Unit from './Unit';
// import * as Magic from './magic/';
// // // import SpineClip from './core/SpineClip';
// import AnimatedClip from './game/AnimatedClip';
import SpriteClip from './game/SpriteClip';
import TextClip from './game/TextClip';
import VideoDom from './VideoDom';

import { TweenMax } from "gsap/TweenMax";
const Tween = TweenMax;

// export { Sound } from "pixi-sound";

// export core
export * from './core';

import * as interaction from './interaction';
// handle mixins now, after all code has been added, including deprecation
import { utils } from './core';
utils.mixins.performMixins();


export {
	Game,
	// Unit,
	// Magic,
	// // // SpineClip,
	SpriteClip,
	// AnimatedClip,
	TextClip,
	VideoDom,
	
	Tween,
	interaction,
};


// Always export SINT globally.
global.SINT = exports; // eslint-disable-line

