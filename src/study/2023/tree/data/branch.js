import { util } from "../Util.js";

const tree = document.querySelector(".tree");
const { top } = tree.getBoundingClientRect();

const centerX = innerWidth * 0.5;
const centerY = top;
export const radius = util.vw(15, 700, 10, 30);

export const branch = [
  {
    x1: centerX,
    y1: centerY,
    x2: centerX - util.vw(70),
    y2: centerY + util.vw(70),
    x3: centerX + util.vw(40),
    y3: centerY + util.vw(100),
  },
  {
    x1: centerX - util.vw(60),
    y1: centerY + util.vw(130),
    x2: centerX - util.vw(100),
    y2: centerY + util.vw(200),
    x3: centerX + util.vw(80),
    y3: centerY + util.vw(200),
  },
];

export const bauble = [
  [
    { x: -radius, y: 0, color: "red", position: 0.1 },
    { x: radius, y: 0, color: "blue", position: 0.5 },
    { x: 0, y: radius, color: "green", position: 0.8 },
    { x: 0, y: -radius, color: "yellow", position: 1 },
  ],
  [
    { x: -radius, y: 0, color: "red", position: 0.1 },
    { x: radius, y: 0, color: "blue", position: 0.3 },
    { x: 0, y: radius, color: "pink", position: 0.5 },
    { x: 0, y: -radius, color: "yellow", position: 0.7 },
    { x: 0, y: radius, color: "pink", position: 0.8 },
    { x: 0, y: -radius, color: "green", position: 0.9 },
    { x: 0, y: radius, color: "yellow", position: 1 },
  ],
];
