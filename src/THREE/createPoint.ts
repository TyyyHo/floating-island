import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

let gPartTop = makePart([
  [0, 1, 1],
  [0, -1, 0],
  [2, 0, 0],
  [0, 4, 0],
  [-2, 0, 0],
]);

let gPartBottom = makePart([
  [0, -1.125, 0.5],
  [0, -3, 0],
  [2, 0, 0],
  [0, -1, 0],
  [-2, 0, 0],
]);
gPartBottom.translate(0, -0.5, 0);

let gFront = BufferGeometryUtils.mergeGeometries([gPartTop, gPartBottom]);
let gBack = gFront.clone();
gBack.rotateY(Math.PI);
let g = BufferGeometryUtils.mergeGeometries([gFront, gBack]);
g = g.toNonIndexed();
g.computeVertexNormals();

const m = new THREE.MeshLambertMaterial({ color: 0x5eff5e });

export { g, m };

function makePart(pts: Array<number[]>) {
  let g = new THREE.BufferGeometry().setFromPoints(
    pts.map((p: number[]) => {
      return new THREE.Vector3(p[0], p[1], p[2]);
    })
  );
  let index = [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 1];
  g.setIndex(index);
  g.computeVertexNormals();
  return g;
}
