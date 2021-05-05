varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 filterArea;

uniform float time;
uniform vec2 offset;

uniform vec3 uColor1;
uniform vec3 uColor2;


uniform float density;
uniform float speed;
uniform float zoom;




// 
// base: https://www.shadertoy.com/view/XdyXz3
// other https://www.shadertoy.com/view/MsdGWn
// other https://www.shadertoy.com/view/4slXzs
//


#pragma glslify: snoise = require(../glsl/noise/simplex/3d)
#pragma glslify: hsv2rgb = require(../glsl/convertHsvToRgb)
#pragma glslify: rgb2hsv = require(../glsl/convertRgbToHsv)




vec3 noise3( in vec3 x)
{
  return vec3( 
      snoise(x+vec3(61.456,.567,.37)+vec3(offset.x)*speed*density),
      snoise(x+vec3(.11,47.43,19.17)+vec3(offset.y)*speed*density),
      snoise(x)
      );
}

mat3 rotation(float angle, vec3 axis)
{
  float s = sin(-angle);
  float c = cos(-angle);
  vec3 sa = axis * s;
  vec3 oca = axis * c;
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

    float time = time*speed*0.1;
    uv *= 1. + 0.25*sin(time*0.1);  
    
    
    vec3 p = vec3(uv*zoom,time);  //coordinate + slight change over time
    vec3 axis = 4. * fbm(p, 0.5, density);  //random fbm axis of rotation      

    vec3 colorVec = vec3(1.0); 

    colorVec = rotation(1.5*length(axis),normalize(axis))*colorVec;
    colorVec *= 0.7;

    colorVec = vec3(length(rgb2hsv(colorVec).xz));

    colorVec = max(vec3(0.76),colorVec);
    

    colorVec *= (vTextureCoord.y) * uColor1;
    colorVec += (1.0-vTextureCoord.y) *uColor2;


    // vec4 bg = texture2D(uSampler, vTextureCoord );
    // colorVec += bg.rgb*0.1;

    gl_FragColor = vec4(colorVec,1.0);
}

