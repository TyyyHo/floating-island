import * as THREE from "three";
import { iSite } from "../types";
import { g, m } from "./createPoint";

const sites: iSite[] = [];

const dataArray = [
  {
    name: "house",
    position: { x: -500, y: 8500, z: 2500 },
    cameraMoveDistance: { x: -8000, y: -5000, z: -3000 },
  },
  {
    name: "basement",
    position: { x: -3300, y: 2200, z: 2200 },
    cameraMoveDistance: { x: -15000, y: 2000, z: 3000 },
  },
];

dataArray.forEach((element, index) => {
  const mesh = new THREE.Mesh(g, m);
  mesh.userData = { cameraMoveDistance: element.cameraMoveDistance };

  const dataObject = {
    id: index,
    ...element,
    mesh: mesh,
  };

  sites.push(dataObject);
});

export { sites };
