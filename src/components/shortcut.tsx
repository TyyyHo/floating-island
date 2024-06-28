import { ReactNode } from "react";

export default function Shortcut(): ReactNode {
  return (
    <section id="shortcut">
      <button id="house">
        <img src="/icon/house.webp" alt="house" />
      </button>
      <button id="basement">
        <img src="/icon/basement.webp" alt="basement" />
      </button>
    </section>
  );
}
