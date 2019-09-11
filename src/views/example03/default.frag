precision mediump float;
precision mediump int;
// varying vec3 vPosition;
// varying vec4 vColor;

uniform float time;
uniform sampler2D texture1;
varying vec2 vUv;

void main()	{
  gl_FragColor = texture2D(texture1, vUv);
  // gl_FragColor = vec4(1, 1, 1, 1);
}


