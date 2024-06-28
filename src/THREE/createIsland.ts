import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { iCreator } from "../types";

export function createIsland(creator: iCreator) {
  const loader = new GLTFLoader();
  const scale = 500;

  loader.load(
    "/model/island.glb",
    function (gltf) {
      const model = gltf.scene;

      // scale
      model.scale.set(scale, scale, scale);
      // position
      model.position.setY(6500);
      creator.scene.add(model);
    },
    (xhr) => {
      if (xhr.loaded / xhr.total === 1) {
        console.log("island", "load success");
      }
    },
    (error) => {
      console.log(error);
    }
  );
}
