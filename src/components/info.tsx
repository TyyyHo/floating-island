import { useState } from "react";
import { ReactNode } from "react";

const url = "https://sketchfab.com/3d-models/andrews-floating-island-final-v10-f9b9cbc58ee64a97b9f5d0f82b402a31";

export default function Info(): ReactNode {
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <>
      <section id="info" className={`${isShow ? "show" : "hide"}`} onClick={() => setIsShow(!isShow)}>
        <div>
          <div>Material resource:</div>
          <a href={url} target="_blank" onClick={(e) => e.stopPropagation()}>
            Model
          </a>
          <span> is designed by vilmariina and remixed by djvivid.</span>
        </div>
      </section>
      <button id="infoButton" onClick={() => setIsShow(!isShow)}>
        <img src="/floating-island/icon/info.webp" alt="info" />
      </button>
    </>
  );
}
