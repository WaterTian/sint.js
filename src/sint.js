
import Game from './game/Game';
// import * as Unit from './Unit';
// import * as Magic from './magic/';
// // // import SpineClip from './core/SpineClip';
// import AnimatedClip from './game/AnimatedClip';
import SpriteClip from './game/SpriteClip';
import TextClip from './game/TextClip';
import VideoDom from './VideoDom';

// import { TweenLite } from "gsap/TweenLite";
// import { EasePack } from "gsap/EasePack"; 
// const Tween = TweenLite;
import Tween from './Tween';


// export { Sound } from "pixi-sound";
// import Sound from './Sound';

import { AudioManager } from './audio';
const audio = new AudioManager();

export * from './core';

import * as interaction from './interaction';
import * as loaders from './loaders';

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
	audio,
	interaction,
	loaders,
};


// Always export SINT globally.
global.SINT = exports; // eslint-disable-line

