import { motion } from "framer-motion";
import { useState, ReactNode } from "react";
import bowser from "./assets/bowser.png";
import mario from "./assets/mario.png";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

type MoveProps = {
  children: ReactNode;
  state: "idle" | "attacking";
  reset: () => void;
  offset: number;
};

export function Move({ children, state, offset, reset }: MoveProps) {
  const variants = {
    idle: { x: 0 },
    attacking: {
      zIndex: 100,
      x: [0, offset, 0],
      duration: [0.1, 0.1, 2],
      transition: [0.5, 0.5, 0.1],
    },
  };

  return (
    <div className="flex">
      <motion.div
        animate={state}
        transition={spring}
        // layout
        variants={variants}
        onAnimationComplete={reset}
      >
        {children}
      </motion.div>
    </div>
  );
}

function AttackBtn({ attack }: { attack: () => void }) {
  return (
    <button
      onClick={attack}
      className="bg-red-600 rounded-full text-white h-fit p-2 font-bold shadow border border-gray-200 hover:bg-gray-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        className="w-20 h-20"
      >
        <g>
          <path d="M91.773 25.994C189.313 167.854 104.52 157.17 65.64 169.2c38.8 52.918 16.554 102.644-44.503 133.788 52.5 21.085 122.25 30.452 42.027 141.707 79.578-45.024 134.707-48.82 127.13 53.15 57.795-58.495 133.043-87.973 208.054-38.53-8.558-73.916 12.66-106.284 86.88-74.4-79.58-73.01-46.696-116.363.458-158.83-81.492-3.232-92.92-65.497-89.922-139.92-49.183 53.518-86.497 47.756-104.002-56.962-33.806 76.857-79.335 125.91-199.99-3.21zM202.15 135.336c16.1.356 25.565 12.198 34.666 24.678L177.312 263.08c-20.422 1.985-35.31-4.577-41.787-24.123l59.51-103.074c1.93-.326 3.772-.503 5.537-.545.534-.013 1.06-.014 1.578-.002zm69.037 11.197c16.1.352 25.567 12.2 34.668 24.676L238.947 290.24c-20.423 1.985-35.31-4.586-41.785-24.127l66.91-119.03c1.93-.327 3.772-.507 5.537-.55.533-.013 1.058-.013 1.577-.002zm58.704 32.05c16.102.357 25.567 12.198 34.67 24.673l-65.945 117.547c-20.423 1.98-35.31-4.58-41.783-24.123l65.94-117.55c1.93-.325 3.773-.502 5.54-.544.532-.013 1.06-.013 1.58-.002zm46.342 55.233c16.773.098 26.746 11.977 36.354 24.485l-55.557 96.227c-20.026 1.297-34.856-5.367-41.786-24.125l55.56-96.224c1.887-.255 3.693-.372 5.428-.362zM127.55 271.713l105.83 47.52c3.015 21.69-2.782 38.788-21.958 48.91L105.588 320.62c-4.508-21.618 8.273-35.485 21.96-48.907z"></path>
        </g>
      </svg>
    </button>
  );
}

type CardProps = {
  title: string;
  img: string;
  imgWidth?: number;
  offsetLeft?: number;
  offsetRight?: number;
  animateOffset: number;
  damage: number;
};

// function HeartGrid({ hearts }: { hearts: number }) {
//   return (
//     <div className="grid grid-cols-5 gap-1">
//       {Array.from({ length: hearts }).map((_, i) => (
//         <div
//           key={i}
//           className="w-8 h-8 rounded-full bg-red-600 border-4 border-red-600"
//         ></div>
//       ))}
//       {Array.from({ length: 20 - hearts }).map((_, i) => (
//         <div
//           key={i}
//           className="w-8 h-8 rounded-full bg-gray-600 border-4 border-red-600"
//         ></div>
//       ))}
//     </div>
//   );
// }

function Card(props: CardProps) {
  const [state, setState] = useState<"idle" | "attacking">("idle");
  function reset() {
    setState("idle");
  }
  function attack() {
    setState("attacking");
  }
  const stl = {} as React.CSSProperties;

  if (props.offsetLeft) stl.left = props.offsetLeft;
  if (props.offsetRight) stl.right = props.offsetRight;
  if (props.imgWidth) stl.width = props.imgWidth;

  return (
    <div className="bg-gray-50 flex flex-col text-gray-500 w-96 h-[640px] px-4 shadow-lg rounded-2xl border-[3px] border-red-600">
      <h2 className="text-2xl mb-20 bg-red-600 text-white uppercase font-semibold py-4 text-center mt-8 -mx-4">
        {props.title}
      </h2>

      <Move offset={props.animateOffset} state={state} reset={reset}>
        <div style={stl} className="relative z-10 drop-shadow">
          <img src={props.img} alt={props.title} className="border-solid" />
        </div>
      </Move>
      <div className="flex-1 flex flex-col justify-end items-center m-4">
        <AttackBtn attack={attack} />
        <div className="mt-2 text-3xl text-red-500 font-bold">
          {props.damage}
        </div>
      </div>
    </div>
  );
}

function PlayBtn() {
  function handleClick() {
    console.log("Play!");
  }
  // add opacity again to make play work
  return (
    <button
      onClick={handleClick}
      className="bg-white opacity-0 text-xl z-20 text-red-500 h-fit px-4 py-2 font-bold uppercase rounded-md shadow-md hover:text-white hover:bg-red-500"
    >
      Play
    </button>
  );
}

function App() {
  const [marioStats] = useState({ damage: 50, hearts: 20 });
  const [bowserStats] = useState({ damage: 100, hearts: 100 });

  return (
    // main container
    <div className=" text-white p-4">
      <div className="flex flex-row gap-10 items-center">
        <Card
          title="Super Mario"
          img={mario}
          offsetRight={-100}
          imgWidth={300}
          animateOffset={100}
          damage={marioStats.damage}
        />
        <PlayBtn />
        <Card
          title="Bowser"
          img={bowser}
          offsetLeft={-100}
          imgWidth={450}
          animateOffset={-100}
          damage={bowserStats.damage}
        />
      </div>
    </div>
  );
}

export default App;
