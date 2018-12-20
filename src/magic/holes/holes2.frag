varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 filterArea;

uniform float time;
uniform vec2 offset;


// 
// base: https://www.shadertoy.com/view/XdyXz3
// other https://www.shadertoy.com/view/MsdGWn
// other https://www.shadertoy.com/view/4slXzs
//


#pragma glslify: snoise = require(../glsl/noise/simplex/3d)
#pragma glslify: hsv2rgb = require(../glsl/convertHsvToRgb)
#pragma glslify: rgb2hsv = require(../glsl/convertRgbToHsv)



const float _Speed = 0.01;     
const float _Scale = 0.25;
const float _Colour = 0.15;   // 0.01..0.3
const float _Lacunarity = 2.5;



// // hq texture noise
// float noise( in vec3 x )
// {
//     vec3 p = floor(x);
//     vec3 f = fract(x);
//   f = f*f*(3.0-2.0*f);
//   vec2 uv = (p.xy+vec2(37.0,17.0)*p.z);
//   vec2 rg1 = texture( iChannel0, (uv+ vec2(0.5,0.5))/256.0, -100.0 ).yx;
//   vec2 rg2 = texture( iChannel0, (uv+ vec2(1.5,0.5))/256.0, -100.0 ).yx;
//   vec2 rg3 = texture( iChannel0, (uv+ vec2(0.5,1.5))/256.0, -100.0 ).yx;
//   vec2 rg4 = texture( iChannel0, (uv+ vec2(1.5,1.5))/256.0, -100.0 ).yx;
//   vec2 rg = mix( mix(rg1,rg2,f.x), mix(rg3,rg4,f.x), f.y );
//   return mix( rg.x, rg.y, f.z );
// }


vec3 noise3( in vec3 x)
{
  return vec3( 
      // snoise(x+vec3(61.456,.567,.37)),
      // snoise(x+vec3(.11,47.43,19.17)),

      snoise(x+vec3(61.456,.567,.37)+vec3(offset.x)*0.2),
      snoise(x+vec3(.11,47.43,19.17)+vec3(offset.y)*0.2),
      snoise(x)
      );
}

mat3 rotation(float angle, vec3 axis)
{
  float s = sin(-angle);
  float c = cos(-angle);
  float oc = _Colour - c;
  vec3 sa = axis * s;
  vec3 oca = axis * oc;
  return mat3(  
    oca.x * axis + vec3(  c,  -sa.z,  sa.y),
    oca.y * axis + vec3( sa.z,  c,    -sa.x),   
    oca.z * axis + vec3(-sa.y,  sa.x, c));  
}

// https://code.google.com/p/fractalterraingeneration/wiki/Fractional_Brownian_Motion
vec3 fbm(vec3 x, float H, float L)
{
  vec3 v = vec3(0);
  float f = 1.;
  for (int i=0; i<3; i++)
  {
    float w = pow(f,-H);
    v += noise3(x)*w;
    x *= L;
    f *= L;
  }
  return v;
}



void main(void)
{
    vec2 uv = vTextureCoord;
    uv.x *= filterArea.x / filterArea.y;

    float time = time*_Speed;
    uv *= 1. + 0.25*sin(time*10.);  
    
    
    vec3 p = vec3(uv*_Scale,time);  //coordinate + slight change over time
    
    vec3 axis = 4. * fbm(p, 0.5, _Lacunarity);  //random fbm axis of rotation      

    // vec3 colorVec = 2. * fbm(p*0.2,0.5,_Lacunarity);  //random base color
    vec3 colorVec = vec3(1.0);  //random base color

    colorVec = rotation(1.5*length(axis),normalize(axis))*colorVec;
    colorVec *= 0.7;

    colorVec = vec3(length(rgb2hsv(colorVec).xz));

    colorVec = max(vec3(0.76),colorVec);
    
    // colorVec *= (vTextureCoord.y) * hsv2rgb(vec3(250./360.,0.72,.58));
    // colorVec += (1.0-vTextureCoord.y) * hsv2rgb(vec3(270./360.,0.58,.74));
    colorVec *= (vTextureCoord.y) * vec3(51.,35.,143.)/255.;
    colorVec += (1.0-vTextureCoord.y) * vec3(131.,80.,189.)/255.;


    // colorVec *= 1.0 - (vTextureCoord.y *.7);

    // vec4 bg = texture2D(uSampler, vTextureCoord );
    // colorVec += bg.rgb*0.1;

    gl_FragColor = vec4(colorVec,1.0);
}

