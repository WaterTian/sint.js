import Game from './core/Game';
import CONST from './const';
import SpineClip from './core/SpineClip';
import SpriteClip from './core/SpriteClip';

//	TOOLS
import tool from './core/Unit';


export {
    Game,
    CONST,
    SpineClip,
    SpriteClip,
};

global.SINT = Object.assign(global.PIXI, exports);