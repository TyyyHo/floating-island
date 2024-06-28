import * as THREE from "three";

import { MapControls } from "three/addons/controls/MapControls.js";

export interface iCreator {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  controls: MapControls;
}

export interface iInitValue {
  water: number;
  sky: number;
  cameraPosition: { x: number; y: number; z: number };
  controlsTarget: { x: number; y: number; z: number };
}

export interface iEnviromentParams {
  rayleigh: number;
  mieDirectionalG: number;
  sunColor: string;
  waterColor: string;
}

export interface iSite {
  id: number;
  name: string;
  position: { x: number; y: number; z: number };
  mesh: THREE.Mesh;
}
