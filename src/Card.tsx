import { ReactNode } from "react";
import { type AnimationScope, motion } from "framer-motion";

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

// todo: Simplify and use hero directly. Too many props
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
  flip?: boolean;
  attack: () => void;
};

export default function Card(props: PropsCard) {
  const stl: React.CSSProperties = {};

  if (props.offsetLeft) stl.left = props.offsetLeft;
  if (props.offsetRight) stl.right = props.offsetRight;
  if (props.imgWidth) stl.width = props.imgWidth;

  function attack() {
    if (props.heartsCnt <= 0) return;
    props.attack();
  }

  const hearts = props.heartsCnt === Infinity ? "∞" : props.heartsCnt;

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
        {hearts}
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
            style={{ transform: props.flip ? "scaleX(-1)" : "scaleX(1)" }}
            src={props.img}
            alt={props.title}
            className="border-solid drop-shadow"
          />
        </div>
      </Move>
    </div>
  );
}
