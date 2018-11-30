import * as core from '../core';



/**
 * @class
 * @extends core.Sprite
 * @memberof SINT
 *
 * @param {number} [_x=0]
 * @param {number} [_y=0]
 * @param {string} name - The frame Id of the texture in the cache
 */


export default class SpriteClip extends core.Sprite {

	constructor(_x = 0, _y = 0, name) {
		const texture = core.Texture.fromFrame(name);

		super(texture);

		this.x = _x;
		this.y = _y;
	}

}