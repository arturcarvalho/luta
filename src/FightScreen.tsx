import { motion, AnimationScope, AnimatePresence } from "framer-motion";
import { type Hero } from "./heroes";
import Card from "./Card";

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

type Props = {
  reset: () => void;
  leftAttack: () => void;
  rightAttack: () => void;

  leftHero: Hero;
  rightHero: Hero;
  scopeLeft: AnimationScope;
  scopeRight: AnimationScope;
};

function FightScreen(props: Props) {
  return (
    <div className="text-white flex justify-center">
      <div className="flex flex-row">
        <div className="flex flex-col items-center select-none">
          <Card
            scope={props.scopeLeft}
            attack={props.leftAttack}
            title={props.leftHero.name}
            img={props.leftHero.img}
            offsetRight={props.leftHero.onLeft.offset}
            animateOffset={props.leftHero.onLeft.animateOffset}
            imgWidth={props.leftHero.imgWidth}
            damage={props.leftHero.damage}
            heartsCnt={props.leftHero.hearts.length}
          />
          <HeartGrid hearts={props.leftHero.hearts} />
        </div>

        <div className="mt-16 px-6">
          <ReloadBtn handleClick={props.reset} />
        </div>

        <div className="flex flex-col items-center select-none">
          <Card
            scope={props.scopeRight}
            attack={props.rightAttack}
            title={props.rightHero.name}
            img={props.rightHero.img}
            offsetLeft={props.rightHero.onRight.offset}
            animateOffset={props.rightHero.onRight.animateOffset}
            imgWidth={props.rightHero.imgWidth}
            damage={props.rightHero.damage}
            heartsCnt={props.rightHero.hearts.length}
          />
          <HeartGrid hearts={props.rightHero.hearts} />
        </div>
      </div>
    </div>
  );
}

export default FightScreen;
