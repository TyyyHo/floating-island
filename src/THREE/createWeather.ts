import * as THREE from "three";

// types
import { iInitValue } from "../types";

export function createWeather(initValue: iInitValue) {
  const rainCount = 30000; // 雨量多寡

  const rainGeo = new THREE.BufferGeometry();
  const rainGeo2 = new THREE.BufferGeometry();
  const geoPosition = [];
  const geoPosition2 = [];
  const size = [];
  for (let i = 0; i < rainCount; i++) {
    const rainDropPosition = () => {
      return initValue.water * 0.8 - Math.random() * initValue.water * 1.6;
    };
    const rainDropHeight = () => {
      return 15000 - Math.random() * 40000;
    };
    geoPosition.push(rainDropPosition());
    geoPosition.push(rainDropHeight());
    geoPosition.push(rainDropPosition());

    geoPosition2.push(rainDropPosition());
    geoPosition2.push(rainDropHeight());
    geoPosition2.push(rainDropPosition());
    size.push(20);
  }
  const vertices = new Float32Array(geoPosition);
  const vertices2 = new Float32Array(geoPosition2);
  const sizeArray = new Float32Array(size);
  rainGeo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  rainGeo2.setAttribute("position", new THREE.BufferAttribute(vertices2, 3));
  rainGeo.setAttribute("size", new THREE.BufferAttribute(sizeArray, 1));
  rainGeo2.setAttribute("size", new THREE.BufferAttribute(sizeArray, 1));

  // set material for rain
  const raindrop = new THREE.TextureLoader().load("/material/raindrop.svg");
  const rainMaterial = new THREE.PointsMaterial({
    color: "#4EC3E0",
    size: 350,
    transparent: true,
    opacity: 0.5,
    map: raindrop,
    depthTest: false,
  });

  // create rain and add to scene
  const rain_1 = new THREE.Points(rainGeo, rainMaterial);
  const rain_2 = new THREE.Points(rainGeo2, rainMaterial);

  rain_1.layers.set(1);
  rain_2.layers.set(1);

  rain_1.position.y = 10000;
  rain_2.position.y = 35000;

  return { rain_1, rain_2 };
}
