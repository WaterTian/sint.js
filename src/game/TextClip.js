import * as core from '../core';


/**
 * @class
 * @extends core.Text
 * @memberof SINT
 *
 * @param {number} [_x=0]
 * @param {number} [_y=0]
 * @param {string} [txt='']
 * @param {object|PIXI.TextStyle} [style] - The style parameters 
 * {fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'}
 * 
 */

export default class TextClip extends core.Text {
	constructor(_x = 0, _y = 0, txt = '', style) {

		super(txt, style);

		this.x = _x;
		this.y = _y;
	}

}