varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec3 uColor;

void main(void)
{
   vec4 currentColor = texture2D(uSampler, vTextureCoord);
   gl_FragColor = vec4(mix(currentColor.rgb, uColor * currentColor.a, 0.7)*1.3, currentColor.a);
}