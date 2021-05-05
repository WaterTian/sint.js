import * as core from '../../core';
import vs from '../fragments/default.vert';
import fs from './displacement.frag';

/**
 * 
 * @class
 * @extends SINT.Filter
 * @memberof SINT.magic
 * @param {number} [density]
 * @param {number} [speed]
 * @param {number} [zoom]
 */
export default class DisplacementFilter extends core.Filter {
    constructor(density = 0.0, speed = 0.0, zoom = 0.0) {
        super(vs, fs);

        this.uniforms.time = 0;
        this.uniforms.density = density;
        this.uniforms.speed = speed;
        this.uniforms.zoom = zoom;

    }

    apply(filterManager, input, output, clear) {
        this.uniforms.time += 0.03;
        filterManager.applyFilter(this, input, output, clear);
    }


    /**
     * This density of the Filter noise.
     *
     * @member {number}
     */
    get density() {
        return this.uniforms.density;
    }
    set density(value) {
        this.uniforms.density = value;
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

}