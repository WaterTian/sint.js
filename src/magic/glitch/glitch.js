import * as PIXI from 'pixi.js';


import vs from '../fragments/default.vert';
import fs from './glitch.frag';


/**
 * @param {PIXI.Container} container
 * @param {PIXI.Point | Array.<number>} offset
 * @param {number} radius
 * @param {number} time
 */

export default class glitch extends PIXI.Filter {
    /**
     * @param {Float32Array} [color=0xffffff]
     */
    constructor() {
        super(vs, fs);

        this.uniforms.time = 0;
        this.uniforms.resolution = new PIXI.Point(500, 500);
    }

    render(time) {
        this.uniforms.time.value += time;
    }
}