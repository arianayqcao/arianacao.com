import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(useGSAP, SplitText, ScrambleTextPlugin, MorphSVGPlugin);

/** IntroOverlay's (components/IntroOverlay.tsx) exit-fade window, in seconds
 * after mount. IntroOverlay's own fade tween must use these exact values —
 * don't hardcode 1.2/0.6 again there. */
export const OVERLAY_FADE_START = 1.2;
export const OVERLAY_FADE_DURATION = 0.6;

/** When the hero + bio intro reveals start, in seconds after mount — the
 * midpoint of IntroOverlay's exit fade, so reveals begin while the overlay
 * is already half-transparent rather than waiting for a hard cut. */
export const INTRO_REVEAL_DELAY = OVERLAY_FADE_START + OVERLAY_FADE_DURATION / 2;

export { gsap, SplitText, ScrambleTextPlugin, MorphSVGPlugin, useGSAP };
