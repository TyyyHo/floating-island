import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

// ts types
import { iCreator, iSite } from "../types";

//
import { initValue } from "../params";

// data list
import { sites } from "./siteList";

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(500, 500);
const globalObjects: THREE.Mesh[] = [];

function findTarget(event: any, creator: iCreator) {
  pointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(pointer, creator.camera);
  const intersects = raycaster.intersectObjects(globalObjects, false);

  if (intersects.length > 0) {
    const target = intersects[0].object as THREE.Mesh;
    toSite(target, creator);
  }
}

function toSite(target: THREE.Mesh, creator: iCreator) {
  const cameraMoveDistance = target.userData.cameraMoveDistance;
  const boxMaxY = new THREE.Box3().setFromObject(target).max.y;
  const distance = boxMaxY;

  // 最終距離目標的鏡頭位置
  const position = {
    x: target.position.x + distance + cameraMoveDistance.x,
    y: target.position.y + distance + cameraMoveDistance.y,
    z: target.position.z + distance + cameraMoveDistance.z,
  };

  // 暫時關閉鏡頭位移功能
  creator.controls.enabled = false;
  // 位移動畫
  const moveToInitial = new TWEEN.Tween(creator.camera.position)
    .to(initValue.cameraPosition, 1500)
    .onUpdate(() => {
      creator.camera.lookAt(target.position);
    })
    .onComplete(() => {
      moveToTarget.start();
    });

  const moveToTarget = new TWEEN.Tween(creator.camera.position)
    .to(position, 1500)
    .onUpdate(() => {
      creator.camera.lookAt(target.position);
    })
    .onComplete(() => {
      creator.controls.target.set(target.position.x, target.position.y, target.position.z);
      creator.controls.enabled = true;
    });

  moveToInitial.start();
}

export const createSites = () => {
  sites.forEach((element: iSite) => {
    element.mesh.scale.set(130, 130, 130);
    element.mesh.position.set(element.position.x, element.position.y, element.position.z);
    globalObjects.push(element.mesh);
  });

  return { sites, globalObjects, findTarget, toSite };
};
