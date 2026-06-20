"use client";

/**
 * Interactive apple with three stickers — 雨/yǔ, 曹/cáo, 琪/qí.
 * Hovering a sticker fades in the pinyin reading (500 ms, ease-out).
 *
 * Font note: add Noto Serif SC to app/layout.tsx for crisp CJK rendering:
 *   import { Noto_Serif_SC } from "next/font/google";
 *   const notoSerifSC = Noto_Serif_SC({ weight: ["700"], subsets: ["latin"] });
 *   then expose it as --font-noto-serif-sc and pass it to <html>.
 */
export default function AppleInteractive() {
  return (
    <svg
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
      <path
        d="M364.579 976.437L358.579 1191.15L364.466 1303.88L530.797 1514.49
           L690.436 1618.69L809.079 1592.84L809.63 1585.59L917.214 1603.95
           L1192.93 1544.02L1287.04 1379.23L1384.96 1072.96L1266.79 788.341
           L1002.06 698.475L862.248 766.717L775.697 798.341L610.917 790.019Z"
        fill="#F60000"
      />

      {/* ── Leaf ── */}
      <path
        d="M885.567 842.85L802.553 756.906L814.073 757.521L828.922 743.233
           L915.843 689.518L1083.83 743.233L1165.86 796.948L1225.44 814.527
           L1119.96 883.869H967.605Z"
        fill="#93F200"
      />

      {/* ── Stem ── */}
      <path
        d="M730.353 726.907L759.802 710.876L802.553 789.406L773.104 805.438L732.073 750.225Z"
        fill="#341208"
      />

      {/* ── Worm – light segments (#C8FF31) ── */}
      <path d="M405.239 884.242L425.197 905.487L425.746 906.232L387.092 933.81L370.361 917.078L370.347 917.024L405.214 883.951Z" fill="#C8FF31" />
      <path d="M348.107 826.286L400.733 814.357V833.382L401.479 841.796L355.847 857.864Z" fill="#C8FF31" />
      <path d="M458.787 951.118L436.943 988.847L414.071 962.943L443.115 929.828Z" fill="#C8FF31" />
      <path d="M494.864 966.439L480.668 1010.73L454.353 998.169L484.055 962Z" fill="#C8FF31" />
      <path d="M519.835 985.318L551.972 992.459L526.042 1045.47L506.275 1030.21L518.693 984.446Z" fill="#C8FF31" />
      <path d="M584.675 1059.3L582.588 1060.2L562.159 1055L574.281 997.417L589.365 1000.77L590.575 1001.98Z" fill="#C8FF31" />

      {/* ── Worm – dark segments (#7BC100) ── */}
      <path d="M400.733 775.782L339.616 791.642L336.037 777.037L353.543 733.132L388.834 730.909L400.733 757.414Z" fill="#7BC100" />
      <path d="M339.616 791.642L400.733 775.782V814.357L348.107 826.286Z" fill="#7BC100" />
      <path d="M355.847 857.864L401.479 841.796L405.214 883.951L370.347 917.024Z" fill="#7BC100" />
      <path d="M387.092 933.81L425.746 906.232L443.115 929.828L414.071 962.943L397.808 944.525Z" fill="#7BC100" />
      <path d="M458.787 951.118L459.318 951.84L484.055 962L454.353 998.169L438.489 990.598L436.943 988.847Z" fill="#7BC100" />
      <path d="M480.668 1010.73L494.864 966.439L495.371 966.647L518.693 984.446L506.275 1030.21L481.621 1011.18Z" fill="#7BC100" />
      <path d="M551.972 992.459L574.281 997.417L562.159 1055L526.713 1045.98L526.042 1045.47Z" fill="#7BC100" />
      <path d="M590.575 1001.98L611.254 1022.66L607.585 1049.41L584.675 1059.3Z" fill="#7BC100" />

      {/* ── Worm eyes ── */}
      <path d="M345.222 760.677L351.133 757.402L352.948 763.075L352.808 767.17L346.898 768.446L344.105 764.983Z" fill="#341208" />
      <path d="M361.338 756.385L367.356 759.969L367.967 764.021L366.588 766.879L360.569 767.294L358.963 763.146Z" fill="#341208" />

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
          <text
            x="1089" y="1200"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Noto Serif SC', 'Source Han Serif CN', serif"
            fontWeight="700"
            fontSize="90"
            fill="#341208"
          >雨</text>
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
