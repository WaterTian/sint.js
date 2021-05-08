import * as core from '../core';



/**
 * @class
 * @extends SINT.Sprite
 * @memberof SINT
 *
 * @param {string} name - The frame Id of the texture in the cache
 * @param {number} [_x=0]
 * @param {number} [_y=0]
 */



export default class SpriteClip extends core.Sprite {

	constructor(name, _x = 0, _y = 0) {
		const texture = core.Texture.fromFrame(name);

		super(texture);

		this.x = _x;
		this.y = _y;
	}

}