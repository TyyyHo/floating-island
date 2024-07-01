import { useEffect } from "react";
import * as TWEEN from "@tweenjs/tween.js";

// create three elements
import { createBasis } from "../THREE/createBasis";
import { createSky } from "../THREE/createSky";
import { createOcean } from "../THREE/createOcean";
import { createSun } from "../THREE/createSun";
import { createWeather } from "../THREE/createWeather";
import { createSites } from "../THREE/createSites";
import { createIsland } from "../THREE/createIsland";

// types
import { iCreator, iSite } from "../types";

// params
import { initValue } from "../params";
import { clacWeatherParam } from "../utils/weatherParam";

// basic elements
const creator: iCreator = createBasis(initValue);
const { sites, globalObjects, findTarget, toSite } = createSites();

export default function Canvas({ time, weather }: { time: string; weather: string }) {
  let animationID = 0;
  const enviromentParams = clacWeatherParam(time, weather);
  const { ocean } = createOcean(initValue, enviromentParams);
  const { sky } = createSky(initValue, enviromentParams);
  const { sun } = createSun(time, weather);
  const { rain_1, rain_2 } = createWeather(initValue);

  function updateElement() {
    // updating three elements when enviromentParams are changed
    // sky, sun, ocean
    creator.scene.add(sky);
    creator.scene.add(ocean);
    sky.material.uniforms["sunPosition"].value.copy(sun);
    ocean.material.uniforms["sunDirection"].value.copy(sun).normalize();

    // rain
    if (weather === "rainy") {
      creator.scene.add(rain_1);
      creator.scene.add(rain_2);
    }
  }

  function animate() {
    animationID = requestAnimationFrame(animate);
    TWEEN.update();

    // limit camera move area
    if (Math.abs(creator.camera.position.x) > initValue.water / 2 || Math.abs(creator.camera.position.z) > initValue.water / 2) {
      toSite(globalObjects[0], creator);
    }

    // wave
    ocean.material.uniforms["time"].value += 1.0 / 30.0;

    // rain drop
    rain_1.position.y -= 250;
    if (rain_1.position.y < -10000) {
      rain_1.position.y = 35000;
    }
    rain_2.position.y -= 250;
    if (rain_2.position.y < -10000) {
      rain_2.position.y = 35000;
    }

    // sites spin
    sites.forEach((element) => {
      element.mesh.rotation.y += 0.025;
    });

    // active renderer
    creator.renderer.render(creator.scene, creator.camera);
  }

  useEffect(() => {
    // append canvas into container and add event listener
    document.getElementById("canvasContainer")!.appendChild(creator.renderer.domElement);
    document.addEventListener("pointerdown", (e) => findTarget(e, creator));
    document.getElementById("house")?.addEventListener("click", () => toSite(globalObjects[0], creator));
    document.getElementById("basement")?.addEventListener("click", () => toSite(globalObjects[1], creator));
    // island
    createIsland(creator);
    // sites
    sites.forEach((element: iSite) => creator.scene.add(element.mesh));

    return () => {
      // remove canvas and event listener when leaving this page
      document.getElementById("canvasContainer")!.removeChild(creator.renderer.domElement);
      document.removeEventListener("pointerdown", (e) => findTarget(e, creator));
      document.getElementById("house")?.removeEventListener("click", () => toSite(globalObjects[0], creator));
      document.getElementById("basement")?.removeEventListener("click", () => toSite(globalObjects[1], creator));
    };
  }, []);

  useEffect(() => {
    updateElement();
    animate();

    return () => {
      // clean three object
      creator.scene.remove(sky);
      creator.scene.remove(ocean);
      creator.scene.remove(rain_1);
      creator.scene.remove(rain_2);
      cancelAnimationFrame(animationID);
    };
  }, [enviromentParams]);

  return <div id="canvasContainer"></div>;
}
