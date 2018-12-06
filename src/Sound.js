import * as core from './core';

import {Howl} from 'howler';

import * as loaders from './loaders';


/**
 * SINT.Tween extends the TweenLite.
 * 
 * and import EasePack , docs: {@link https://greensock.com/docs/Easing}
 *
 * TweenLite + EasePack = 34k
 * 
 * @example
 * SINT.Tween.to(_obj, 0.6, {
 * 	alpha: 0.3,
 * 	ease: Strong.easeOut,
 * 	delay: 1.0,
 * 	onComplete: function() {
 * 		conseole.log("complete");
 * 	}
 * })
 * 
 * @class
 * @extends Howl
 * @see https://greensock.com/docs/TweenLite
 * @memberof SINT
 */


export default class Sound extends Howl {
	constructor(options) {

		super({
			// data: options.data,
			src: options.url,
		})

	}
}