import { motion, useAnimate, AnimatePresence } from "framer-motion";
import FightScreen from "./FightScreen";
import { useState } from "react";
// @ts-expect-error the lib is not typed
import useSound from "use-sound";
import { type Hero, heroes } from "./heroes";

function BackBtn({ handleClick }: { handleClick: () => void }) {
  return (
    <button
      onClick={handleClick}
      className="mt-3 ml-3 text-lg select-none text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-10 h-10"
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
  const initialLeft: Hero = heroes.penumbra;

  const initialRight: Hero = heroes.bowser;

  const [playLeft] = useSound(initialLeft.attackSound);
  const [playRight] = useSound(initialRight.attackSound);
  const [scopeLeft, animateLeft] = useAnimate();
  const [scopeRight, animateRight] = useAnimate();

  // todo: change leftStats to heartsLeft and rightStats to heartsRight.
  const [leftStats, setLeftStats] = useState<Hero>(initialLeft);
  const [rightStats, setRightStats] = useState<Hero>(initialRight);

  function reset() {
    setLeftStats(initialLeft);
    setRightStats(initialRight);
  }

  function animateLeftAttack() {
    playLeft();
    animateLeft(
      scopeLeft.current,
      {
        x: [100, 0],
      },
      { duration: 0.5 }
    );
  }

  function animateRightAttack() {
    playRight();
    animateRight(
      scopeRight.current,
      {
        x: [-100, 0],
      },
      { duration: 0.5 }
    );
  }

  function leftAttack() {
    animateLeftAttack();

    setRightStats((prev) => ({
      ...prev,
      hearts: prev.hearts.slice(leftStats.damage),
    }));
  }

  function rightAttack() {
    animateRightAttack();

    setLeftStats((prev) => ({
      ...prev,
      hearts: prev.hearts.slice(rightStats.damage),
    }));
  }

  return (
    <div className="flex flex-col">
      <BackBtn handleClick={() => {}} />
      <FightScreen
        {...{ initialLeft, initialRight, reset, leftAttack, rightAttack, scopeLeft, scopeRight, leftStats, rightStats }}
      />
    </div>
  );
}

export default App;
