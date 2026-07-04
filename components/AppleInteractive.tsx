"use client";

import { useRef } from "react";
import { gsap, useGSAP, INTRO_REVEAL_DELAY } from "@/lib/gsap";

/**
 * Interactive apple with three stickers — 雨/yǔ, 曹/cáo, 琪/qí.
 */

/* ─── apple body growth sequence ───────────────────────────────────
   5 Figma growth frames ("1".."5"), center-anchored and scaled (1.823x)
   onto the real apple body's bounding-box center so the bud grows
   symmetrically in place. Shape "5" is the original body path itself —
   reused verbatim so the morph's resting frame is pixel-identical to
   the static apple that existed before this animation.
   ──────────────────────────────────────────────────────────────────── */
const APPLE_SHAPE_1 = "M808.2928 1076.0633L744.8167 1164.9302L808.2928 1241.1017L871.7693 1241.1017L998.7223 1164.9302L808.2928 1076.0633Z";
const APPLE_SHAPE_2 = "M773.7081 999.3307L654.4652 1129.5565L773.7081 1215.8502L781.5531 1317.8343L1089.0738 1317.8343L1013.7621 1179.7639L993.3663 1019.7275L773.7081 999.3307Z";
const APPLE_SHAPE_3 = "M819.4202 969.5826L623.6227 1049.8055L778.845 1224.2825L786.6899 1326.2666L911.881 1393.8124L1094.2101 1326.2666L1018.9002 1188.1962L1119.9163 923.3526L819.4202 969.5826Z";
const APPLE_SHAPE_4 = "M306.942 1006.5634L429.7965 1233.7712L306.82 1360.5755L406.5913 1488.5245L658.7921 1700.9277L903.4496 1700.9277L904.6236 1683.1936L941.2951 1543.2966L1201.3643 1620.1962L1281.2554 1360.5755L1436.719 1080.0467L1388.0941 676.0836L1167.4109 616.2373L961.689 616.2373L750.8536 814.0182L383.6671 706.0494L306.942 1006.5634Z";
const APPLE_SHAPE_5 =
  "M364.579 976.437L358.579 1191.15L364.466 1303.88L530.797 1514.49" +
  "L690.436 1618.69L809.079 1592.84L809.63 1585.59L917.214 1603.95" +
  "L1192.93 1544.02L1287.04 1379.23L1384.96 1072.96L1266.79 788.341" +
  "L1002.06 698.475L862.248 766.717L775.697 798.341L610.917 790.019Z";

/* ─── leaf "morph from nothing" ─────────────────────────────────────
   Leaf morphs in from a degenerate point at its own bbox center,
   rather than just fading/scaling, to match the apple body's
   shape-morph language. ──────────────────────────────────────────── */
const LEAF_D = "M885.567 842.85L802.553 756.906L814.073 757.521L828.922 743.233L915.843 689.518L1083.83 743.233L1165.86 796.948L1225.44 814.527L1119.96 883.869H967.605Z";
const LEAF_DEGENERATE_D = "M1013.9965 786.6935L1013.9965 786.6935L1013.9965 786.6935Z";

/* ─── vector caterpillar "morph from nothing" ──────────────────────
   16 paths from the Figma "caterpillar with eyes" vector (page
   "apple", frame 26:1170) — already in the same coordinate units as
   the body/leaf/stem, just offset by this frame's absolute Figma
   position. Rendered inside a single translated <g> so the raw local
   `d` strings below can be used unmodified. Paths 0-13 are the body
   (never change); paths 14-15 are the pupils, whose `d` also gets
   driven post-reveal by the mouse-tracking effect below. The separate
   `components/Caterpillar.tsx` (raster, timer-cycled) is unused and
   unrelated to this one-shot vector reveal. */
