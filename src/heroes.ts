import baum from "./assets/baum.mp3";
import yah from "./assets/yah.mp3";
import uyah from "./assets/uyah.mp3";
import bowser from "./assets/bowser.png";
import mario from "./assets/mario.png";
import penumbra from "./assets/penumbra.png";

export type Hero = {
  name: string;
  img: string;
  imgWidth: number;
  damage: number;
  hearts: number[];
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
    damage: 25,
    hearts: makeHeartsRange(50),
    attackSound: yah,
    onLeft: { offset: -90, animateOffset: 350 },
    onRight: { offset: -50, animateOffset: 350 },
  },
  bowser: {
    name: "Bowser",
    img: bowser,
    imgWidth: 300,
    damage: 10,
    hearts: makeHeartsRange(100),
    attackSound: baum,    
    onLeft: { offset: -50, animateOffset: -250 },
    onRight: { offset: -50, animateOffset: -250 },
  },
  penumbra: {
    name: "Penumbra",
    img: penumbra,
    imgWidth: 290,
    damage: 20,
    hearts: makeHeartsRange(20),
    attackSound: uyah,
    onLeft: { offset: -10, animateOffset: 350 },
    onRight: { offset: -50, animateOffset: 350 },
  },
};
