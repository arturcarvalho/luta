import { type Hero } from "./heroes";

type PropsImgSelector = {
  hero: Hero;
  next: () => void;
  previous: () => void;
};
function ImgSelector(props: PropsImgSelector) {
  return (
    <div className="flex items-center">
      <button className="mr-1" onClick={props.previous}>prev</button>
      <img
        className="rounded-full bg-orange-400 h-40 w-40 border-2 border-white drop-shadow"
        src={props.hero.img}
        alt={props.hero.name}
      />
      <button className="ml-1" onClick={props.next}>next</button>
    </div>
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
      <div className="w-[600px] m-2 flex gap-x-8 justify-center items-start">
        <ImgSelector
          hero={props.leftHero}
          previous={props.previousLeftHero}
          next={props.nextLeftHero}
        />
        <button
          className="p-2 bg-red-500 text-white h-fit"
          onClick={props.handleClick}
        >
          Luta!
        </button>
        <ImgSelector
          hero={props.rightHero}
          previous={props.previousRightHero}
          next={props.nextRightHero}
        />
      </div>
    </div>
  );
}
