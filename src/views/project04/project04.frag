precision mediump float;
precision mediump int;

uniform float time;

varying vec3 vPosition; // vertex n개를 보간 해서 구한 위치
varying vec4 vColor; // vertex n개를 보간 해서 구한 색
void main()	{
  vec4 color = vec4( vColor );
  vec3 pos = vPosition;
  // color.r += sin( vPosition.z ) * 0.5;
  // color.g += sin( vPosition.x ) * 0.5;
  // color.b += sin( vPosition.y ) * 0.5;
  color.g = -sin(vPosition.z);
  color.b = -sin(vPosition.z);
  gl_FragColor = color;

  // gl_FragColor = vec4(1, 1, 1, 0.7); // 모든 픽셀에 1,1,1,1로 색칠
}


