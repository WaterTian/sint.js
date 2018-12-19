import * as core from '../../core';
import vs from '../fragments/default.vert';
import fs from './holes2.frag';

/**
 * base:{@link https://github.com/ashima/webgl-noise}
 *
 * @class
 * @extends SINT.Filter
 * @memberof SINT.magic
 * @param {number} [radius=200] The radius of the twist.
 * @param {number} [angle=4] The angle of the twist.
 * @param {number} [padding=20] Padding for filter area.
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
     * This point describes the the offset of the twist.
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
