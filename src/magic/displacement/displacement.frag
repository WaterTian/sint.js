#pragma glslify: snoise3 = require(../glsl/noise/simplex/3d)

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float time;
uniform float density;
uniform float speed;
uniform float zoom;


// FBM / Octave Noise
const float scalDiv = 4.;
const float scalDivt = 2.1;
const float sc1 = 1.0/scalDiv;
const float sc2 = sc1/scalDiv;
const float sc3 = sc2/scalDiv;
const float sc1t = 1.0 /scalDivt;
const float sc2t = sc1t/scalDivt;
const float sc3t = sc2t/scalDivt;
float FBM(vec3 v) {
	return 1.   *0.5    * snoise3(v*vec3(sc3, sc3, sc3t)) + 
		   0.4  *0.25   * snoise3(v*vec3(sc2, sc2, sc2t)) + 
		   0.15 *0.125  * snoise3(v*vec3(sc1, sc1, sc1t));
}



void main(void)
{

  vec2 uv = vTextureCoord * (1. - 0.2*zoom) + vec2(zoom, zoom)*0.1;
  float niceNoise1 = FBM( vec3(100.0 * uv, speed *time*10.)) * 0.3;
  float niceNoise2 = FBM( vec3(100.0 * uv, speed *time*11. + 300.)) * 0.33;

  gl_FragColor = texture2D(uSampler, uv + density*vec2(niceNoise1,niceNoise2) );

}
