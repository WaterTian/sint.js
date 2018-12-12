import * as Unit from './Unit';
import * as magic from './magic';

import VideoDom from './VideoDom';

import Tween from './Tween';

import * as interaction from './interaction';
import * as loaders from './loaders';

// handle mixins now, after all code has been added, including deprecation
import {
	utils
} from './core';
utils.mixins.performMixins();


/**
 * Alias for {@link SINT.loaders.shared}.
 * @name loader
 * @memberof SINT
 * @type {SINT.loaders.Loader}
 */
const loader = new loaders.Loader();

export * from './core';

export {
	AudioManager
} from './audio';

export {
	Game,
	SpriteClip,
	TextClip,
	AnimatedClip,
	AnimatedSprite
}
from './game';



export {
	Unit,
	VideoDom,
	Tween,
	
	magic,
	interaction,
	loaders,
	loader,
};


// Always export SINT globally.
global.SINT = exports;