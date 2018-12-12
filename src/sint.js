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
 * @type {SINT.loader.Loader}
 */
const loader = loaders.shared || null;

export * from './core';

export {
	Game,
	SpriteClip,
	TextClip,
	AnimatedClip,
	AnimatedSprite
}
from './game';

export {
	AudioManager
} from './audio';

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