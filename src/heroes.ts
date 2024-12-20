import baum from "./assets/baum.mp3";
import yah from "./assets/yah.mp3";
import uyah from "./assets/uyah.mp3";
import superMarioSnd from "./assets/super_mario.mp3";
import bowserSnd from "./assets/bowser.mp3";
import penumbraSnd from "./assets/penumbra.mp3";
import hugoSnd from "./assets/hugo.mp3";
import ramarainteSnd from "./assets/ramarainte.mp3";
import ramarainteAttack from "./assets/ramarainte_attack.mp3";

import hugoImg from "./assets/hugo.png";
import bowserImg from "./assets/bowser.png";
import mario from "./assets/mario.png";
import penumbra from "./assets/penumbra.png";
import master_lloyd from "./assets/master_lloyd.png";
import ramarainte from "./assets/ramarainte.png";
import rasquadrileao from "./assets/rasquadrileao.png";
import leao_rei from "./assets/leao_rei.png";

//* Based on marvel's power grid. */
export type Power = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Hero = {
  name: string;
  img: string;
  imgWidth: number;
  damage: number;
  hearts: number[] | "infinity";
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
  hugo: {
    name: "Hugo",
    img: hugoImg,
    imgWidth: 130,
    damage: 200,
    hearts: makeHeartsRange(100),
    age: 5,
    intelligence: 7,
    attackSound: yah,
    nameSound: hugoSnd,
    onLeft: { offset: -90, animateOffset: 350 },
    onRight: { offset: -20, animateOffset: 350 },
  },
  leaoRei: {
    name: "Leão: Rei de Sempre",
    img: leao_rei,
    imgWidth: 300,
    damage: 1300,
    hearts: makeHeartsRange(300),
    intelligence: 2,
    nameSound: yah,
    attackSound: yah,
    age: 1000,
    onLeft: { offset: -10, animateOffset: 350 },
    onRight: { offset: 10, animateOffset: 350 },
  },
  rasquadrileao: {
    name: "Rasquadrileão",
    img: rasquadrileao,
    imgWidth: 200,
    damage: 1000,
    hearts: makeHeartsRange(1200),
    intelligence: 2,
    nameSound: yah,
    attackSound: yah,
    age: 3,
    onLeft: { offset: -30, animateOffset: 400 },
    onRight: { offset: 30, animateOffset: 350 },
  },
  ramarainte: {
    name: "Ramarainte¡¡¡",
    img: ramarainte,
    imgWidth: 200,
    damage: 1501,
    hearts: "infinity",
    intelligence: 7,
    nameSound: ramarainteSnd,
    attackSound: ramarainteAttack,
    age: 300,
    onLeft: { offset: -30, animateOffset: 350 },
    onRight: { offset: 30, animateOffset: 350 },
  },
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
