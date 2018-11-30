
import Game from './game/Game';
import CONST from './const';
// import * as Unit from './Unit';
// import * as Magic from './magic/';
// // // import SpineClip from './core/SpineClip';
import SpriteClip from './game/SpriteClip';
// import AnimatedClip from './core/AnimatedClip';
import TextClip from './game/TextClip';
// import VideoDom from './VideoDom';

import { TweenMax } from "gsap/TweenMax";
const Tween = TweenMax;
// export { TweenMax } from "gsap/TweenMax";

// export * from "pixi.js";
// // export {Container,Sprite,Texture,filters} from "pixi.js";

// export { Sound } from "pixi-sound";

// export core
export * from './core';

import * as interaction from './interaction';

// handle mixins now, after all code has been added, including deprecation
import { utils } from './core';
utils.mixins.performMixins();


export {
	Game,
	CONST,
	// Unit,
	// Magic,
	// // // SpineClip,
	SpriteClip,
	// AnimatedClip,
	TextClip,
	// VideoDom,
	
	Tween,
	interaction,
};


// Always export SINT globally.
global.SINT = exports; // eslint-disable-line

