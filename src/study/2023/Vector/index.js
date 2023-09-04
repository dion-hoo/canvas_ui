import { Point } from "./Point.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);
};

let point1, point2;
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  point1 = new Point(100, 100, 10, "red");
  point2 = new Point(300, 300, 10, "blue");

  point1.draw(ctx);
  point2.draw(ctx);

  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;

  const radian1 = Math.atan(dy / dx);
  const radian2 = Math.atan2(dy, dx);

  const angle1 = (radian1 * 180) / Math.PI;
  const angle2 = (radian2 * 180) / Math.PI;

  console.log(angle1, angle2);
};

resize();
animate();

window.addEventListener("resize", resize);
