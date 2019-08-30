import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import * as THREE from 'three';

@Component({})
export default class Example01 extends Vue {
  public $refs!: {
    renderer: HTMLElement,
  };

  private scene!: THREE.Scene;
  // camera는 여기서 new 해주면 dom의 사이즈를 모른다!
  private camera!: THREE.Camera;
  private renderer!: THREE.Renderer;

  private update() {
    // 브라우저에 this.render를 등록 => 이렇게해서 브라우저가 프레임마다 계속해서 render를 실행하게 해줌
    // 아래와 같이 해두면 this가 바인딩이 안돼서 여러 클래스를 생성할때 this에 vue가 바인딩되게 되어 에러가 난다
    // requestAnimationFrame( this.render );
    // 따라서 아래와 같이 this를 바인딩 해줘야함
    requestAnimationFrame( this.update.bind(this) );

    this.renderer.render( this.scene, this.camera );
  }

  private mounted() {
    // scene: 장면 -> 그룹 (물체를 등록할 수 있다)
    this.scene = new THREE.Scene();

    const width = this.$refs.renderer.clientWidth;
    const height = this.$refs.renderer.clientHeight;

    // camera
      // perspective camera: 원근법 (3D)
      // orthographic camera: 직교그래픽 (2D) -> 직교가 확장되면 3D
      // => frustum: 절두체 (가까운건 작게, 큰 건 크게 비율에 맞게 보여주면 3D가 표현된다)

      // fov(field of view): 화각(보이는 각도), aspect: 종횡비, near: 가까운 평면의 거리, far: 먼 평면까지의 거리
        // near에서 far까지만 그린다! (더 이상 그리면 컴퓨터 무리..)
        // 가까이 보고 싶으면 화각을 줄여주면 된다!
      // 절두체 3D가 2D로 보이려면 작은 평면의 크기와 큰 평면의 크기의 비율이 같아지면 된다
    this.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    // this.camera = new THREE.OrthographicCamera(
    //   -width/2,
    //   width/2,
    //   -height/2,
    //   height/2,
    //   .1,
    //   1000,
    // );


    // renderer: 화면에 보이는 버퍼
    // 더블버퍼링
      // back buffer에서 그림을 칠하고 그 버퍼를 front buffer로 바꿔준다 => 화면의 깜빡임을 줄인다
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    this.$refs.renderer.appendChild(this.renderer.domElement);



    // 물체
      // 기하정보 (생김새): geometry
      // 그리는 방법 (붓): material
      // 두개를 조합해서 mesh가 나온다 (속이 비어있다)
      // 정점: vertex
      // 사각형은 삼각형 두개로 그려진다
      // 오각형은 삼각형 n개로 그려진다 ...
    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const cube = new THREE.Mesh( geometry, material );
    // this.scene.add( cube );
    // this.camera.position.z = 5;


    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array([
      -1.0, -1.0,  1.0,
      1.0, -1.0,  1.0,
      1.0,  1.0,  1.0,

      1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0, -1.0,  1.0,
    ]);

    geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    const mesh = new THREE.Mesh( geometry, material );

    this.scene.add( mesh );

    this.camera.position.z = 5;

    this.update();

  }
}
