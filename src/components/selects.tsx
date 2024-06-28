import { ReactNode, Dispatch, SetStateAction } from "react";
import Select from "./select";

type props = {
  setTime: Dispatch<SetStateAction<string>>;
  setWeather: Dispatch<SetStateAction<string>>;
};

export default function Selects({ setTime, setWeather }: props): ReactNode {
  return (
    <section id="selects">
      <Select id={"Time"} options={["day", "sunset", "night"]} handleParmas={setTime} />
      <Select id={"Weather"} options={["sunny", "cloudy", "rainy"]} handleParmas={setWeather} />
    </section>
  );
}
