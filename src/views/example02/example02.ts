import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

// @ts-ignore
import vs from '!!raw-loader!./default.vert';
// @ts-ignore
import fs from '!!raw-loader!./default.frag';


@Component({})
export default class Example01 extends Vue {
  public $refs!: {
    renderer: HTMLElement,
  };

  private scene!: THREE.Scene;
  private camera!: THREE.Camera;
  private renderer!: THREE.Renderer;
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

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    this.$refs.renderer.appendChild(this.renderer.domElement);


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
    this.material = new THREE.RawShaderMaterial( {
      uniforms: {
        time: { value: 1.0 },
      },
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.DoubleSide,
      transparent: true,
    } );
    const mesh = new THREE.Mesh( geometry, this.material );

    this.scene.add( mesh );

    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.camera.position.z = 5;

    this.update();

  }
}
