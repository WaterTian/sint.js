import * as PIXI from 'pixi.js';


/**
 * @class
 * @extends PIXI.Text
 *
 * 
 */

export default class TextClip extends PIXI.Text {
	/**
	 * @param {string} txt 
	 * @param {object} style  {fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'}
	 */
	constructor(_x = 0, _y = 0, txt ,style) {

		super(txt,style);

		this.x = _x;
		this.y = _y;
	}

}