import * as core from '../core';

import AnimatedSprite from './AnimatedSprite'

/**
 * @class
 * @extends SINT.AnimatedSprite
 * @memberof SINT
 * 
 * @param {number} [_x=0]
 * @param {number} [_y=0]
 * @param {string} name - The frame name of the texture in the cache
 */


export default class AnimatedClip extends AnimatedSprite {
	
	constructor(_x = 0, _y = 0, name) {

		let sheet = SINT.TyLoader.resources[name].textures;
		// console.log(sheet);

		let textures = [];
		for (let key in sheet) {
			// console.log(key);
			let texture = core.Texture.fromFrame(key);
			textures.push(texture);
		}

		super(textures);

		this.x = _x;
		this.y = _y;
	}



}