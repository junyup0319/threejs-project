import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import SampleClass from '@/class/SampleClass';
import * as THREE from 'three';
import _ from 'lodash';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector3 } from 'three';



interface Props {
  pos: Float32Array;
  color: Float32Array;
}

@Component({})
export default class Project03 extends Vue {
  public $refs!: {
    renderer: HTMLElement,
  };

  private mousePos: {
    x: number,
    y: number,
    z: number,
  } = {
    x: 100, y: 100, z: 100,
  };

  private scene!: THREE.Scene;
  private camera!: THREE.Camera;
  private renderer!: THREE.Renderer;

  private props!: Props;
  private mesh!: SampleClass;


  private ui: {
    xPointCount: number;
    originColor: {r: number, g: number, b: number};
  } = {
    xPointCount: 20,
    originColor: {r: 0.2, g: 0.2, b: 1},
  };

  private centerPoint: {x: number, y: number, z: number} = {
    x: 0,
    y: 0,
    z: 100,
  };
  private tick = 0;

  private update() {
    requestAnimationFrame( this.update.bind(this) );
    this.mesh.getAttribute('position').needsUpdate = true;
    this.mesh.getAttribute('color').needsUpdate = true;
    const mousePoint = [100, 100, 100];
    for (let i = 0; i < this.props.pos.length / 3; i++) {
      // this.props.pos[i * 3 + 2] = Math.sin(this.tick / 16 + Math.floor(i / 20) * 0.4) * 1.2;
      const distance = new Vector3(this.centerPoint.x, this.centerPoint.y, this.centerPoint.z)
      .distanceTo(new Vector3(this.props.pos[i * 3], this.props.pos[i * 3 + 1], this.props.pos[i * 3 + 2]));
      this.props.pos[i * 3 + 2] = Math.sin(distance - this.tick * 0.08) * 0.1;


      const lightVector = new Vector3(this.props.pos[i * 3] - this.mousePos.x,
        this.props.pos[i * 3 + 1] - this.mousePos.y,
        this.props.pos[i * 3 + 2] - this.mousePos.z).normalize();

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

      this.props.color[i * 4] = this.ui.originColor.r * val;
      this.props.color[i * 4 + 1] = this.ui.originColor.g * val;
      this.props.color[i * 4 + 2] = this.ui.originColor.b * val;
    }
    this.tick++;
    this.renderer.render( this.scene, this.camera );
  }

  private mounted() {
    this.$refs.renderer.addEventListener('mousemove', (e) => {
      this.mousePos.x =  e.offsetX - width / 2;
      this.mousePos.y = height / 2 - e.offsetY;
    });


    this.scene = new THREE.Scene();
    const width = this.$refs.renderer.clientWidth;
    const height = this.$refs.renderer.clientHeight;

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    this.$refs.renderer.appendChild(this.renderer.domElement);

    const points: Array<{x: number, y: number, z: number}> = [];
    for (let i = 0; i < Math.pow(this.ui.xPointCount, 2); i ++) {
      const x = i % this.ui.xPointCount;
      const y = Math.floor((i / this.ui.xPointCount));
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
      const ltIndex = (Math.floor(i / xBoxCount) + 1) * this.ui.xPointCount + i % xBoxCount;
      // 왼쪽 위 삼각형
      index.push(ltIndex);
      index.push(ltIndex - this.ui.xPointCount);
      index.push(ltIndex + 1);

      // 오른쪽 아래 삼각형
      index.push(ltIndex + 1);
      index.push(ltIndex - this.ui.xPointCount);
      index.push(ltIndex - this.ui.xPointCount + 1);
    }
    // this.props.color.fill(1);
    for (let i = 0; i < this.props.color.length / 4; i++) {
      this.props.color.set([ this.ui.originColor.r, this.ui.originColor.g, this.ui.originColor.b, 1], i);
    }

    this.mesh = new SampleClass(this.props.pos, index, this.props.color);
    this.mesh.setMeshPosition(-xBoxCount / 2, -xBoxCount / 2, 0);
    this.scene.add(this.mesh.getMesh);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.copy( this.mesh.getMesh.position );
    this.camera.position.set(0, 0, 30);
    this.camera.lookAt(0, 0, 0);
    this.camera.up = new Vector3(0, 0, 1);

    this.centerPoint = {
      x: this.props.pos[this.props.pos.length - 1 - 2] / 2,
      y: this.props.pos[this.props.pos.length - 1 - 1] / 2,
      z: 0,
    };

    this.update();


  }
}
