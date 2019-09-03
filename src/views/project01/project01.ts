import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as THREE from 'three';
import _ from 'lodash';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Vector3, DoubleSide } from 'three';

interface Props {
  pos: Float32Array;
  color: Float32Array;
}
interface Attributes {
  pos: THREE.BufferAttribute;
  // color: THREE.BufferAttribute;
}
@Component({})
export default class Project01 extends Vue {
  public $refs!: {
    renderer: HTMLElement,
  };

  private props!: Props;
  private attr!: Attributes;

  private scene!: THREE.Scene;
  private camera!: THREE.Camera;
  private renderer!: THREE.Renderer;
  private geometry!: THREE.BufferGeometry;




  // private vertices: number[] = [];

  private tick = 0;

  private update() {
    requestAnimationFrame( this.update.bind(this) );
    // this.geometry.attributes.position.array[0] = Math.sin(new Date().getTime());
    (this.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;

    for (let i = 0; i < this.attr.pos.count; i++) {
      this.geometry.getAttribute('position').setZ(i, Math.sin(this.tick / 16 + Math.floor(i / 20) * 0.4) * 1.2);
    }
    this.tick++;
    this.renderer.render( this.scene, this.camera );
  }

  private mounted() {
    this.scene = new THREE.Scene();
    const width = this.$refs.renderer.clientWidth;
    const height = this.$refs.renderer.clientHeight;

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    this.$refs.renderer.appendChild(this.renderer.domElement);


    this.geometry = new THREE.BufferGeometry();


    const xPointCount = 20;
    // 점의 좌표
    const points: Array<{x: number, y: number, z: number}> = [];
    for (let i = 0; i < Math.pow(xPointCount, 2); i ++) {
      const x = i % xPointCount;
      const y = Math.floor((i / xPointCount));
      points.push({x, y, z: 0});
    }

    this.props = {
      pos : new Float32Array(points.length * 3),
      color : new Float32Array(points.length * 4),
    };

    _.forEach(points, (p, i) => {
      this.props.pos.set([p.x, p.y, p.z], i * 3);
    });

    // 네모의 x 개수
    const xBoxCount = Math.sqrt(points.length) - 1;
    // 네모의 전체 개수
    const xyBoxCount = Math.pow(xBoxCount, 2);


    // 그릴 순서
    const index: number[] = [];
    for (let i = 0; i < xyBoxCount; i++) {
      const ltIndex = (Math.floor(i / xBoxCount) + 1) * xPointCount + i % xBoxCount;
      // 왼쪽 위 삼각형
      index.push(ltIndex);
      index.push(ltIndex - xPointCount);
      index.push(ltIndex + 1);

      // 오른쪽 아래 삼각형
      index.push(ltIndex + 1);
      index.push(ltIndex - xPointCount);
      index.push(ltIndex - xPointCount + 1);
    }

    this.attr = {
      pos: new THREE.BufferAttribute(this.props.pos, 3),
      // color: new THREE.BufferAttribute(this.props.color, 4),
    };

    this.geometry.addAttribute('position', this.attr.pos);

    // this.geometry.addAttribute('color', this.attr.color);
    this.geometry.setIndex(index);

    const material = new THREE.MeshBasicMaterial( {  side: DoubleSide } );
    const mesh = new THREE.Mesh( this.geometry, material );

    // 전체 mesh의 position 변경
    mesh.position.set(-xBoxCount / 2, -xBoxCount / 2, 0);

    this.scene.add( mesh );


    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.set(40, -20, 30);
    this.camera.lookAt(0, 0, 0);
    this.camera.up = new Vector3(0, 0, 1);
    // controls.update(); -> ??



    this.update();

  }
}
