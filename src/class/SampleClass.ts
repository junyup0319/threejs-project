import * as THREE from 'three';
import { Vector3, DoubleSide } from 'three';
import _ from 'lodash';


export default class SampleClass {
  private geometry!: THREE.BufferGeometry;
  private material!: THREE.Material;
  private mesh!: THREE.Mesh;

  constructor(pos: Float32Array, index: number[], color?: Float32Array ) {
    this.geometry = new THREE.BufferGeometry();
    if (_.isNil(color)) {
      this.material = new THREE.MeshBasicMaterial({ side: DoubleSide });
    } else {
      this.material = new THREE.MeshBasicMaterial({ side: DoubleSide, vertexColors: THREE.VertexColors });
    }



    this.geometry.addAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.geometry.setIndex(index);

    if (!_.isNil(color)) {
      this.geometry.addAttribute('color', new THREE.BufferAttribute(color, 4));
    }
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  public setMeshPosition(x: number, y: number, z: number) {
    this.mesh.position.set(x, y, z);
  }
  public setPosition(index: number, x?: number, y?: number, z?: number) {
    if (!_.isNil(x)) {
      this.geometry.getAttribute('position').setX(index, x);
    }
    if (!_.isNil(y)) {
      this.geometry.getAttribute('position').setY(index, y);
    }
    if (!_.isNil(z)) {
      this.geometry.getAttribute('position').setZ(index, z);
    }
  }
  get getMesh() {
    return this.mesh;
  }
  public getAttribute(name: string): THREE.BufferAttribute {
    return (this.geometry.getAttribute(name) as THREE.BufferAttribute);
  }
}
