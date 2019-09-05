import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import SampleClass from '@/class/SampleClass';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import _ from 'lodash';

interface Props {
  pos: Float32Array;
  color: Float32Array;
}

@Component({})
export default class Project02 extends Vue {
  public $refs!: {
    renderer: HTMLElement,
  };
  private scene!: THREE.Scene;
  private camera!: THREE.Camera;
  private renderer!: THREE.Renderer;

  private lightHelper!: THREE.SpotLightHelper;
  private spotLight!: THREE.SpotLight;

  private props!: Props;
  private mesh!: SampleClass;
  private tick = 0;

  private update() {
    requestAnimationFrame( this.update.bind(this) );
    // this.geometry.attributes.position.array[0] = Math.sin(new Date().getTime());
    // (this.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    this.mesh.getAttribute('position').needsUpdate = true;
    this.mesh.getAttribute('color').needsUpdate = true;

    const mousePoint = [100, 100, 100];
    for (let i = 0; i < this.props.pos.length / 3; i++) {
      this.props.pos[i * 3 + 2] = Math.sin(this.tick / 16 + Math.floor(i / 20) * 0.4) * 1.2;
      const lightVector = new Vector3(this.props.pos[i * 3] - mousePoint[0],
        this.props.pos[i * 3 + 1] - mousePoint[1],
        this.props.pos[i * 3 + 2] - mousePoint[2]).normalize();

      let normal;
      if (i !== 0 && i % 19 === 0 && i > 399 - 20) {
        normal = new Vector3(
          (2 * this.props.pos[i * 3] - this.props.pos[i * 3 - 3]) - this.props.pos[i * 3],
          (2 * this.props.pos[i * 3 + 1] - this.props.pos[i * 3 - 3 + 1]) - this.props.pos[i * 3 + 1],
          (2 * this.props.pos[i * 3 + 2] - this.props.pos[i * 3 - 3 + 2]) - this.props.pos[i * 3 + 2])
          .cross(new Vector3(
            (2 * this.props.pos[i * 3] - this.props.pos[i * 3 - 3 * 20]) - this.props.pos[i * 3],
            (2 * this.props.pos[i * 3 + 1] - this.props.pos[i * 3 - 3 * 20 + 1]) - this.props.pos[i * 3 + 1],
            (2 * this.props.pos[i * 3 + 2] - this.props.pos[i * 3 - 3 * 20 + 2]) - this.props.pos[i * 3 + 2]));
      } else if (i !== 0 && i % 20 === 0) {
        normal = new Vector3(2 * this.props.pos[i * 3] - (this.props.pos[i * 3 - 3]) - this.props.pos[i * 3],
          2 * this.props.pos[i * 3 + 1] - (this.props.pos[i * 3 - 3 + 1]) - this.props.pos[i * 3 + 1],
          2 * this.props.pos[i * 3 + 2] - (this.props.pos[i * 3 - 3 + 2]) - this.props.pos[i * 3 + 2])
          .cross(new Vector3(
            this.props.pos[i * 3 + 3 * 20] - this.props.pos[i * 3],
            this.props.pos[i * 3 + 3 * 20 + 1] - this.props.pos[i * 3 + 1],
            this.props.pos[i * 3 + 3 * 20 + 2] - this.props.pos[i * 3 + 2]));
      } else if (i > 399 - 20) {
        normal = new Vector3(
          this.props.pos[i * 3 + 3] - this.props.pos[i * 3],
          this.props.pos[i * 3 + 3 + 1] - this.props.pos[i * 3 + 1],
          this.props.pos[i * 3 + 3 + 2] - this.props.pos[i * 3 + 2])
          .cross(new Vector3(
            (2 * this.props.pos[i * 3] - this.props.pos[i * 3 - 3 * 20]) - this.props.pos[i * 3],
            (2 * this.props.pos[i * 3 + 1] - this.props.pos[i * 3 - 3 * 20 + 1]) - this.props.pos[i * 3 + 1],
            (2 * this.props.pos[i * 3 + 2] - this.props.pos[i * 3 - 3 * 20 + 2]) - this.props.pos[i * 3 + 2]));
      } else {
        normal = new Vector3(
            this.props.pos[i * 3 + 3] - this.props.pos[i * 3],
            this.props.pos[i * 3 + 3 + 1] - this.props.pos[i * 3 + 1],
            this.props.pos[i * 3 + 3 + 2] - this.props.pos[i * 3 + 2])
            .cross(new Vector3(
              this.props.pos[i * 3 + 3 * 20] - this.props.pos[i * 3],
              this.props.pos[i * 3 + 3 * 20 + 1] - this.props.pos[i * 3 + 1],
              this.props.pos[i * 3 + 3 * 20 + 2] - this.props.pos[i * 3 + 2]));
      }

      const val = Math.abs(normal.normalize().dot(lightVector));
      this.props.color[i * 4] = val;
      this.props.color[i * 4 + 1] = val;
      this.props.color[i * 4 + 2] = val;



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

    for (let i = 0; i < this.props.color.length / 4; i++) {
      this.props.color.set([ 1, 0.5, 0.5, 1], i * 4);
    }

    this.mesh = new SampleClass(this.props.pos, index, this.props.color);
    this.mesh.setMeshPosition(-xBoxCount / 2, -xBoxCount / 2, 0);
    this.scene.add(this.mesh.getMesh);




    // const ambient = new THREE.AmbientLight( 0xffffff, 0.1 );
    // this.scene.add( ambient );

    // this.spotLight = new THREE.SpotLight( 0xffffff, 1 );
    // this.spotLight.position.set( 0, 0, 0 );
    // this.spotLight.angle = Math.PI / 6;
    // this.spotLight.penumbra = 0.05;
    // this.spotLight.decay = 2;
    // this.spotLight.distance = 100;
    // this.spotLight.castShadow = true;
    // this.spotLight.shadow.mapSize.width = 1024;
    // this.spotLight.shadow.mapSize.height = 1024;
    // this.spotLight.shadow.camera.near = 10;
    // this.spotLight.shadow.camera.far = 200;
    // this.scene.add( this.spotLight );

    // this.lightHelper = new THREE.SpotLightHelper( this.spotLight );
    // this.scene.add( this.lightHelper );
    // const shadowCameraHelper = new THREE.CameraHelper( this.spotLight.shadow.camera );
    // this.scene.add( shadowCameraHelper );


    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.copy( this.mesh.getMesh.position );
    this.camera.position.set(40, -20, 30);
    this.camera.lookAt(0, 0, 0);
    this.camera.up = new Vector3(0, 0, 1);

    this.update();
    // document.addEventListener('mousemove', (e) => {
    //   console.log('aa', e.clientX - width / 2, e.clientY - height / 2);
    //   this.spotLight.position.set(e.clientX - width / 2, e.clientY - height / 2, 35);
    // });
  }
}
