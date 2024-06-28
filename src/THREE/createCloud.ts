import * as THREE from "three";
import { iInitValue } from "../types";

export function createCloud(initValue: iInitValue) {
  let cloudCount = 3;
  const clouds = [];

  const cloudImage = new THREE.TextureLoader().load("/material/clouds.webp");
  const cloudGeometry = new THREE.PlaneGeometry(20000, 20000);
  const cloudMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: cloudImage,
    transparent: true,
    depthTest: false,
  });
  //   cloudMaterial?.map.minFilter = THREE.LinearFilter;

  while (cloudCount--) {
    let cloudGroup = Math.floor(Math.random() * 3) + 3;
    const area = Math.random() * 5000 + 5000;
    const placePosition = 150000;
    // const placePosition = initValue.sky - 2 * Math.random() * initValue.sky;
    const cloudMeshes = [];

    while (cloudGroup--) {
      const cloudpiece = new THREE.Mesh(cloudGeometry, cloudMaterial);
      const random = area - Math.random() * 2 * area;
      const randomZ = Math.random() * 1000 - 300;
      cloudpiece.position.set(random + placePosition, 50000, randomZ + placePosition);
      cloudpiece.rotation.x = 2.6;
      cloudpiece.rotation.z = Math.random() * 360;
      cloudMeshes.push(cloudpiece);
    }

    clouds.push(cloudMeshes);
  }

  return { clouds };
}
