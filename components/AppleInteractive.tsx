"use client";

import { useRef } from "react";
import { gsap, useGSAP, INTRO_REVEAL_DELAY } from "@/lib/gsap";
import Caterpillar from "@/components/Caterpillar";

/**
 * Interactive apple with three stickers — 雨/yǔ, 曹/cáo, 琪/qí.
 * Hovering a sticker fades in the pinyin reading (500 ms, ease-out).
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
   `d` strings below can be used unmodified. This is a separate,
   one-shot vector reveal — unrelated to the always-on raster
   eye-blinking <Caterpillar /> rendered via <foreignObject> below. */
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

export default function AppleInteractive() {
  const svgRef = useRef<SVGSVGElement>(null);
  const bodyPathRef = useRef<SVGPathElement>(null);
  const leafPathRef = useRef<SVGPathElement>(null);
  const stemPathRef = useRef<SVGPathElement>(null);
  const caterpillarGroupRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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

      const tl = gsap.timeline({ delay: INTRO_REVEAL_DELAY });

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

          .sv1, .sv2 {
            transition:
              opacity 500ms cubic-bezier(0, 0, 0.2, 1),
              transform 500ms cubic-bezier(0, 0, 0.2, 1);
            transform-box: fill-box;
            transform-origin: center;
          }

          .sv2 {
            opacity: 0;
            transform: scale(0.75);
          }

          .sticker-group:hover .sv1 {
            opacity: 0;
            transform: scale(1.1);
          }

          .sticker-group:hover .sv2 {
            opacity: 1;
            transform: scale(1);
          }
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

      {/* ════════════════════════════════════════════
          STICKER 1 — 雨 / yǔ   (same size as the other two — was undersized
          and mislocated on the left; Figma has it middle-right)
          Default centre ≈ (1089, 1200)
      ════════════════════════════════════════════ */}
      <g className="sticker-group">
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

        {/* v2 – hover */}
        <g className="sv2">
          <path
            d="M985.89 1046.74L1171.41 1046.74L1263.59 1136.50L1246.83 1312.46L1091.47 1372.32L941.61 1297.09L922.46 1189.63Z"
            fill="white" opacity="0.45"
          />
          <path
            d="M1235.24 1304.21L1091.29 1359.68L952.43 1289.98L934.69 1190.41L993.47 1058.02H1165.36L1250.77 1141.18Z"
            fill="#FFDE88"
          />
          <text
            x="1089" y="1200"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-geist-sans), Arial, sans-serif"
            fontWeight="900"
            fontSize="118"
            fill="#341208"
          >yǔ</text>
        </g>
      </g>

      {/* ════════════════════════════════════════════
          STICKER 2 — 曹 / cáo   (medium, centre)
          Default centre ≈ (852, 1065)
      ════════════════════════════════════════════ */}
      <g className="sticker-group">
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
            d="M819.57 1067.43H884.57V1105.53H868.47V1077.73H834.87V1105.93H819.57V1067.43Z
               M828.47 1080.53H874.87V1089.33H828.47V1080.53Z
               M808.07 1016.93H896.37V1028.53H808.07V1016.93Z
               M828.47 1092.33H874.87V1102.93H828.47V1092.33Z
               M833.67 1011.23H847.87V1059.83H833.67V1011.23Z
               M854.97 1011.23H869.17V1060.33H854.97V1011.23Z
               M826.87 1052.03V1055.13H875.37V1052.03H826.87Z
               M826.87 1040.63V1043.83H875.37V1040.63H826.87Z
               M812.67 1031.03H890.37V1064.83H812.67V1031.03Z"
            fill="#341208"
          />
        </g>

        {/* v2 – hover */}
        <g className="sv2">
          <path
            d="M1026 1031L981 1196L819 1224L692 1127L690 1014L775 892L960 926Z"
            fill="white" opacity="0.45"
          />
          {/* large golden hex (from Figma panel 2) */}
          <path
            d="M1015.52 1026.4L972.99 1180.4L825.29 1209.32L703.68 1118.83
               L703.5 1020.16L782.4 902.91L947.56 932.03Z"
            fill="#FFDE88"
          />
          <text
            x="852" y="1068"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-geist-sans), Arial, sans-serif"
            fontWeight="900"
            fontSize="118"
            fill="#341208"
          >cáo</text>
        </g>
      </g>

      {/* ════════════════════════════════════════════
          STICKER 3 — 琪 / qí   (medium, lower)
          Default centre ≈ (911, 1410)
      ════════════════════════════════════════════ */}
      <g className="sticker-group">
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
            d="M899.1 1381.81H957.2V1394.71H899.1V1381.81Z
               M914.5 1398.61H940.7V1409.51H914.5V1398.61Z
               M914.5 1413.61H940.7V1424.51H914.5V1413.61Z
               M897.2 1429.01H958V1441.91H897.2V1429.01Z
               M906.3 1369.41H920.2V1433.81H906.3V1369.41Z
               M934.8 1369.41H949V1433.81H934.8V1369.41Z
               M863.7 1374.51H896.6V1387.91H863.7V1374.51Z
               M864.3 1403.21H895.2V1416.51H864.3V1403.21Z
               M873.1 1379.81H886.2V1440.91L873.1 1443.01V1379.81Z"
            fill="#1a0a05"
          />
          <path
            d="M930.3 1447.01L941.1 1439.71
               C943.167 1441.31 945.367 1443.11 947.7 1445.11
               C950.034 1447.05 952.267 1449.01 954.4 1451.01
               C956.6 1452.95 958.367 1454.71 959.7 1456.31
               L948.1 1464.51
               C946.9 1462.91 945.3 1461.08 943.3 1459.01
               C941.3 1456.95 939.167 1454.88 936.9 1452.81
               C934.634 1450.68 932.434 1448.75 930.3 1447.01Z
               M861.9 1441.01
               C864.834 1440.35 868.134 1439.55 871.8 1438.61
               C875.534 1437.68 879.434 1436.68 883.5 1435.61
               C887.567 1434.48 891.567 1433.35 895.5 1432.21
               L897.2 1445.21
               C891.6 1446.88 885.9 1448.58 880.1 1450.31
               C874.367 1451.98 869.1 1453.48 864.3 1454.81L861.9 1441.01Z
               M911.5 1439.01L923.1 1446.31
               C920.167 1450.18 916.667 1453.75 912.6 1457.01
               C908.6 1460.28 904.6 1462.98 900.6 1465.11
               C899.667 1463.58 898.3 1461.81 896.5 1459.81
               C894.767 1457.81 893.134 1456.18 891.6 1454.91
               C894.134 1453.71 896.6 1452.25 899 1450.51
               C901.467 1448.78 903.767 1446.95 905.9 1445.01
               C908.1 1443.01 909.967 1441.01 911.5 1439.01Z"
            fill="#1a0a05"
          />
        </g>

        {/* v2 – hover */}
        <g className="sv2">
          <path
            d="M1062 1312L1062 1512L911 1578L760 1512L760 1312L911 1253Z"
            fill="white" opacity="0.45"
          />
          <path
            d="M1050 1322L1050 1500L911 1562L772 1500L772 1322L911 1265Z"
            fill="#FFDE88"
          />
          <text
            x="911" y="1413"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-geist-sans), Arial, sans-serif"
            fontWeight="900"
            fontSize="118"
            fill="#1a0a05"
          >qí</text>
        </g>
      </g>
    </svg>
  );
}
