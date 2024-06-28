import * as THREE from "three";

export function createSun(time: string, weather: string) {
  const sun = new THREE.Vector3();

  // Equator
  const theta = THREE.MathUtils.degToRad(180);

  // sun position
  // if ( 92 > phi > -92 ) day
  // else night
  const devDegree = (() => {
    if (weather === "rainy" || weather === "cloudy") {
      if (time === "night") {
        return 180;
      }
      return 20;
    }
    switch (time) {
      case "day":
        return 80;
      case "sunset":
        return -89;
      case "night":
        return 180;
    }
    return 89;
  })();
  const phi = THREE.MathUtils.degToRad(devDegree!); // 極點座標，根據時間改變

  sun.setFromSphericalCoords(1, phi, theta);

  return { sun };
}
