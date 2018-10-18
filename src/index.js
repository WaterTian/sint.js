import Game from './core/Game';
import CONST from './const';
import SpineClip from './core/SpineClip';

//	TOOLS
import tool from './core/Unit';


export {
    Game,
    CONST,
    SpineClip,
};

global.SINT = Object.assign(global.PIXI, exports);