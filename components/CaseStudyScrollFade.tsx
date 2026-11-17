"use client";

import { useEffect } from "react";

export default function CaseStudyScrollFade() {
  useEffect(() => {
    const section = document.getElementById("final-solution");
    const page = document.querySelector<HTMLElement>(".case-study-page");
    if (!section || !page) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const top = section.getBoundingClientRect().top;
        const fadeDistance = Math.min(window.innerHeight * 0.65, 520);
        const progress = Math.max(0, Math.min(1, (fadeDistance - top) / fadeDistance));
        page.style.setProperty("--final-solution-progress", `${(progress * 100).toFixed(1)}%`);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      page.style.removeProperty("--final-solution-progress");
    };
  }, []);

  return null;
}
