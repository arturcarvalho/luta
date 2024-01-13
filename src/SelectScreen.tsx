import { type Hero } from "./heroes";

type PropsImgSelector = {
  hero: Hero;
  flip?: boolean;
  next: () => void;
  previous: () => void;
};
function ImgSelector(props: PropsImgSelector) {
  return (
    <div className="flex items-center">
      <button className=" text-stone-500" onClick={props.previous}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      <img
        style={{ transform: props.flip ? "scaleX(-1)" : "scaleX(1)" }}
        className="rounded-full bg-orange-400 h-40 w-40 border-2 border-white drop-shadow"
        src={props.hero.img}
        alt={props.hero.name}
      />
      <button className=" text-stone-500" onClick={props.next}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
}

function FightBtn(props: { handleClick: () => void }) {
  return (
    <button
      className="rounded-full p-1 bg-red-500 text-white h-fit"
      onClick={props.handleClick}
    >
      <svg
        className="w-12 h-12"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <g transform="translate(0,0)">
          <path d="M91.773 25.994C189.313 167.854 104.52 157.17 65.64 169.2c38.8 52.918 16.554 102.644-44.503 133.788 52.5 21.085 122.25 30.452 42.027 141.707 79.578-45.024 134.707-48.82 127.13 53.15 57.795-58.495 133.043-87.973 208.054-38.53-8.558-73.916 12.66-106.284 86.88-74.4-79.58-73.01-46.696-116.363.458-158.83-81.492-3.232-92.92-65.497-89.922-139.92-49.183 53.518-86.497 47.756-104.002-56.962-33.806 76.857-79.335 125.91-199.99-3.21zM202.15 135.336c16.1.356 25.565 12.198 34.666 24.678L177.312 263.08c-20.422 1.985-35.31-4.577-41.787-24.123l59.51-103.074c1.93-.326 3.772-.503 5.537-.545.534-.013 1.06-.014 1.578-.002zm69.037 11.197c16.1.352 25.567 12.2 34.668 24.676L238.947 290.24c-20.423 1.985-35.31-4.586-41.785-24.127l66.91-119.03c1.93-.327 3.772-.507 5.537-.55.533-.013 1.058-.013 1.577-.002zm58.704 32.05c16.102.357 25.567 12.198 34.67 24.673l-65.945 117.547c-20.423 1.98-35.31-4.58-41.783-24.123l65.94-117.55c1.93-.325 3.773-.502 5.54-.544.532-.013 1.06-.013 1.58-.002zm46.342 55.233c16.773.098 26.746 11.977 36.354 24.485l-55.557 96.227c-20.026 1.297-34.856-5.367-41.786-24.125l55.56-96.224c1.887-.255 3.693-.372 5.428-.362zM127.55 271.713l105.83 47.52c3.015 21.69-2.782 38.788-21.958 48.91L105.588 320.62c-4.508-21.618 8.273-35.485 21.96-48.907z"></path>
        </g>
      </svg>
    </button>
  );
}
type Props = {
  handleClick: () => void;
  nextLeftHero: () => void;
  previousLeftHero: () => void;
  nextRightHero: () => void;
  previousRightHero: () => void;
  leftHero: Hero;
  rightHero: Hero;
};
export default function SelectScreen(props: Props) {
  return (
    <div className="bg-stone-200 m-auto h-full flex">
      <div className="mt-10">
        <div className="w-[600px] m-2 flex gap-x-6 justify-center items-center">
          <ImgSelector
            hero={props.leftHero}
            previous={props.previousLeftHero}
            next={props.nextLeftHero}
          />
          <FightBtn handleClick={props.handleClick} />
          <ImgSelector
            flip
            hero={props.rightHero}
            previous={props.previousRightHero}
            next={props.nextRightHero}
          />
        </div>
      </div>
    </div>
  );
}
