
precision mediump float;
precision mediump int;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float time;

attribute vec3 position;
attribute vec4 color;
attribute vec2 uv;

varying vec2 vUv;

void main()	{
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); // 카메라 상의 위치? => 외우기
    // projectionMatrix: 카메라 직육면체의 4x4 행렬
    // modelVIewMatrix: 물체 4x4 행렬
    // matrix: 이동, 크기, 회전을 가지고 있다
}