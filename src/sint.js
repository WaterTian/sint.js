
import Game from './core/Game';
import CONST from './const';
import * as Unit from './Unit';
import * as Magic from './magic/';
// // import SpineClip from './core/SpineClip';
import SpriteClip from './core/SpriteClip';
import AnimatedClip from './core/AnimatedClip';
import TextClip from './core/TextClip';

//	TOOLS
export {TweenMax} from "gsap/TweenMax";



export * from "pixi.js";
// export {Container,Sprite,Texture,filters} from "pixi.js";

export {Sound} from "pixi-sound";


export {
	Game,
	CONST,
	Unit,
	Magic,
	// // SpineClip,
	SpriteClip,
	AnimatedClip,
	TextClip,
};


// Always export SINT globally.
global.SINT = exports; // eslint-disable-line

