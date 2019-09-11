import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as THREE from 'three';

// @ts-ignore
import vs from '!!raw-loader!./project04.vert';
// @ts-ignore
import fs from '!!raw-loader!./project04.frag';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


@Component({})
export default class Template extends Vue {
  public $refs!: {
    renderer: HTMLElement;
  };

  private scene!: THREE.Scene;
  private camera!: THREE.Camera;
  private renderer!: THREE.Renderer;
  private material!: THREE.Material;

  private tick: number = 0;

  private update() {
    requestAnimationFrame( this.update.bind(this) );
    (this.material as THREE.RawShaderMaterial).uniforms.time = {
      value: this.tick * 0.05,
    };
    this.renderer.render( this.scene, this.camera );
    this.tick++;
  }

  private getThreePoint(center: {x: number, y: number, z: number}, size: number)
    : Array<{x: number, y: number, z: number}> {
    const pm = (Math.random() < 0.5 ? -1 : 1);
    const point1 = {
      x: (center.x + Math.random() * size) * pm,
      y: (center.y + Math.random() * size) * pm,
      z: center.z + (Math.random() * 2 - 1) * 0.03,
    };
    const point2 = {
      x: (center.x + Math.random() * size) * pm,
      y: (center.y + Math.random() * size) * pm,
      z: center.z + (Math.random() * 2 - 1) * 0.03,
    };
    const point3 = {
      x: (center.x + Math.random() * size) * pm,
      y: (center.y + Math.random() * size) * pm,
      z: center.z + (Math.random() * 2 - 1) * 0.03,
    };
    return [point1, point2, point3];
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

    const materialCount = 2000;
    const vertices = new Float32Array(materialCount * 9);
    for (let i = 0; i < materialCount * 3; i += 3) {
      const point = this.getThreePoint({
        x: Math.random() * 50 * (Math.random() < 0.5 ? -1 : 1),
        y: Math.random() * 50 * (Math.random() < 0.5 ? -1 : 1),
        z: Math.random() * -10}, 3);
      vertices.set([point[0].x, point[0].y, point[0].z], i * 3);
      vertices.set([point[1].x, point[1].y, point[1].z], i * 3 + 3);
      vertices.set([point[2].x, point[2].y, point[2].z], i * 3 + 6);
    }

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

    this.camera.position.z = 100;

    this.update();

  }

}
