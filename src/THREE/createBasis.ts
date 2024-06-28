import * as THREE from "three";

import { MapControls } from "three/addons/controls/MapControls.js";

// types
import { iInitValue } from "../types.ts";

export function createBasis(initValue: iInitValue) {
  // Scene
  const scene = new THREE.Scene();

  // Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.5;

  // light
  const light = new THREE.AmbientLight(0xffffff, 5);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(directionalLight, light);

  // Camera
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 10, 200000);
  camera.position.set(initValue.cameraPosition.x, initValue.cameraPosition.y, initValue.cameraPosition.z);
  camera.layers.enableAll();

  // Control
  const controls = new MapControls(camera, renderer.domElement);
  controls.target.set(initValue.controlsTarget.x, initValue.controlsTarget.y, initValue.controlsTarget.z);
  controls.maxPolarAngle = Math.PI * 0.45;
  controls.minPolarAngle = Math.PI * 0.25;
  controls.minDistance = initValue.cameraPosition.y - 10000;
  controls.maxDistance = initValue.cameraPosition.y + 10000;
  controls.update();

  // listener
  window.addEventListener("resize", () => onWindowResize());

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  return { scene, renderer, camera, controls };
}
