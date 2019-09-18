// file created at 2019-9-18
// Auto-generated files project05.ts
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

// @ts-ignore
import vs from '!!raw-loader!./project05.vert';
// @ts-ignore
import fs from '!!raw-loader!./project05.frag';

@Component({})
export default class Project05 extends Vue {
  public $refs!: {
    renderer: HTMLElement,
  };

  private scene!: THREE.Scene;
  private camera!: THREE.Camera;
  private renderer!: THREE.Renderer;
  private geometry!: THREE.PlaneGeometry;
  private material!: THREE.Material;

  private tick: number = 0;

  private update() {
    requestAnimationFrame( this.update.bind(this) );

    (this.material as THREE.RawShaderMaterial).uniforms.time = {
      value: this.tick * 0.1,
    };

    this.renderer.render( this.scene, this.camera );
    this.tick++;
  }

  private mounted() {
    this.scene = new THREE.Scene();

    const width = this.$refs.renderer.clientWidth;
    const height = this.$refs.renderer.clientHeight;

    this.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setSize( width, height );
    this.$refs.renderer.appendChild(this.renderer.domElement);


    this.geometry = new THREE.PlaneGeometry(5, 5);

    // image 경로는 public을 기준으로 설정해야함
      // 브라우저에서 처리하는 것이므로
    const texture = new THREE.TextureLoader().load('/image.jpg');
    const texture2 = new THREE.TextureLoader().load('/image2.jpeg');
    const normalMap = new THREE.TextureLoader().load('/normal_map1.jpg');

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture2.wrapS = THREE.RepeatWrapping;
    texture2.wrapT = THREE.RepeatWrapping;

    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;

    this.material = new THREE.RawShaderMaterial( {
      uniforms: {
        time: {value: 0},
        show: {value: 0},
        texture1: {
          type: 't',
          value: texture,
        },
        texture2: {
          type: 't',
          value: texture2,
        },
        normalMap: {
          type: 't',
          value: normalMap,
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.DoubleSide,
      transparent: true,
    } );
    const mesh = new THREE.Mesh( this.geometry, this.material );

    this.scene.add( mesh );

    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.camera.position.z = 5;

    this.update();

  }
}
