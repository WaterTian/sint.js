import * as PIXI from 'pixi.js';

/**
 * @class
 * @extends PIXI.extras.AnimatedSprite
 * @memberof SINT
 * 
 * @param {number} [_x=0]
 * @param {number} [_y=0]
 * @param {string} name - The frame Id of the texture in the cache
 * @param {int} startNum - The start frame Id
 */


export default class AnimatedClip extends PIXI.extras.AnimatedSprite {
	
	constructor(_x = 0, _y = 0, name, startNum = 0) {

		let sheet = SINT.TyLoader.resources[name].textures;
		// console.log(sheet);

		let textures = [];
		let num = startNum;
		for (let key in sheet) {
			let texture = PIXI.Texture.fromFrame(name + num + '.png');
			textures.push(texture);
			num++;
		}

		super(textures);

		this.x = _x;
		this.y = _y;
	}



}