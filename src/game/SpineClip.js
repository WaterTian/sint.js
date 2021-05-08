import * as PIXI from 'pixi.js';
import 'pixi-spine';

/**
 * @class
 * @extends PIXI.spine.Spine
 * @memberof SINT
 *
 * @param {string} name - The frame Id of the texture in the cache
 * @param {number} [_x=0]
 * @param {number} [_y=0]
 */



export default class SpineClip extends PIXI.spine.Spine {

	constructor(name, _x = 0, _y = 0) {
		console.log(name);
		// console.log(PIXI.loader.resources[name]);

		super(SINT.loader.resources[name].spineData);

		this.x = _x;
		this.y = _y;
	}

	play(name, loop = true) {
		this.state.setAnimation(0, name, loop);
	}


}