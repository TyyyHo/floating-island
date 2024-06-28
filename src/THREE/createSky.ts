import { Sky } from "three/examples/jsm/objects/Sky.js";

// types
import { iInitValue, iEnviromentParams } from "../types";

export function createSky(initValue: iInitValue, enviromentParams: iEnviromentParams) {
  const sky = new Sky();
  sky.scale.setScalar(initValue.sky);

  const skyUniforms = sky.material.uniforms;
  skyUniforms["turbidity"].value = 3; // 濁度
  skyUniforms["rayleigh"].value = enviromentParams.rayleigh; // 散射（影響天藍的程度）
  skyUniforms["mieCoefficient"].value = 0.005; //
  skyUniforms["mieDirectionalG"].value = enviromentParams.mieDirectionalG; // 太陽光暈

  return { sky };
}