const CATERPILLAR_OFFSET = "336.0365 730.9094";
const CATERPILLAR_PATHS: { d: string; degenerateD: string; fill: string }[] = [
  { fill: "#C8FF31", d: "M69.2028 153.333L89.1605 174.578L89.7092 175.323L51.0557 202.9L34.3241 186.169L34.3105 186.115L69.1772 153.042L69.2028 153.333Z", degenerateD: "M62.0099 177.971L62.0099 177.971L62.0099 177.971Z" },
  { fill: "#C8FF31", d: "M248.638 328.388L246.551 329.288L226.122 324.091L238.245 266.507L253.328 269.86L254.539 271.069L248.638 328.388Z", degenerateD: "M240.3305 297.8975L240.3305 297.8975L240.3305 297.8975Z" },
  { fill: "#C8FF31", d: "M183.798 254.409L215.935 261.55L190.006 314.556L170.238 299.301L182.656 253.537L183.798 254.409Z", degenerateD: "M193.0865 284.0465L193.0865 284.0465L193.0865 284.0465Z" },
  { fill: "#C8FF31", d: "M158.827 235.53L144.632 279.82L118.316 267.26L148.018 231.091L158.827 235.53Z", degenerateD: "M138.5715 255.4555L138.5715 255.4555L138.5715 255.4555Z" },
  { fill: "#C8FF31", d: "M122.75 220.208L100.906 257.938L78.0342 232.034L107.078 198.919L122.75 220.208Z", degenerateD: "M100.3921 228.4285L100.3921 228.4285L100.3921 228.4285Z" },
  { fill: "#7BC100", d: "M254.539 271.069L275.218 291.749L271.548 318.505L248.638 328.388L254.539 271.069Z", degenerateD: "M261.928 299.7285L261.928 299.7285L261.928 299.7285Z" },
  { fill: "#7BC100", d: "M215.935 261.55L238.245 266.507L226.122 324.091L190.676 315.074L190.006 314.556L215.935 261.55Z", degenerateD: "M214.1255 292.8205L214.1255 292.8205L214.1255 292.8205Z" },
  { fill: "#7BC100", d: "M144.632 279.82L158.827 235.53L159.334 235.738L182.656 253.537L170.238 299.301L145.584 280.274L144.632 279.82Z", degenerateD: "M163.644 267.4155L163.644 267.4155L163.644 267.4155Z" },
  { fill: "#7BC100", d: "M122.75 220.208L123.282 220.931L148.018 231.091L118.316 267.26L102.452 259.689L100.906 257.938L122.75 220.208Z", degenerateD: "M124.462 243.734L124.462 243.734L124.462 243.734Z" },
  { fill: "#7BC100", d: "M51.0557 202.9L89.7092 175.323L107.078 198.919L78.0342 232.034L61.7715 213.616L51.0557 202.9Z", degenerateD: "M79.0669 203.6785L79.0669 203.6785L79.0669 203.6785Z" },
  { fill: "#7BC100", d: "M19.8105 126.955L65.4419 110.887L69.1772 153.042L34.3105 186.115L19.8105 126.955Z", degenerateD: "M44.4939 148.501L44.4939 148.501L44.4939 148.501Z" },
  { fill: "#7BC100", d: "M3.57959 60.7324L64.6963 44.873V83.4478L12.0708 95.3765L3.57959 60.7324Z", degenerateD: "M34.1379 70.1247L34.1379 70.1247L34.1379 70.1247Z" },
  { fill: "#C8FF31", d: "M12.0708 95.3765L64.6963 83.4478V102.473L65.4419 110.887L19.8105 126.955L12.0708 95.3765Z", degenerateD: "M38.7564 105.2014L38.7564 105.2014L38.7564 105.2014Z" },
  { fill: "#7BC100", d: "M64.6963 44.873L3.57959 60.7324L0 46.1283L17.5065 2.22307L52.7974 0L64.6963 26.5049L64.6963 44.873Z", degenerateD: "M32.3481 30.3662L32.3481 30.3662L32.3481 30.3662Z" },
  { fill: "#341208", d: "M9.18519 29.7681L15.0959 26.4929L16.9114 32.1661L16.7719 36.2612L10.8612 37.5364L8.06816 34.074L9.18519 29.7681Z", degenerateD: "M12.4898 32.0147L12.4898 32.0147L12.4898 32.0147Z" },
  { fill: "#341208", d: "M25.3011 25.4754L31.3195 29.0599L31.9307 33.1115L30.5512 35.9697L24.5329 36.3852L22.9263 32.2369L25.3011 25.4754Z", degenerateD: "M27.4285 30.9303L27.4285 30.9303L27.4285 30.9303Z" },
];

/* ─── eye-tracking gaze states ──────────────────────────────────────
   Pupil `d` pairs per compass direction, pulled from the 8 Figma
   exports in public/caterpillar/*.svg. Each export's own path order
   isn't a reliable left/right indicator (4 of 8 files list the right
   eye first) — these were classified by x-coordinate range instead
   (lower x = left eye) and cross-checked against the "left" entry,
   which matches the default pose baked into CATERPILLAR_PATHS[14-15]
   above. ──────────────────────────────────────────────────────────── */
type GazeDirection = "up" | "down" | "left" | "right" | "up-left" | "up-right" | "down-left" | "down-right";

const EYE_PUPIL_PATHS: Record<GazeDirection, { left: string; right: string }> = {
  left: {
    left:  "M9.18519 29.7686L15.0959 26.4934L16.9114 32.1666L16.7719 36.2616L10.8612 37.5368L8.06816 34.0745L9.18519 29.7686Z",
    right: "M25.3011 25.4759L31.3195 29.0604L31.9307 33.112L30.5512 35.9702L24.5329 36.3857L22.9263 32.2374L25.3011 25.4759Z",
  },
  right: {
    left:  "M44.6979 24.2073L38.6796 27.7918L38.0684 31.8434L39.4478 34.7016L45.4662 35.1171L47.0727 30.9689L44.6979 24.2073Z",
    right: "M60.8138 28.5L54.9031 25.2248L53.0876 30.898L53.2272 34.9931L59.1379 36.2683L61.9309 32.8059L60.8138 28.5Z",
  },
  up: {
    left:  "M32.013 6.14098L25.1097 7.33028L23.087 10.8936L23.3503 14.0564L28.8199 16.6013L31.8065 13.3045L32.013 6.14098Z",
    right: "M43.7242 7.403L37.0789 6.17724L37.1615 12.1333L38.5959 15.9715L44.6054 15.301L46.1525 11.1303L43.7242 7.403Z",
  },
  down: {
    left:  "M25.6366 53.4487L32.2938 52.2888L32.1522 58.2438L30.6798 62.0675L24.6774 61.3377L23.1716 57.1518L25.6366 53.4487Z",
    right: "M36.4267 51.9729L43.4315 52.02L46.0085 55.2056L46.2647 58.369L41.2836 61.7722L37.7991 59.0067L36.4267 51.9729Z",
  },
  "up-left": {
    left:  "M19.0291 31.2897L12.4835 33.7847L8.92709 31.7498L7.54177 28.8944L10.9507 23.9172L15.2005 25.2316L19.0291 31.2897Z",
    right: "M24.9579 19.2795L22.5292 25.5854L17.4948 22.4016L14.9726 19.1724L18.6854 14.3999L23.0497 15.2611L24.9579 19.2795Z",
  },
  "up-right": {
    left:  "M49.6684 5.76844L51.2803 12.3308L56.6768 9.80899L59.5871 6.92467L56.5075 1.72097L52.0693 2.02353L49.6684 5.76844Z",
    right: "M54.0308 18.4317L60.2084 21.7342L63.9935 20.1653L65.7287 17.5079L62.9764 12.1397L58.5945 12.9062L54.0308 18.4317Z",
  },
  "down-left": {
    left:  "M12.324 40.3207L18.8525 42.065L16.2221 47.4094L13.2795 50.2607L8.13915 47.0765L8.53137 42.6454L12.324 40.3207Z",
    right: "M22.6108 44.3869L27.825 49.0647L27.6434 53.1581L25.7387 55.6967L19.7532 54.9438L18.9768 50.5636L22.6108 44.3869Z",
  },
  "down-right": {
    left:  "M48.4429 38.3273L43.7832 43.5577L44.4203 47.6053L46.5964 49.9155L52.4605 48.4995L52.7434 44.06L48.4429 38.3273Z",
    right: "M58.2116 33.1393L51.9185 35.6011L55.1288 40.6186L58.3711 43.1239L63.1241 39.3861L62.24 35.0264L58.2116 33.1393Z",
  },
};

