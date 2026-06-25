import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(useGSAP, SplitText, ScrambleTextPlugin, MorphSVGPlugin);

/** When the hero + bio intro reveals start, in seconds after mount — kept
 * in sync with when IntroOverlay (components/IntroOverlay.tsx) fades out. */
export const INTRO_REVEAL_DELAY = 1.6;

export { gsap, SplitText, ScrambleTextPlugin, MorphSVGPlugin, useGSAP };
