import * as THREE from 'three';

export default class SampleClass {
  private geometry!: THREE.BufferGeometry;
  constructor() {
    this.geometry = new THREE.BufferGeometry();
  }
}
