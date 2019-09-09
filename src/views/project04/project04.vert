
precision mediump float;
precision mediump int;
uniform mat4 modelViewMatrix; // optional // uniform: 변하지 않는 상수값 - 모든 .vert 들이 하나의 union을 보고 있다(static과 유사한 느낌)
uniform mat4 projectionMatrix; // optional

uniform float time;

attribute vec3 position; // 밖에서는 n개의 점 * 3(x, y, z)개 지만 안에서는 점 한개에 인덱싱 되어서 넘어온다
attribute vec4 color;

varying vec3 vPosition; // frag 에 넘겨줄 값
varying vec4 vColor; // frag 에 넘겨줄 값
void main()	{ // 정점 하나하나에 대한 코드
  vColor = color;
  vec3 pos = position;
  pos.z = sin(time + pos.z) * 50.0;
  vPosition = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}