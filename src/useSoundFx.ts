// @ts-expect-error the lib is not typed
import useSound from "use-sound";
import sound_fx from "./assets/sound_fx.mp3";

export function useSoundFx() {
  const [play] = useSound(sound_fx, {
    sprite: {
      attack: [0, 900],
      hearts: [900, 1000],
      intelligence: [1900, 1600],
      fight: [3500, 900],
      years: [4400, 900],
    },
  });

  function playFight() {
    play({ id: "fight" });
  }

  function playYears() {
    play({ id: "years" });
  }

  function playAttack() {
    play({ id: "attack" });
  }

  function playHearts() {
    play({ id: "hearts" });
  }

  function playIntelligence() {
    play({ id: "intelligence" });
  }

  return {
    playFight,
    playYears,
    playAttack,
    playHearts,
    playIntelligence,
  };
}
