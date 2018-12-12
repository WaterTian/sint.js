import * as core from '../core';

import AnimatedSprite from './AnimatedSprite'

/**
 * @class
 * @extends SINT.AnimatedSprite
 * @memberof SINT
 * 
 * @param {number} [_x=0]
 * @param {number} [_y=0]
 * @param {string | string[]} name - The frame name of the texture in the cache
 */


export default class AnimatedClip extends AnimatedSprite {
	
	constructor(_x = 0, _y = 0, name) {
		
		let textures = [];
		// console.log(name);
		// console.log(typeof name)
		// console.log(name instanceof Array)

		if (typeof name === 'string'){
			for (let key in SINT.loader.resources[name].textures) {
				let texture = core.Texture.fromFrame(key);
				textures.push(texture);
			}
		}else if(name instanceof Array){
			name.forEach( function(element, index) {
				let texture = core.Texture.fromFrame(element);
				textures.push(texture);
			});
		}

		super(textures);

		this.x = _x;
		this.y = _y;
	}



}