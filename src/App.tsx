import { useState } from "react";
import "./App.css";

// components
import Canvas from "./components/canvas";
import Shortcut from "./components/shortcut";
import Selects from "./components/selects";
import Info from "./components/info";

function App() {
  const [time, setTime] = useState<string>("day");
  const [weather, setWeather] = useState<string>("sunny");

  return (
    <>
      <Selects setTime={setTime} setWeather={setWeather} />
      <Shortcut />
      <Canvas time={time} weather={weather} />
      <Info />
    </>
  );
}

export default App;
