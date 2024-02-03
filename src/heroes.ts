import baum from "./assets/baum.mp3";
import yah from "./assets/yah.mp3";
import uyah from "./assets/uyah.mp3";
import superMarioSnd from "./assets/super_mario.mp3";
import bowserSnd from "./assets/bowser.mp3";
import penumbraSnd from "./assets/penumbra.mp3";

import bowserImg from "./assets/bowser.png";
import mario from "./assets/mario.png";
import penumbra from "./assets/penumbra.png";
import master_lloyd from "./assets/master_lloyd.png";

//* Based on marvel's power grid. */
export type Power = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Hero = {
  name: string;
  img: string;
  imgWidth: number;
  damage: number;
  hearts: number[];
  age: number;
  intelligence: Power;
  nameSound?: string;
  attackSound: string;
  onLeft: { offset: number; animateOffset: number };
  onRight: { offset: number; animateOffset: number };
};

function makeHeartsRange(n: number) {
  return [...Array(n).keys()];
}

export const heroes: Record<string, Hero> = {

  mario: {
    name: "Super Mario",
    img: mario,
    imgWidth: 200,
    damage: 5,
    hearts: makeHeartsRange(50),
    age: 43,
    intelligence: 3,
    attackSound: yah,
    nameSound: superMarioSnd,
    onLeft: { offset: -90, animateOffset: 350 },
    onRight: { offset: -50, animateOffset: 350 },
  },
  bowser: {
    name: "Bowser",
    img: bowserImg,
    imgWidth: 300,
    damage: 10,
    hearts: makeHeartsRange(100),
    age: 34,
    intelligence: 2,
    attackSound: baum,
    nameSound: bowserSnd,
    onLeft: { offset: -20, animateOffset: -250 },
    onRight: { offset: -50, animateOffset: -250 },
  },
  penumbra: {
    name: "Penumbra",
    img: penumbra,
    imgWidth: 290,
    damage: 4,
    hearts: makeHeartsRange(20),
    age: 230,
    intelligence: 6,
    attackSound: uyah,
    nameSound: penumbraSnd,
    onLeft: { offset: -10, animateOffset: 350 },
    onRight: { offset: -50, animateOffset: 350 },
  },
  master_lloyd: {
    name: "Master Lloyd",
    img: master_lloyd,
    imgWidth: 240,
    damage: 3,
    hearts: makeHeartsRange(100),
    age: 32,
    intelligence: 2,
    attackSound: baum,
    onLeft: { offset: -90, animateOffset: -250 },
    onRight: { offset: -70, animateOffset: -250 },
  },

};
