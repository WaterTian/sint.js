import * as PIXI from 'pixi.js';


/**
 * @class
 * @extends PIXI.Sprite
 *
 * 
 */

export default class SpriteClip extends PIXI.Sprite {
	/**
	 * @param {string} name 
	 */
	constructor(_x = 0, _y = 0, name) {
		const image = PIXI.Texture.fromFrame(name);

		super(image);

		this.x = _x;
		this.y = _y;
	}



}