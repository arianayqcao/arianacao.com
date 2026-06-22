"use client";

import { useEffect, useState } from "react";

const SCREEN_DURATION = [1400, 1200, 1200, 1400]; // ms each screen stays

export default function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  const [screen, setScreen] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const duration = SCREEN_DURATION[screen];

    const t = setTimeout(() => {
      if (screen < 3) {
        setScreen((s) => s + 1);
      } else {
        // last screen — trigger exit
        setLeaving(true);
        setTimeout(onComplete, 600);
      }
    }, duration);

    return () => clearTimeout(t);
  }, [screen, onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        opacity: leaving ? 0 : 1,
        transition: leaving ? "opacity 0.6s ease" : "none",
        pointerEvents: leaving ? "none" : "all",
      }}
    >
      {screen === 0 && <Screen0 />}
      {screen === 1 && <Screen1 />}
      {screen === 2 && <Screen2 />}
      {screen === 3 && <Screen3 />}
    </div>
  );
}

