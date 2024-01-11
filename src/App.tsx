import {
  type AnimationScope,
  motion,
  useAnimate,
  AnimatePresence,
} from "framer-motion";
import { useState, ReactNode } from "react";
// @ts-expect-error the lib is not typed
import useSound from "use-sound";
import { type Hero, heroes } from "./heroes";

type PropsMove = {
  children: ReactNode;
  offset: number;
  scope: AnimationScope;
};

function Move({ children, scope }: PropsMove) {
  return (
    <div className="flex">
      <motion.div ref={scope}>{children}</motion.div>
    </div>
  );
}

function HeartGrid({ hearts }: { hearts: number[] }) {
  return (
    <div className="flex flex-wrap gap-1 mt-2 w-72 justify-center">
      <AnimatePresence>
        {hearts.map((id) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 3, transition: { duration: 0.5 } }}
              key={id}
              className="text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

type PropsCard = {
  title: string;
  img: string;
  imgWidth?: number;
  offsetLeft?: number;
  offsetRight?: number;
  animateOffset: number;
  damage: number;
  heartsCnt: number;
  scope: AnimationScope;

  attack: () => void;
};

function Card(props: PropsCard) {
  const stl: React.CSSProperties = {};

  if (props.offsetLeft) stl.left = props.offsetLeft;
  if (props.offsetRight) stl.right = props.offsetRight;
  if (props.imgWidth) stl.width = props.imgWidth;

  function attack() {
    if (props.heartsCnt <= 0) return;
    props.attack();
  }

  return (
    <div
      onClick={attack}
      className="bg-neutral-100 flex flex-col  w-[300px] h-[300px] px-4 shadow-lg rounded-2xl border-[3px] border-red-600 relative mb-6"
    >
      {/* big cross */}
      {!props.heartsCnt && (
        <div className="absolute text-[300px] z-30 left-0 bottom-0 -top-20 opacity-80 right-0 text-center text-gray-700 font-bold">
          X
        </div>
      )}

      {/* hearts marker */}
      <div className="text-white bg-red-500 text-xl -bottom-6 -right-6 rounded-full h-12 w-12 flex items-center justify-center font-bold absolute">
        {props.heartsCnt}
      </div>
      {/* dmg */}
      <div className="text-white bg-blue-500 text-xl -bottom-6 -left-6 rounded-full h-12 w-12 flex items-center justify-center font-bold absolute">
        {props.damage}
      </div>

      <h2 className="text-2xl text-red-600 uppercase font-semibold py-4 text-center -mx-4">
        {props.title}
      </h2>

      <Move scope={props.scope} offset={props.animateOffset}>
        <div style={stl} className="relative z-10">
          <img
            src={props.img}
            alt={props.title}
            className="border-solid drop-shadow"
          />
        </div>
      </Move>
    </div>
  );
}

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

function ReloadBtn({ handleClick }: { handleClick: () => void }) {
  return (
    <button
      onClick={handleClick}
      className="text-lg select-none h-fit p-4 font-bold uppercase rounded-full shadow-md text-white bg-green-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
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
      {/* main container */}
      <div className="text-white flex justify-center">
        <div className="flex flex-row">
          <div className="flex flex-col items-center select-none">
            <Card
              scope={scopeLeft}
              attack={leftAttack}
              title={initialLeft.name}
              img={initialLeft.img}
              offsetRight={initialLeft.onLeft.offset}
              animateOffset={initialLeft.onLeft.animateOffset}
              imgWidth={initialLeft.imgWidth}
              damage={leftStats.damage}
              heartsCnt={leftStats.hearts.length}
            />
            <HeartGrid hearts={leftStats.hearts} />
          </div>

          <div className="mt-16 px-6">
            <ReloadBtn handleClick={reset} />
          </div>

          <div className="flex flex-col items-center select-none">
            <Card
              scope={scopeRight}
              attack={rightAttack}
              title={initialRight.name}
              img={initialRight.img}
              offsetLeft={initialRight.onRight.offset}
              animateOffset={initialRight.onRight.animateOffset}
              imgWidth={initialRight.imgWidth}
              damage={rightStats.damage}
              heartsCnt={rightStats.hearts.length}
            />
            <HeartGrid hearts={rightStats.hearts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
