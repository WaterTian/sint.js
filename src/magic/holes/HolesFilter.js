import * as core from '../../core';
import vs from '../fragments/default.vert';
import fs from './holes2.frag';

/**
 * base:{@link https://github.com/ashima/webgl-noise}
 *
 * @class
 * @extends SINT.Filter
 * @memberof SINT.magic
 */
export default class HolesFilter extends core.Filter {
    constructor() {
        super(vs,fs);

        this.uniforms.time = 0;
    }

    apply(filterManager, input, output, clear) {
        this.uniforms.time += 0.03;
        filterManager.applyFilter(this, input, output, clear);
    }


    /**
     * This point describes the the offset of the Filter.
     *
     * @member {SINT.Point}
     */
    get offset() {
        return this.uniforms.offset;
    }
    set offset(value) {
        this.uniforms.offset = value;
    }

}
