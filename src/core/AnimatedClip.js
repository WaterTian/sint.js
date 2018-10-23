import * as PIXI from 'pixi.js';

/**
 * @class
 * @extends PIXI.extras.AnimatedSprite
 *
 * 
 */

export default class AnimatedClip extends PIXI.extras.AnimatedSprite {
	/**
	 * @param {string} name 
	 */
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