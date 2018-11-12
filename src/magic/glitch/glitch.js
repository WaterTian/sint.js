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
    
    constructor() {
        super(vs, fs);

        this.uniforms.time = 0;
        this.uniforms.resolution = new Float32Array(2);
        this.uniforms.resolution[0] = 100;
        this.uniforms.resolution[1] = 100;
    }

    render(time) {
        this.uniforms.time += time;
    }
}