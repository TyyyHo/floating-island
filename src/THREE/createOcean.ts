import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";

// types
import { iEnviromentParams, iInitValue } from "../types";

// material
import waterMaterial from "/material/waternormals.webp";

export function createOcean(initValue: iInitValue, enviromentParams: iEnviromentParams) {
  const waterGeometry = new THREE.CircleGeometry(initValue.water, 60);
  const ocean = new Water(waterGeometry, {
    textureWidth: 1080,
    textureHeight: 1080,
    waterNormals: new THREE.TextureLoader().load(waterMaterial, function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }),
    sunDirection: new THREE.Vector3(),
    sunColor: enviromentParams.sunColor,
    waterColor: enviromentParams.waterColor,
    distortionScale: 3.7,
  });

  ocean.rotation.x = -Math.PI / 2;

  return { ocean };
}
