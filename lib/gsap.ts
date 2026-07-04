import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(useGSAP, SplitText, ScrambleTextPlugin, MorphSVGPlugin);

/** Timeline offset (s) where IntroOverlay's phase-1 stickers finish settling
 * — last sticker `start` (0.37) + SETTLE_DURATION (0.8), from
 * components/IntroOverlay.tsx. Phase 2 (wordmark slide) starts here. */
export const STICKERS_SETTLE_END = 1.17;

/** Duration (s) of IntroOverlay's phase-2 wordmark slide, lifted 1:1 from the
 * Figma Motion export (node 388:1245) — see WORDMARK_* constants in
 * components/IntroOverlay.tsx. */
export const WORDMARK_PHASE_DURATION = 1.6656;

/** IntroOverlay's (components/IntroOverlay.tsx) exit-fade window, in seconds
 * after mount. IntroOverlay's own fade tween must use these exact values —
 * don't hardcode them again there. */
export const OVERLAY_FADE_START = STICKERS_SETTLE_END + WORDMARK_PHASE_DURATION;
export const OVERLAY_FADE_DURATION = 0.6;

/** When the hero + bio intro reveals start, in seconds after mount — the
 * midpoint of IntroOverlay's exit fade, so reveals begin while the overlay
 * is already half-transparent rather than waiting for a hard cut. */
export const INTRO_REVEAL_DELAY = OVERLAY_FADE_START + OVERLAY_FADE_DURATION / 2;

export { gsap, SplitText, ScrambleTextPlugin, MorphSVGPlugin, useGSAP };
