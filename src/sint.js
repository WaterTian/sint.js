import Game from './core/Game';
import CONST from './const';
import * as Unit from './Unit';
import * as Magic from './Magic';
import SpineClip from './core/SpineClip';
import SpriteClip from './core/SpriteClip';
import AnimatedClip from './core/AnimatedClip';
import TextClip from './core/TextClip';

//	TOOLS
import TweenMax from "gsap";

export {
	Game,
	CONST,
	Unit,
	Magic,
	TweenMax,
	SpineClip,
	SpriteClip,
	AnimatedClip,
	TextClip,
};

global.SINT = Object.assign(global.PIXI, exports);