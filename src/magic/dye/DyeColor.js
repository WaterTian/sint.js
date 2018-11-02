import * as PIXI from 'pixi.js';


import vs from '../fragments/default.vert';
import fs from './dye.frag';


/**
 * @param {PIXI.Container} container
 * @param {PIXI.Point | Array.<number>} offset
 * @param {number} radius
 * @param {number} time
 */

export default class DyeColor extends PIXI.Filter {
	/**
	 * @param {number} [alpha=1] Amount of alpha from 0 to 1, where 0 is transparent
	 */
    constructor(alpha = 1.0)
    {
        super(vs,fs);

        this.alpha = alpha;
        this.glShaderKey = 'alpha';
    }

    /**
     * Coefficient for alpha multiplication
     *
     * @member {number}
     * @default 1
     */
    get alpha()
    {
        return this.uniforms.uAlpha;
    }

    set alpha(value) // eslint-disable-line require-jsdoc
    {
        this.uniforms.uAlpha = value;
    }
    
}
