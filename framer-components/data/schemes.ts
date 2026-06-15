/** Color / theme definitions from oone.html (SCHEMES). */
export type SchemeVar = { v: string; acc: [number, number, number]; bg: string };
export type Scheme = {
  id: string;
  num: string;
  word: string;
  acc: [number, number, number];
  vars: SchemeVar[];
};

export const SCHEMES: Scheme[] = [
  {
    id: "s-fal",
    num: "F",
    word: "FERRO",
    acc: [228, 68, 28],
    vars: [
      { v: "v1", acc: [205, 52, 20], bg: "#180A05" },
      { v: "v2", acc: [228, 68, 28], bg: "#1A0C06" },
      { v: "v3", acc: [252, 95, 42], bg: "#1C0E07" },
    ],
  },
  {
    id: "s-win",
    num: "W",
    word: "COBALT",
    acc: [58, 102, 252],
    vars: [
      { v: "v1", acc: [38, 78, 228], bg: "#070918" },
      { v: "v2", acc: [58, 102, 252], bg: "#090B1C" },
      { v: "v3", acc: [88, 130, 255], bg: "#0B0D20" },
    ],
  },
  {
    id: "s-spr",
    num: "S",
    word: "PATINA",
    acc: [32, 198, 148],
    vars: [
      { v: "v1", acc: [20, 172, 128], bg: "#071210" },
      { v: "v2", acc: [32, 198, 148], bg: "#081412" },
      { v: "v3", acc: [50, 218, 165], bg: "#0A1614" },
    ],
  },
  {
    id: "s-sum",
    num: "U",
    word: "AMBER",
    acc: [238, 162, 28],
    vars: [
      { v: "v1", acc: [215, 140, 16], bg: "#130F05" },
      { v: "v2", acc: [238, 162, 28], bg: "#150F06" },
      { v: "v3", acc: [255, 182, 46], bg: "#171108" },
    ],
  },
  {
    id: "s-stn",
    num: "T",
    word: "BONE",
    acc: [210, 188, 155],
    vars: [
      { v: "v1", acc: [185, 162, 128], bg: "#0D0C0B" },
      { v: "v2", acc: [210, 188, 155], bg: "#0F0E0D" },
      { v: "v3", acc: [232, 210, 178], bg: "#111010" },
    ],
  },
];

export function rgb([r, g, b]: [number, number, number]): string {
  return `rgb(${r},${g},${b})`;
}
