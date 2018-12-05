import * as core from '../../core';


import vs from '../fragments/default.vert';
import fs from './glitch.frag';



export default class glitch extends core.Filter {
    
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