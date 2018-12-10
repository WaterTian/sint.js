import * as Unit from './Unit';
import * as Magic from './magic';

import VideoDom from './VideoDom';

import Tween from './Tween';

import * as interaction from './interaction';
import * as loaders from './loaders';

// handle mixins now, after all code has been added, including deprecation
import {
	utils
} from './core';
utils.mixins.performMixins();



export * from './core';

export {
	Game,
	SpriteClip,
	TextClip,
	AnimatedClip
}
from './game';

export {
	AudioManager
} from './audio';

export {
	Unit,
	Magic,
	VideoDom,
	Tween,
	interaction,
	loaders,
};


// Always export SINT globally.
global.SINT = exports;