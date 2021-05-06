import * as core from '../../core';
import vs from '../fragments/default.vert';
import fs from './holes2.frag';

/**
 * @class
 * @extends SINT.Filter
 * @memberof SINT.magic
 * @param {number} [color1]
 * @param {number} [color2]
 * @param {number} [speed]
 * @param {number} [zoom]
 */
export default class HolesFilter extends core.Filter {
    constructor(color1 = 0x4a778a, color2 = 0xf3f9f1, speed = 0.5, zoom=5) {
        super(vs, fs);

        this.uniforms.time = 0;
        this.uniforms.uColor1 = new Float32Array(3);
        this.uniforms.uColor2 = new Float32Array(3);
        this.color1 = color1;
        this.color2 = color2;

        this.uniforms.speed = speed;
        this.uniforms.zoom = zoom;


    }

    apply(filterManager, input, output, clear) {
        this.uniforms.time += 0.03;
        filterManager.applyFilter(this, input, output, clear);
    }

    /**
     * This color of the Filter.
     *
     * @member {number}
     */
    get color1() {
        return this.uColor1;
    }
    set color1(value) {
        let arr = this.uniforms.uColor1;
        if (typeof value === 'number') {
            core.utils.hex2rgb(value, arr);
            this.uColor1 = value;
        } else {
            arr[0] = value[0] / 255;
            arr[1] = value[1] / 255;
            arr[2] = value[2] / 255;
            this.uColor1 = core.utils.rgb2hex(arr);
        }
    }

    /**
     * This color of the Filter.
     *
     * @member {number}
     */
    get color2() {
        return this.uColor2;
    }
    set color2(value) {
        let arr = this.uniforms.uColor2;
        if (typeof value === 'number') {
            core.utils.hex2rgb(value, arr);
            this.uColor2 = value;
        } else {
            arr[0] = value[0] / 255;
            arr[1] = value[1] / 255;
            arr[2] = value[2] / 255;
            this.uColor2 = core.utils.rgb2hex(arr);
        }
    }



    /**
     * This speed of the Filter.
     *
     * @member {number}
     */
    get speed() {
        return this.uniforms.speed;
    }
    set speed(value) {
        this.uniforms.speed = value;
    }


    /**
     * This zoom of the Filter.
     *
     * @member {number}
     */
    get zoom() {
        return this.uniforms.zoom;
    }
    set zoom(value) {
        this.uniforms.zoom = value;
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