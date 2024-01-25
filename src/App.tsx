import { useAnimate } from "framer-motion";
import FightScreen from "./FightScreen";
import { useState } from "react";
// @ts-expect-error the lib is not typed
import useSound from "use-sound";
import { type Hero, heroes } from "./heroes";
import SelectScreen from "./SelectScreen";
import { useSoundFx } from "./useSoundFx";

function BackBtn({ handleClick }: { handleClick: () => void }) {
  return (
    <button
      onClick={handleClick}
      className="mt-3 ml-3 -mb-12 text-lg select-none text-gray-600 z-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-20 h-20"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

function App() {
  const { playFight } = useSoundFx();
  const heroesList: Hero[] = Object.keys(heroes).map((key) => heroes[key]);
  const [screen, setScreen] = useState<"fight" | "select">("select");

  function goSelect() {
    setScreen("select");
  }

  function goFight() {
    playFight();
    setScreen("fight");
  }

  const [scopeLeft, animateLeft] = useAnimate();
  const [scopeRight, animateRight] = useAnimate();

  type IndexedHero = Hero & { index: number };

  const getIdxHero = (index: number): IndexedHero => ({
    ...heroesList[index],
    index,
  });

  const [leftHero, setIdxLeftHero] = useState<IndexedHero>(getIdxHero(0));
  const [rightHero, setIdxRightHero] = useState<IndexedHero>(getIdxHero(0));

  const [playLeft] = useSound(leftHero.attackSound);
  const [playRight] = useSound(rightHero.attackSound);

  function setLeftHero(idx: number) {
    setIdxLeftHero(getIdxHero(idx));
  }

  function setRightHero(idx: number) {
    setIdxRightHero(getIdxHero(idx));
  }

  // todo: reset each hero independently
  function reset() {
    setLeftHero(leftHero.index);
    setRightHero(rightHero.index);
  }

  function animateLeftAttack() {
    playLeft();
    animateLeft(scopeLeft.current, { x: [100, 0] }, { duration: 0.5 });
  }

  function animateRightAttack() {
    playRight();
    animateRight(scopeRight.current, { x: [-100, 0] }, { duration: 0.5 });
  }

  function leftAttack() {
    animateLeftAttack();

    setIdxRightHero((prev) => ({
      ...prev,
      hearts: prev.hearts.slice(leftHero.damage),
    }));
  }

  function rightAttack() {
    animateRightAttack();

    setIdxLeftHero((prev) => ({
      ...prev,
      hearts: prev.hearts.slice(rightHero.damage),
    }));
  }

  function nextLeftHero() {
    const index = leftHero.index;
    const nextIndex = (index + 1) % heroesList.length;
    setLeftHero(nextIndex);

    
  }

  function previousLeftHero() {
    const index = leftHero.index;
    const prevIndex = (index - 1 + heroesList.length) % heroesList.length;
    setLeftHero(prevIndex);
  }

  function nextRightHero() {
    const index = rightHero.index;
    const nextIndex = (index + 1) % heroesList.length;
    setRightHero(nextIndex);
  }

  function previousRightHero() {
    const index = rightHero.index;
    const prevIndex = (index - 1 + heroesList.length) % heroesList.length;
    setRightHero(prevIndex);
  }

  return (
    <div className="flex flex-col h-full">
      {screen === "select" && (
        <SelectScreen
          previousLeftHero={previousLeftHero}
          nextLeftHero={nextLeftHero}
          previousRightHero={previousRightHero}
          nextRightHero={nextRightHero}
          handleClick={goFight}
          leftHero={leftHero}
          rightHero={rightHero}
        />
      )}

      {screen === "fight" && (
        <>
          <BackBtn handleClick={goSelect} />
          <FightScreen
            {...{
              reset,
              leftAttack,
              rightAttack,
              scopeLeft,
              scopeRight,
              leftHero,
              rightHero,
            }}
          />
        </>
      )}
    </div>
  );
}

export default App;
