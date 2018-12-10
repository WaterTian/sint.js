import * as core from '../../core';

import vs from '../fragments/default.vert';
import fs from './dye.frag';



export default class dye extends core.Filter {

    constructor(color = 0xffffff)
    {
        super(vs,fs);

        this.uniforms.uColor = new Float32Array(3);
        this.color = color;
        this.glShaderKey = 'dyeColor';
    }

    get color()
    {
        return this._uColor;
    }

    set color(value) // eslint-disable-line require-jsdoc
    {
        let arr = this.uniforms.uColor;
        if (typeof value === 'number') {
            core.utils.hex2rgb(value, arr);
            this._uColor = value;
        }
        else {
            arr[0] = value[0];
            arr[1] = value[1];
            arr[2] = value[2];
            this._uColor = core.utils.rgb2hex(arr);
        }
    }
    
}
