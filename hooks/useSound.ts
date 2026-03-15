"use client";

import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { SoundType } from "@/types";

export function useSound() {
  const [activeSound, setActiveSound] = useState<SoundType>("none");
  const [volume, setVolume] = useState(0.5);
  const howlRef = useRef<Howl | null>(null);

  const stopCurrent = () => {
    if (howlRef.current) {
      howlRef.current.fade(howlRef.current.volume(), 0, 500);
      setTimeout(() => {
        howlRef.current?.stop();
        howlRef.current?.unload();
        howlRef.current = null;
      }, 500);
    }
  };

  const play = (sound: SoundType) => {
    if (sound === activeSound) {
      stopCurrent();
      setActiveSound("none");
      return;
    }

    stopCurrent();

    if (sound === "none") {
      setActiveSound("none");
      return;
    }

    const howl = new Howl({
      src: [`/sounds/${sound}.mp3`],
      loop: true,
      volume: 0,
      html5: true,
    });

    howl.play();
    howl.fade(0, volume, 800);
    howlRef.current = howl;
    setActiveSound(sound);
  };

  const stopAll = () => {
    stopCurrent();
    setActiveSound("none");
  };

  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.volume(volume);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      howlRef.current?.stop();
      howlRef.current?.unload();
    };
  }, []);

  return { activeSound, volume, play, stopAll, setVolume };
}
