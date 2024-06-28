export const clacWeatherParam = (time: string, weather: string) => {
  let rayleigh = 0.2;
  let mieDirectionalG = 0.2;
  let sunColor = "#fff";
  // weather
  if (weather === "sunny") {
    mieDirectionalG = 0.6;
  }
  if (weather === "cloudy") {
    sunColor = "#000";
    rayleigh = 2;
  }
  if (weather === "rainy") {
    sunColor = "#000";
    rayleigh = 2;
  }

  // time
  if (time === "sunset") {
    sunColor = "#e56a45";
    rayleigh = 2;
  }

  return {
    waterColor: "rgb(9, 55, 135)",
    rayleigh: rayleigh,
    mieDirectionalG: mieDirectionalG,
    sunColor: sunColor,
  };
};
