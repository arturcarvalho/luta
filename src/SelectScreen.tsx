import IconHeart from "./IconHeart";
import IconFight from "./IconFight";
import IconAge from "./IconAge";
import IconBrain from "./IconBrain";
import type { Hero, Power } from "./heroes";
import { useSoundFx } from "./useSoundFx";

type PropsStat = { children: React.ReactNode };
function Stat(p: PropsStat) {
  return <div className="flex items-center gap-x-2">{p.children}</div>;
}

function PowerStat(props: { power: Power; play: () => void }) {
  let cls: string = "text-gray-500";
  switch (props.power) {
    case 1:
      cls = "bg-orange-200 text-orange-500";
      break;
    case 2:
      cls = "bg-orange-300 text-white";
      break;
    case 3:
      cls = "bg-orange-400  text-white";
      break;
    case 4:
      cls = "bg-orange-500 text-white";
      break;
    case 5:
      cls = "bg-orange-600 text-white";
      break;
    case 6:
      cls = "bg-orange-700 text-white";
      break;
    case 7:
      cls = "bg-orange-900 text-white";
      break;
  }

  return (
    <div className={`-mx-2 flex items-center ${cls}`}>
      <div className="ml-2" onClick={props.play}>
        <IconBrain />
      </div>
      <div className="ml-2 font-bold text-xl">{props.power}</div>
    </div>
  );
}

type PropsImgSelector = {
  hero: Hero;
  flip?: boolean;
  next: () => void;
  previous: () => void;
};
function HeroSelector(props: PropsImgSelector) {
  const { playHearts, playAttack, playIntelligence, playYears } = useSoundFx();

  return (
    <div className="flex flex-col items-center my-4 h-full">
      <div className="flex  flex-col items-center border-2 px-2 py-4 h-full rounded-2xl w-[240px] bg-gray-50 ">
        {/* left and right arrows  */}
        <div className="flex items-end mt-2 ">
          <button
            title="previous"
            className="-mr-8 shadow z-10 text-gray-500 bg-white rounded-full"
            onClick={props.previous}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-14 h-14"
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
            className="rounded-full bg-red-500 h-40 w-40 border-4 border-white "
            src={props.hero.img}
            alt={props.hero.name}
          />
          <button
            title="next"
            className="-ml-8 shadow z-10 text-gray-500 bg-white rounded-full"
            onClick={props.next}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col text-center gap-y-2 w-full">
          <div className="bg-red-500 text-white font-bold uppercase mt-6 text-xl -mx-2">
            {props.hero.name}
          </div>
          <Stat>
            <div className="text-red-500" onClick={playHearts}>
              <IconHeart />
            </div>
            <div className="text-red-500 font-bold text-xl">
              {props.hero.hearts.length}
            </div>
          </Stat>

          <Stat>
            <div className="text-blue-500" onClick={playAttack}>
              <IconFight cls="w-6 h-6" />
            </div>
            <div className="text-blue-500 font-bold text-xl">
              {props.hero.damage}
            </div>
          </Stat>

          <Stat>
            <div className="text-stone-500" onClick={playYears}>
              <IconAge />
            </div>
            <div className="text-stone-500 font-bold text-xl">
              {props.hero.age}
            </div>
          </Stat>

          <PowerStat play={playIntelligence} power={props.hero.intelligence} />
        </div>
      </div>
    </div>
  );
}

function FightBtn(props: { handleClick: () => void }) {
  return (
    <button
      className="rounded-full p-1 bg-red-500 text-white h-fit"
      onClick={props.handleClick}
    >
      <IconFight />
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
    <div className="m-auto flex-1 flex ">
      <div className="flex-1">
        <div className="flex gap-x-6 justify-center items-center">
          <HeroSelector
            hero={props.leftHero}
            previous={props.previousLeftHero}
            next={props.nextLeftHero}
          />
          <FightBtn handleClick={props.handleClick} />
          <HeroSelector
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