const DIRECTION_BY_OCTANT: GazeDirection[] =
  ["right", "down-right", "down", "down-left", "left", "up-left", "up", "up-right"];

const STICKER_CENTERS: Record<string, string> = {
  yu: "1089 1200",
  cao: "852 1065",
  qi: "911 1410",
};


export default function AppleInteractive() {
  const svgRef = useRef<SVGSVGElement>(null);
  const bodyPathRef = useRef<SVGPathElement>(null);
  const leafPathRef = useRef<SVGPathElement>(null);
  const stemPathRef = useRef<SVGPathElement>(null);
  const caterpillarGroupRef = useRef<SVGGElement>(null);
  const pupilLeftPathRef = useRef<SVGPathElement>(null);
  const pupilRightPathRef = useRef<SVGPathElement>(null);
  const introSettledRef = useRef(false);
  const reconcileEyesRef = useRef<(() => void) | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        introSettledRef.current = true;
        return;
      }
      if (!bodyPathRef.current || !leafPathRef.current || !stemPathRef.current) return;

      const bodyPath = bodyPathRef.current;
      const leafPath = leafPathRef.current;
      const stemPath = stemPathRef.current;
      const originalBodyD = bodyPath.getAttribute("d");
      const originalLeafD = leafPath.getAttribute("d");
      const caterpillarPaths = caterpillarGroupRef.current
        ? Array.from(caterpillarGroupRef.current.querySelectorAll("path"))
        : [];
      const originalCaterpillarDs = caterpillarPaths.map((p) => p.getAttribute("d"));

      gsap.set(bodyPath, { attr: { d: APPLE_SHAPE_1 } });
      gsap.set(leafPath, { attr: { d: LEAF_DEGENERATE_D } });
      gsap.set(stemPath, { y: -40, opacity: 0 });
      caterpillarPaths.forEach((p, i) => gsap.set(p, { attr: { d: CATERPILLAR_PATHS[i].degenerateD } }));

      const tl = gsap.timeline({
        delay: INTRO_REVEAL_DELAY,
        onComplete: () => {
          introSettledRef.current = true;
          reconcileEyesRef.current?.();
        },
      });

      tl.to(bodyPath, { morphSVG: { shape: APPLE_SHAPE_2, type: "rotational", shapeIndex: "auto" }, duration: 0.3, ease: "back.out(1.7)" })
        .to(bodyPath, { morphSVG: { shape: APPLE_SHAPE_3, type: "rotational", shapeIndex: "auto" }, duration: 0.3, ease: "back.out(1.7)" })
        .to(bodyPath, { morphSVG: { shape: APPLE_SHAPE_4, type: "rotational", shapeIndex: "auto" }, duration: 0.7, ease: "back.out(1.7)" })
        .to(bodyPath, { morphSVG: { shape: APPLE_SHAPE_5, type: "rotational", shapeIndex: "auto" }, duration: 0.5, ease: "back.out(1.7)" });

      // stem slide-in + leaf/caterpillar reveal fire together, right as the growth chain ends
      tl.to(stemPath, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, "growthComplete");
      tl.to(leafPath, { morphSVG: { shape: LEAF_D, type: "rotational", shapeIndex: "auto" }, duration: 0.4, ease: "back.out(1.7)" }, "growthComplete");
      caterpillarPaths.forEach((p, i) => {
        tl.to(p, { morphSVG: { shape: CATERPILLAR_PATHS[i].d, type: "rotational", shapeIndex: "auto" }, duration: 0.4, ease: "back.out(1.7)" }, "growthComplete");
      });

      return () => {
        tl.kill();
        if (originalBodyD) bodyPath.setAttribute("d", originalBodyD);
        if (originalLeafD) leafPath.setAttribute("d", originalLeafD);
        caterpillarPaths.forEach((p, i) => {
          const original = originalCaterpillarDs[i];
          if (original) p.setAttribute("d", original);
        });
        gsap.set(stemPath, { clearProps: "y,opacity" });
      };
    },
    { scope: svgRef }
  );

  // ── Sticker hover animation ──

  useGSAP(
    () => {
      const stickers = gsap.utils.toArray<SVGGElement>(".sticker-group");

      const cleanups = stickers.map((sticker) => {
        const visual = sticker.querySelector<SVGGElement>(".sticker-visual");
        const v1 = sticker.querySelector<SVGGElement>(".sv1");
        const v2 = sticker.querySelector<SVGGElement>(".sv2");
        if (!visual || !v1 || !v2) return () => {};

        const origin = STICKER_CENTERS[(sticker as SVGGElement).dataset.name ?? ""];

        gsap.set(visual, { svgOrigin: origin });
        gsap.set(v2, { autoAlpha: 1, scale: 1, svgOrigin: origin });

        const tl = gsap.timeline({ paused: true })
          .to(v1, { autoAlpha: 0, duration: 0.25, ease: "power2.out" }, 0)
          .to(v2, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" }, 0)
          .to(visual, { rotate: 10, scale: 1.5, duration: 0.3, ease: "back.out(1.7)" }, 0);

        const onEnter = () => tl.play();
        const onLeave = () => tl.reverse();

        sticker.addEventListener("mouseenter", onEnter);
        sticker.addEventListener("mouseleave", onLeave);

        return () => {
          sticker.removeEventListener("mouseenter", onEnter);
          sticker.removeEventListener("mouseleave", onLeave);
          tl.kill();
        };
      });

      return () => cleanups.forEach((cleanup) => cleanup());
    },
    { scope: svgRef }
  );

  // ── Caterpillar eye-tracking ──

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const pupilLeft = pupilLeftPathRef.current;
      const pupilRight = pupilRightPathRef.current;
      if (!pupilLeft || !pupilRight) return;

      let anchorX = 0;
      let anchorY = 0;
      let anchorDirty = true;
      let anchorFrame: number | null = null;

      function measureAnchor() {
        anchorFrame = null;
        if (!pupilLeft || !pupilRight) return;
        const leftRect = pupilLeft.getBoundingClientRect();
        const rightRect = pupilRight.getBoundingClientRect();
        const minX = Math.min(leftRect.left, rightRect.left);
        const maxX = Math.max(leftRect.right, rightRect.right);
        const minY = Math.min(leftRect.top, rightRect.top);
        const maxY = Math.max(leftRect.bottom, rightRect.bottom);
        anchorX = (minX + maxX) / 2;
        anchorY = (minY + maxY) / 2;
        anchorDirty = false;
      }

      function scheduleAnchorRemeasure() {
        anchorDirty = true;
        if (anchorFrame === null) anchorFrame = requestAnimationFrame(measureAnchor);
      }

      measureAnchor();

      let currentDirection: GazeDirection | null = null;
      let hasMoved = false;
      let pendingX = 0;
      let pendingY = 0;
      let moveFrame: number | null = null;

      function applyDirection(direction: GazeDirection) {
        if (direction === currentDirection) return;
        currentDirection = direction;
        const { left, right } = EYE_PUPIL_PATHS[direction];
        gsap.to(pupilLeft, { morphSVG: left, duration: 0.15, ease: "power2.out" });
        gsap.to(pupilRight, { morphSVG: right, duration: 0.15, ease: "power2.out" });
      }

      function reconcile() {
        moveFrame = null;
        if (!hasMoved || !introSettledRef.current) return;
        if (anchorDirty) measureAnchor();

        const dx = pendingX - anchorX;
        const dy = pendingY - anchorY;
        const angleDeg = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
        const octant = Math.round(angleDeg / 45) % 8;
        applyDirection(DIRECTION_BY_OCTANT[octant]);
      }

      function handlePointerMove(e: PointerEvent) {
        pendingX = e.clientX;
        pendingY = e.clientY;
        hasMoved = true;
        if (moveFrame === null) moveFrame = requestAnimationFrame(reconcile);
      }

      function handleResizeOrScroll() {
        scheduleAnchorRemeasure();
      }

      // let the intro timeline's onComplete reconcile immediately against
      // wherever the mouse already is, instead of waiting for the next move
      reconcileEyesRef.current = reconcile;

      document.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("resize", handleResizeOrScroll);
      window.addEventListener("scroll", handleResizeOrScroll, { passive: true });

      return () => {
        document.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("resize", handleResizeOrScroll);
        window.removeEventListener("scroll", handleResizeOrScroll);
        if (moveFrame !== null) cancelAnimationFrame(moveFrame);
        if (anchorFrame !== null) cancelAnimationFrame(anchorFrame);
        gsap.killTweensOf(pupilLeft);
        gsap.killTweensOf(pupilRight);
        if (reconcileEyesRef.current === reconcile) reconcileEyesRef.current = null;
      };
    },
    { scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      viewBox="310 665 1090 1015"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Interactive apple with name stickers"
      style={{ overflow: "visible", width: "100%", maxWidth: 480 }}
    >
      <defs>
        <style>{`
          .sticker-group { cursor: pointer; }
          .sticker-visual { pointer-events: none; will-change: transform; }
          .sv2 { visibility: hidden; }
        `}</style>      
      </defs>

      {/* ── Apple body ── */}
      <path ref={bodyPathRef} d={APPLE_SHAPE_5} fill="#F60000" />

      {/* ── Leaf ── */}
      <path
        ref={leafPathRef}
        d={LEAF_D}
        fill="#93F200"
        data-cursor="stop"
        style={{ pointerEvents: "all", cursor: "none" }}
      />

      {/* ── Stem ── */}
      <path
        ref={stemPathRef}
        d="M730.353 726.907L759.802 710.876L802.553 789.406L773.104 805.438L732.073 750.225Z"
        fill="#341208"
      />

      {/* ── Vector caterpillar (morphs in from nothing alongside the leaf) ── */}
      <g ref={caterpillarGroupRef} transform={`translate(${CATERPILLAR_OFFSET})`}>
        {CATERPILLAR_PATHS.map((p, i) => (
          <path
            key={i}
            ref={i === 14 ? pupilLeftPathRef : i === 15 ? pupilRightPathRef : undefined}
            d={p.d}
            fill={p.fill}
          />
        ))}
      </g>

      {/* ════════════════════════════════════════════
          STICKER 1 — 雨 / yǔ   (same size as the other two — was undersized
          and mislocated on the left; Figma has it middle-right)
          Default centre ≈ (1089, 1200)
      ════════════════════════════════════════════ */}
      <g className="sticker-group" data-name="yu">
        {/* stable hit-area — never transforms, so hover stays anchored under the
            cursor even as .sticker-visual scales/rotates on hover (see useGSAP above) */}
        <path
          d="M1178.18 1263.63L1090.41 1297.45L1005.74 1254.95L994.92 1194.24L1030.76 1113.51H1135.57L1187.65 1164.22Z"
          fill="transparent"
        />
        <g className="sticker-visual">
        {/* v1 – default */}
        <g className="sv1">
          {/* white outline (even-odd knockout gives the border) */}
          <path
            fillRule="evenodd"
            d="M1143.70 1093.51L1208.46 1156.58L1196.91 1277.84L1089.34 1319.30L987.80 1268.33L974.15 1191.72L1017.75 1093.51Z
               M1030.76 1113.51L994.92 1194.24L1005.74 1254.95L1090.41 1297.45L1178.18 1263.63L1187.65 1164.22L1135.57 1113.51Z"
            fill="white"
          />
          {/* golden hex */}
          <path
            d="M1178.18 1263.63L1090.41 1297.45L1005.74 1254.95L994.92 1194.24L1030.76 1113.51H1135.57L1187.65 1164.22Z"
            fill="#FFDE88"
          />
          {/* 雨 — exact vector strokes from design */}
          <path
            transform="translate(1043.3 1155.3)"
            d="M38.1 10.2H52.4V88.1H38.1V10.2ZM16.5 44.6L24.8 36.6C26.3333 37.5333 28.0333 38.6333 29.9 39.9C31.8333 41.1 33.7 42.3 35.5 43.5C37.3 44.7 38.8 45.7667 40 46.7L31.3 55.6C30.2333 54.6 28.8333 53.4667 27.1 52.2C25.3667 50.9333 23.5667 49.6333 21.7 48.3C19.8333 46.9 18.1 45.6667 16.5 44.6ZM16 63.3L24.5 55.4C26.0333 56.5333 27.7667 57.8 29.7 59.2C31.6333 60.6 33.5 62 35.3 63.4C37.1 64.7333 38.5667 65.9333 39.7 67L30.8 76C29.7333 74.8667 28.3333 73.5667 26.6 72.1C24.8667 70.5667 23.0667 69.0333 21.2 67.5C19.3333 65.9667 17.6 64.5667 16 63.3ZM51.5 44.6L59.6 36.4C61.2 37.3333 63 38.4333 65 39.7C67 40.9 68.9333 42.1 70.8 43.3C72.7333 44.4333 74.3 45.4667 75.5 46.4L67 55.6C65.9333 54.6 64.5 53.4667 62.7 52.2C60.9 50.9333 59 49.6333 57 48.3C55 46.9 53.1667 45.6667 51.5 44.6ZM50.4 62.9L58.7 54.8C60.3 55.8667 62.1 57.1 64.1 58.5C66.1667 59.9 68.1333 61.2667 70 62.6C71.9333 63.9333 73.5333 65.1333 74.8 66.2L66.1 75.4C64.9667 74.2667 63.4667 73 61.6 71.6C59.8 70.1333 57.9 68.6333 55.9 67.1C53.9 65.5667 52.0667 64.1667 50.4 62.9ZM4 21.5H79.3V35H17.9V89.4H4V21.5ZM73.7 21.5H88V75C88 78.2 87.5667 80.7 86.7 82.5C85.9 84.3667 84.4333 85.8333 82.3 86.9C80.2333 87.9 77.7333 88.5 74.8 88.7C71.9333 88.9667 68.6333 89.1 64.9 89.1C64.5667 87.3 63.9333 85.1667 63 82.7C62.0667 80.3 61.1333 78.2667 60.2 76.6C61.6 76.6667 63.0667 76.7333 64.6 76.8C66.1333 76.8 67.5333 76.8 68.8 76.8C70.1333 76.8 71.0333 76.8 71.5 76.8C72.3 76.7333 72.8667 76.5667 73.2 76.3C73.5333 76.0333 73.7 75.5333 73.7 74.8V21.5ZM0 0H91.4V14.3H0V0Z"
            fill="#341208"
          />
        </g>

        {/* v2 – hover (exact vectors from design, Variant2) */}
        <g className="sv2">
          <g transform="translate(365.25 405.45) scale(0.6667)">
            <path
              transform="translate(913.266 1030.6625)"
              fillRule="evenodd"
              d="M254.328 0L351.468 94.5928L334.145 276.49L172.788 338.675L20.4795 262.228L0 147.313L65.4033 0H254.328ZM84.9082 30L31.1465 151.092L47.376 242.161L174.384 305.909L306.039 255.171L320.24 106.058L242.135 30H84.9082Z"
              fill="white" opacity="1"
            />
            <path
              transform="translate(944.453 1062.0455)"
              d="M274.893 225.171L143.238 275.909L16.2298 212.161L0 121.092L53.7614 0H210.988L289.094 76.0576L274.893 225.171Z"
              fill="#FFDE88"
            />
            {/* yǔ — exact vector strokes from design */}
            <g transform="translate(976.5 1095.5)">
              <path fillRule="evenodd" clipRule="evenodd" d="M122.505 11.1135L159.958 39.2372L185.533 0L163.079 3.95918L156.103 17.3744L145.156 7.11958L122.505 11.1135Z" fill="#341208" />
              <path d="M39.5696 208.717L51.3364 155.668L0 74.1438L32.4987 68.4134L61.8839 123.345L71.3001 61.5717L103.208 55.9455L71.6743 203.056L39.5696 208.717Z" fill="#341208" />
              <path d="M146.816 145.534C152.779 147.867 160.027 148.282 168.562 146.777C174.734 145.689 180.191 143.237 184.934 139.422C188.424 136.674 191.129 132.815 193.047 127.844L195.164 139.852L224.905 134.608L207.784 37.506L178.042 42.7501L183.703 74.8549C185.046 82.4707 186.011 89.4763 186.597 95.8717C187.183 102.267 186.553 107.523 184.706 111.64C182.991 115.733 179.113 118.312 173.073 119.377C168.346 120.211 164.693 119.839 162.113 118.263C159.534 116.687 157.661 114.513 156.495 111.74C155.306 108.836 154.434 105.808 153.878 102.656L144.362 48.6889L114.621 53.9331L125.213 114.006C126.556 121.622 128.996 128.165 132.533 133.634C136.07 139.102 140.831 143.069 146.816 145.534Z" fill="#341208" />
            </g>
          </g>
        </g>
        </g>
      </g>

      {/* ════════════════════════════════════════════
          STICKER 2 — 曹 / cáo   (medium, centre)
          Default centre ≈ (852, 1065)
      ════════════════════════════════════════════ */}
      <g className="sticker-group" data-name="cao">
        {/* stable hit-area — never transforms, so hover stays anchored under the
            cursor even as .sticker-visual scales/rotates on hover (see useGSAP above) */}
        <path
          d="M939.117 1122.79L851.347 1156.61L766.675 1114.11L755.855 1053.4L791.696 972.674H896.514L948.585 1023.38Z"
          fill="transparent"
        />
        <g className="sticker-visual">
        {/* v1 – default */}
        <g className="sv1">
          {/* white outline (even-odd knockout gives the border) */}
          <path
            fillRule="evenodd"
            d="M904.644 952.674L969.403 1015.74L957.854 1137L850.283 1178.46
               L748.744 1127.49L735.092 1050.88L778.693 952.674H904.644Z
               M791.696 972.674L755.855 1053.4L766.676 1114.11L851.348 1156.61
               L939.117 1122.79L948.585 1023.38L896.514 972.674Z"
            fill="white"
          />
          {/* golden hex */}
          <path
            d="M939.117 1122.79L851.347 1156.61L766.675 1114.11L755.855 1053.4
               L791.696 972.674H896.514L948.585 1023.38Z"
            fill="#FFDE88"
          />
          {/* 曹 — exact vector strokes from design */}
          <path
            transform="translate(807.85 1017.65)"
            d="M11.5 56.2H76.5V94.3H60.4V66.5H26.8V94.7H11.5V56.2ZM20.4 69.3H66.8V78.1H20.4V69.3ZM0 5.7H88.3V17.3H0V5.7ZM20.4 81.1H66.8V91.7H20.4V81.1ZM25.6 0H39.8V48.6H25.6V0ZM46.9 0H61.1V49.1H46.9V0ZM18.8 40.8V43.9H67.3V40.8H18.8ZM18.8 29.4V32.6H67.3V29.4H18.8ZM4.6 19.8H82.3V53.6H4.6V19.8Z"
            fill="#341208"
          />
        </g>

        {/* v2 – hover (exact vectors from design, Variant2) */}
        <g className="sv2">
          <g transform="translate(319.5 399.4) scale(0.625)">
            <path
              transform="translate(664.5505 884.373)"
              fillRule="evenodd"
              d="M271.283 0L374.899 100.898L356.421 294.923L184.308 361.254L21.8447 279.709L0 157.134L69.7637 0H271.283ZM90.5684 32L33.2227 161.164L50.5342 258.305L186.01 326.304L326.441 272.182L341.59 113.128L258.276 32H90.5684Z"
              fill="white" opacity="1"
            />
            <path
              transform="translate(697.8165 917.8485)"
              d="M293.219 240.182L152.787 294.303L17.3118 226.305L0 129.165L57.3455 0H225.054L308.367 81.1281L293.219 240.182Z"
              fill="#FFDE88"
            />
            {/* cáo — exact vector strokes from design */}
            <g transform="translate(694.5 990)">
              <path d="M255.49 155.292C245.872 153.799 237.58 150.285 230.613 144.75C223.799 139.104 218.811 132.123 215.65 123.806C212.509 115.357 211.696 106.258 213.21 96.5083C214.744 86.6267 218.278 78.2026 223.813 71.236C229.348 64.2694 236.207 59.1952 244.393 56.0135C252.709 52.8522 261.677 52.0184 271.295 53.5119C280.913 55.0054 289.139 58.5092 295.974 64.0232C302.809 69.5373 307.807 76.4528 310.969 84.7697C314.13 93.0866 314.943 102.186 313.409 112.067C311.895 121.817 308.36 130.241 302.805 137.34C297.271 144.306 290.401 149.446 282.195 152.76C274.01 155.942 265.108 156.786 255.49 155.292ZM259.541 129.205C263.889 129.88 267.721 129.53 271.038 128.156C274.375 126.651 277.055 124.166 279.077 120.702C281.252 117.126 282.748 112.704 283.566 107.433C284.405 102.031 284.31 97.4291 283.282 93.6262C282.405 89.712 280.595 86.5974 277.851 84.2823C275.128 81.8354 271.592 80.2744 267.244 79.5992C262.896 78.9241 259.054 79.3394 255.716 80.8451C252.4 82.2191 249.664 84.628 247.51 88.0716C245.377 91.3834 243.891 95.7403 243.052 101.142C242.234 106.412 242.318 111.081 243.306 115.147C244.314 119.082 246.18 122.272 248.904 124.719C251.647 127.034 255.193 128.53 259.541 129.205Z" fill="#341208" />
              <path fillRule="evenodd" clipRule="evenodd" d="M151.522 24.7935L178.243 0L210.259 4.97155L173.064 28.1386L151.522 24.7935Z" fill="#341208" />
              <path d="M158.748 130.757C159.934 129.89 161.097 128.885 162.236 127.741L162.782 138.67L190.055 142.905L199.661 81.0462C201.461 69.4518 198.93 59.6811 192.069 51.7341C185.359 43.6758 175.087 38.5725 161.253 36.4243C152.821 35.1149 144.752 34.9414 137.046 35.9038C129.493 36.7549 121.43 39.1461 112.859 43.0774L122.254 65.9904C126.637 63.8373 131.869 62.2886 137.953 61.3443C144.057 60.2681 149.678 60.129 154.817 60.9269C159.692 61.6839 163.623 63.3063 166.61 65.7941C169.597 68.2819 170.732 71.8315 170.016 76.4429L169.771 78.0239L142.893 73.8503C138.545 73.1752 134.399 72.9362 130.455 73.1334C126.512 73.3306 122.892 74.0503 119.595 75.2926C115.163 76.8982 111.368 79.6147 108.21 83.4421C105.184 87.29 103.231 92.0466 102.351 97.7121C101.328 104.3 102.075 110.353 104.591 115.871C107.239 121.409 111.181 126.002 116.417 129.649C121.805 133.184 127.991 135.494 134.974 136.578C138.663 137.151 142.52 137.075 146.546 136.351C150.703 135.647 154.77 133.783 158.748 130.757ZM166.338 99.957C165.707 102.955 164.374 105.514 162.339 107.634C160.085 109.983 157.255 111.702 153.847 112.792C150.592 113.771 147.119 113.974 143.43 113.401C139.609 112.808 136.636 111.537 134.51 109.587C132.536 107.527 131.764 105.113 132.193 102.346C132.378 101.16 132.805 100.147 133.475 99.3067C134.166 98.3345 135.023 97.5906 136.048 97.0751C137.072 96.5595 138.198 96.262 139.425 96.1827C140.783 96.1237 142.253 96.217 143.834 96.4625L166.338 99.957Z" fill="#341208" />
              <path d="M20.7478 114.388C26.4901 118.248 33.5115 120.823 41.8121 122.112C52.0889 123.708 61.3608 122.651 69.6278 118.942C77.8948 115.234 84.6503 108.659 89.8943 99.2185L65.6004 84.9215C63.6486 88.8013 61.0847 91.8439 57.9087 94.0493C54.8644 96.2752 50.8389 96.9995 45.8323 96.222C41.2209 95.5059 37.65 93.7371 35.1197 90.9154C32.7416 87.9824 31.1904 84.5032 30.4662 80.4777C29.8941 76.341 29.9252 72.2304 30.5595 68.146C31.1937 64.0616 32.4004 60.2011 34.1795 56.5643C36.0903 52.948 38.6133 50.1689 41.7484 48.227C45.0357 46.1737 48.9851 45.5052 53.5965 46.2212C58.6032 46.9987 62.2194 48.9095 64.4453 51.9538C66.803 55.0185 68.3235 58.6954 69.0068 62.9844L96.4923 56.7277C94.3581 46.1415 89.9145 37.8279 83.1615 31.7868C76.4085 25.7458 67.8935 21.9273 57.6167 20.3315C49.3162 19.0426 41.8446 19.3666 35.2021 21.3037C28.6913 23.2611 23.0152 26.3602 18.1738 30.6009C13.3529 34.7098 9.48375 39.6412 6.56631 45.395C3.64888 51.1488 1.69915 57.1878 0.717115 63.512C-0.264919 69.8362 -0.238338 76.1821 0.796861 82.5497C1.83206 88.9173 4.01336 94.8557 7.34076 100.365C10.6682 105.874 15.1372 110.548 20.7478 114.388Z" fill="#341208" />
            </g>
          </g>
        </g>
        </g>
      </g>

      {/* ════════════════════════════════════════════
          STICKER 3 — 琪 / qí   (medium, lower)
          Default centre ≈ (911, 1410)
      ════════════════════════════════════════════ */}
      <g className="sticker-group" data-name="qi">
        {/* stable hit-area — never transforms, so hover stays anchored under the
            cursor even as .sticker-visual scales/rotates on hover (see useGSAP above) */}
        <path
          d="M997.697 1350.49L909.927 1316.66L825.255 1359.16L814.436 1419.87L850.276 1500.6H955.094L1007.16 1449.9Z"
          fill="transparent"
        />
        <g className="sticker-visual">
        {/* v1 – default */}
        <g className="sv1">
          {/* white outline */}
          <path
            fillRule="evenodd"
            d="M963.224 1520.6L1027.98 1457.54L1016.43 1336.27L908.863 1294.82
               L807.324 1345.78L793.672 1422.39L837.273 1520.6H963.224Z
               M850.276 1500.6L814.436 1419.87L825.256 1359.16L909.928 1316.66
               L997.697 1350.49L1007.17 1449.9L955.094 1500.6Z"
            fill="white"
          />
          {/* golden hex */}
          <path
            d="M997.697 1350.49L909.927 1316.66L825.255 1359.16L814.436 1419.87
               L850.276 1500.6H955.094L1007.16 1449.9Z"
            fill="#FFDE88"
          />
          {/* 琪 — exact vector strokes from design */}
          <path
            transform="translate(862.1 1362.15)"
            d="M37.2 12.4H95.3V25.3H37.2V12.4ZM52.6 29.2H78.8V40.1H52.6V29.2ZM52.6 44.2H78.8V55.1H52.6V44.2ZM35.3 59.6H96.1V72.5H35.3V59.6ZM44.4 0H58.3V64.4H44.4V0ZM72.9 0H87.1V64.4H72.9V0ZM68.4 77.6L79.2 70.3C81.2667 71.9 83.4667 73.7 85.8 75.7C88.1333 77.6333 90.3667 79.6 92.5 81.6C94.7 83.5333 96.4667 85.3 97.8 86.9L86.2 95.1C85 93.5 83.4 91.6667 81.4 89.6C79.4 87.5333 77.2667 85.4667 75 83.4C72.7333 81.2667 70.5333 79.3333 68.4 77.6ZM1.8 5.09998H34.7V18.5H1.8V5.09998ZM2.4 33.8H33.3V47.1H2.4V33.8ZM0 71.6C2.93333 70.9333 6.23333 70.1333 9.9 69.2C13.6333 68.2666 17.5333 67.2666 21.6 66.2C25.6667 65.0666 29.6667 63.9333 33.6 62.8L35.3 75.8C29.7 77.4667 24 79.1667 18.2 80.9C12.4667 82.5667 7.2 84.0667 2.4 85.4L0 71.6ZM11.2 10.4H24.3V71.5L11.2 73.6V10.4ZM49.6 69.6L61.2 76.9C58.2667 80.7667 54.7667 84.3333 50.7 87.6C46.7 90.8667 42.7 93.5666 38.7 95.7C37.7667 94.1666 36.4 92.4 34.6 90.4C32.8667 88.4 31.2333 86.7667 29.7 85.5C32.2333 84.3 34.7 82.8333 37.1 81.1C39.5667 79.3667 41.8667 77.5333 44 75.6C46.2 73.6 48.0667 71.6 49.6 69.6Z"
            fill="#1a0a05"
          />
        </g>

        {/* v2 – hover (exact vectors from design, Variant2) */}
        <g className="sv2">
          <g transform="translate(303.5 467.7) scale(0.6667)">
            <g transform="translate(735.266 1240.6625)">
              <path
                fillRule="evenodd"
                d="M254.328 338.675L351.468 244.082L334.145 62.1846L172.788 0L20.4796 76.4473L0.000141955 191.362L65.4035 338.675H254.328ZM84.9083 308.675L31.1466 187.583L47.3761 96.5137L174.384 32.7656L306.039 83.5039L320.24 232.617L242.135 308.675H84.9083Z"
                fill="white" opacity="1"
              />
              <path
                d="M306.04 83.5042L174.384 32.7654L47.3765 96.5141L31.1466 187.583L84.908 308.675H242.135L320.241 232.617L306.04 83.5042Z"
                fill="#FFDE88"
              />
            </g>
            {/* qí — exact vector strokes from design */}
            <g transform="translate(815 1328)">
              <path d="M108.668 132.628L125.79 35.5264L155.531 40.7706L138.409 137.873L108.668 132.628ZM132.045 24.2411L159.268 0L191.175 5.6262L153.514 28.0266L132.045 24.2411Z" fill="#1a0a05" />
              <path d="M60.0819 111.707L50.8843 163.869L80.4286 169.078L104.635 31.7962L75.0909 26.5868L73.0283 38.2842C72.6685 37.3913 72.2752 36.551 71.8482 35.7631C69.1132 30.5422 65.7181 26.7619 61.6628 24.4221C57.7388 22.1055 53.8072 20.5999 49.8679 19.9053C41.4642 18.4235 33.9144 19.3939 27.2183 22.8165C20.5454 26.1078 14.9503 31.3491 10.4328 38.5406C6.06988 45.6239 3.03173 54.024 1.31841 63.7408C-0.580148 74.508 -0.428211 84.0121 1.77422 92.2531C3.9998 100.363 7.78537 106.92 13.1309 111.924C18.4765 116.928 24.7602 120.067 31.9822 121.341C36.5779 122.151 41.216 121.953 45.8965 120.748C50.5769 119.542 54.8865 116.985 58.8251 113.076C59.2532 112.64 59.6721 112.183 60.0819 111.707ZM56.7603 94.8406C53.6787 96.1927 50.1026 96.5099 46.032 95.7921C42.0928 95.0975 38.8409 93.5764 36.2763 91.2287C33.7116 88.8811 31.954 85.7956 31.0035 81.9725C30.1842 78.1725 30.2029 73.8433 31.0596 68.9849C31.9394 63.9952 33.4141 59.8551 35.4836 56.5645C37.6844 53.297 40.3913 50.9988 43.6042 49.6698C46.8171 48.3409 50.3932 48.0237 54.3324 48.7183C58.403 49.4361 61.6433 51.0229 64.0535 53.4787C66.6181 55.8264 68.3101 58.9002 69.1293 62.7002C70.103 66.392 70.15 70.7328 69.2701 75.7225C68.4135 80.5809 66.8847 84.6438 64.6839 87.9113C62.6375 91.0706 59.9963 93.3804 56.7603 94.8406Z" fill="#1a0a05" />
            </g>
          </g>
        </g>
        </g>
      </g>
    </svg>
  );
}
