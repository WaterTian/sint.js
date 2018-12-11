import * as core from '../../core';


import vs from '../fragments/default.vert';
import fs from './glitch.frag';

/**
 * @class
 * @extends SINT.Filter
 * @memberof SINT.magic
 */

export default class GlitchFilter extends core.Filter {
    
    constructor() {
        super(vs, fs);

        this.uniforms.time = 0;
    }

    // apply(filterManager, input, output, clear) {
    //     // console.log(this.uniforms.time);
    //     // this.uniforms.time += 0.02;
    //     filterManager.applyFilter(this, input, output, clear);
    // }
    
    /**
     * The time of the rander.
     *
     * @member {number}
     */
    get time() {
        return this.uniforms.time;
    }
    set time(value) {
        this.uniforms.time = value;
    }

}