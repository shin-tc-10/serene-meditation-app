"use client";

import { useEffect, useRef, useState } from "react";
import { Howl, Howler } from "howler";
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

    // iOS Safari: AudioContext が suspended の場合に resume
    if (Howler.ctx && Howler.ctx.state === "suspended") {
      Howler.ctx.resume();
    }

    const howl = new Howl({
      src: [`/sounds/${sound}.mp3`],
      loop: true,
      volume: 0,
      onplay: () => {
        howl.fade(0, volume, 800);
      },
    });

    howl.play();
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
