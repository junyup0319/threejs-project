precision mediump float;
precision mediump int;
// varying vec3 vPosition;
// varying vec4 vColor;

uniform float time;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D normalMap;

// uv는 그릴 좌표에 대응되는 물체의 좌표
varying vec2 vUv;

void main()	{
  vec2 uv = vUv;
  // 초기 uv 좌표계는 x, y 축이 0 ~ 1 사이의 값을 가짐
  // uv 좌표계를 2배로 늘려도 uv는 같은 크기의 geometry에 매핑되고 uv에 매칭되는 texture의 크기는 1/2으로 줄어든것 처럼 보임
    // => texture는 uv의 0 ~ 1의 값에 매핑됨

    // x, y를 각각 2배 늘리면 1/4크기에 texture가 매핑된다 (매핑되지 않는 부분은 매핑된 가장 마지막 좌표로 그려짐)
    // cpu에서 반복 설정을 해주면 2X2의 이미지가 나타난다
  // uv.x *= 0.9;
  // uv.y *= 0.9;

  vec4 movement = texture2D(normalMap, vUv + vec2(-time * 0.01, time * 0.02));
	// movement = movement * vUv.y * sin(time * 4.) * 1.;
  uv.x += movement.x * 0.1;
	uv.y += movement.y * 0.1;

  // texture2D: texture에서 uv좌표에 맞는 색상을 뽑아줌
    // uv를 변경해줌으로 물체의 왜곡을 만들 수 있다!
  vec4 tc1 = texture2D(texture1, uv);
  vec4 tc2 = texture2D(texture2, uv);
  float colorRatio = abs(sin(time * 0.1));
  // gl_FragColor = tc1 * colorRatio + tc2 * (1.0 - colorRatio);
  gl_FragColor = tc1;
  // gl_FragColor = tc1 * sin(uv.x);
}


