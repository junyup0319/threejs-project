
precision mediump float;
precision mediump int;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float time;

attribute vec3 position;
attribute vec4 color;

attribute vec2 uv;
// uv좌표계는 자동으로 넘어옴
  // uv좌표계는 texture(그림 등,,)를 매핑하기 위한 변환 기준이되는 2차원좌표계
  // => 실제 texture의 좌표가 아닌 임의의값 => uv 좌표계는 0,0부터 1,1까지 설정되어있다
  // uv의 x와 y좌표는 각각 0~1 사이 의 값으로 정해진다 (왼쪽아래: 0,0 / 오른쪽 위: 1,1)
  // uv의 크기를 변화시켜도 우리가 그리는 각각의 좌표에 대응됨

// varying vec3 vPosition;
varying vec2 vUv;

void main()	{
  // vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); // 카메라 상의 위치? => 외우기
    // projectionMatrix: 카메라 직육면체의 4x4 행렬
    // modelVIewMatrix: 물체 4x4 행렬
    // matrix: 이동, 크기, 회전을 가지고 있다
}