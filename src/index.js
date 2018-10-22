import Game from './core/Game';
import CONST from './const';
import SpineClip from './core/SpineClip';
import SpriteClip from './core/SpriteClip';
import AnimatedClip from './core/AnimatedClip';
import TextClip from './core/TextClip';

//	TOOLS
import tool from './core/Unit';
import TweenMax from "gsap";

export {
    Game,
    CONST,
    TweenMax,
    SpineClip,
    SpriteClip,
    AnimatedClip,
    TextClip,
};

global.SINT = Object.assign(global.PIXI, exports);