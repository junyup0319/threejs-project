precision mediump float;
precision mediump int;
uniform float time;
varying vec3 vPosition; // vertex n개를 보간 해서 구한 위치
varying vec4 vColor; // vertex n개를 보간 해서 구한 색
void main()	{
  vec4 color = vec4( vColor );
  color.r += sin( vPosition.y * 10.0 + time ) * 0.5;
  
  gl_FragColor = color;
  // gl_FragColor = vec4(1, 1, 1, 1); // 모든 픽셀에 1,1,1,1로 색칠
}


