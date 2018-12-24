import * as core from '../../core';
import vs from '../fragments/default.vert';
import fs from './bulgePinch.frag';

/**
 * @author Julien CLEREL @JuloxRox
 * original filter https://github.com/evanw/glfx.js/blob/master/src/filters/warp/bulgepinch.js by Evan Wallace : http://madebyevan.com/
 */

/**
 * Bulges or pinches the image in a circle.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/bulge-pinch.gif)
 *
 * @class
 * @extends SINT.Filter
 * @memberof SINT.magic
 * @param {SINT.Point|Array<number>} [center=[0.5, 0.5]] The x and y coordinates of the center of the circle of effect.
 * @param {number} [radius=100] The radius of the circle of effect.
 * @param {number} [strength=1] -1 to 1 (-1 is strong pinch, 0 is no effect, 1 is strong bulge)
 */
export default class BulgePinchFilter extends core.Filter {

    constructor(center, radius, strength) {
        super(vs,fs);
        this.uniforms.dimensions = new Float32Array(2);
        this.center = center || [0.5, 0.5];
        this.radius = radius || 100;
        this.strength = strength || 1;
    }

    apply(filterManager, input, output, clear) {
        this.uniforms.dimensions[0] = input.sourceFrame.width;
        this.uniforms.dimensions[1] = input.sourceFrame.height;
        filterManager.applyFilter(this, input, output, clear);
    }

    /**
     * The radius of the circle of effect.
     *
     * @member {number}
     */
    get radius() {
        return this.uniforms.radius;
    }
    set radius(value) {
        this.uniforms.radius = value;
    }

    /**
     * The strength of the effect. -1 to 1 (-1 is strong pinch, 0 is no effect, 1 is strong bulge)
     *
     * @member {number}
     */
    get strength() {
        return this.uniforms.strength;
    }
    set strength(value) {
        this.uniforms.strength = value;
    }

    /**
     * The x and y coordinates of the center of the circle of effect.
     *
     * @member {SINT.Point}
     */
    get center() {
        return this.uniforms.center;
    }
    set center(value) {
        this.uniforms.center = value;
    }
}
