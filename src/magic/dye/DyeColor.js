import * as PIXI from 'pixi.js';

import { readFileSync } from 'fs';
import { join } from 'path';

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
        super(
            // // vertex shader
            // readFileSync(join(__dirname, './fragments/default.vert'), 'utf8'),
            // // fragment shader
            // readFileSync(join(__dirname, './alpha.frag'), 'utf8')
        );

        this.alpha = alpha;
        this.glShaderKey = 'alpha';
    }
}
