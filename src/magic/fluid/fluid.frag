varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 offset;
uniform vec4 filterArea;

uniform float time;


// 
// base: https://www.shadertoy.com/view/XdyXz3
// other https://www.shadertoy.com/view/MsdGWn
// other https://www.shadertoy.com/view/4slXzs
//


#pragma glslify: snoise = require(../glsl/noise/simplex/2d)


const float STEPS = 3.;
const float CUTOFF = 0.3; //depth less than this, show white wall


vec3 hsv2rgb(vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float getNoise(vec2 uv, float t){
    //given a uv coord and time - return a noise val in range 0 - 1
    //using ashima noise
    
    //octave 1
    float SCALE = 5.0;
    float noise = snoise( vec2(uv.x*SCALE*0.3,uv.y*SCALE + t*0.2));
    
    //octave 2 - more detail
    SCALE = 7.0;
    noise += snoise( vec2(uv.x*SCALE + t,uv.y*SCALE + t))* 0.2 ;
    
    //move noise into 0 - 1 range    
    // noise = (noise/2. + 0.5);
    
    //make deeper rarer
    // noise = pow(noise,2.);
    return noise;
    
}

float getDepth(float n){
    //given a 0-1 value return a depth,
    //e.g. distance into the hole
    
    //remap remaining non-cutoff region to 0 - 1
    float d = (n - CUTOFF) / (1. - CUTOFF); 
    //step it
    d =floor(d*STEPS)/STEPS;
    // d =(d*STEPS)/STEPS;
    // d = sin(d);
    return d;
}

void main(void)
{
    vec2 uv = vTextureCoord;
    float t = time * 0.1;    
    vec3 col = vec3(0);
    
    float noise = getNoise(uv, t);
    
    if (noise < CUTOFF){
        // col = vec3(1.,1.,1.);//white
        col = hsv2rgb(vec3(260./360.,0.6,.7));
    }else{
        float d = getDepth(noise);
        
        //calc HSV color
        float h = 270./360. - d*0.1; //rainbow hue
        float s = 0.6;
        float v = 0.9 - ( d*.3); //deeper is darker
        
        col = hsv2rgb(vec3(h,s,v));  
    }
    

    //vertical gradient grey

    col += (1.0 - vTextureCoord.y *0.7) * hsv2rgb(vec3(270./360.,0.6,.7))*0.5;
    col *= 1.0 - (vTextureCoord.y *0.7);

    gl_FragColor = vec4(col,1.0); 
}

