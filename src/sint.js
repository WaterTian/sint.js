import Game from './core/Game';
import CONST from './const';
import * as Unit from './Unit';
import * as Magic from './magic/';
// import SpineClip from './core/SpineClip';
import SpriteClip from './core/SpriteClip';
import AnimatedClip from './core/AnimatedClip';
import TextClip from './core/TextClip';

//	TOOLS
import TweenMax from "gsap";

// import {Container,Sprite,Texture,filters} from "pixi.js";
export * from "pixi.js";

export {
	Game,
	CONST,
	Unit,
	Magic,
	// SpineClip,
	SpriteClip,
	AnimatedClip,
	TextClip,
	TweenMax,
};

global.SINT = exports;
