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
  point2 = new Point(300, 350, 10, "blue");

  point1.draw(ctx);
  point2.draw(ctx);

  // atan를 이용한 각도 계산
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  const radian = Math.atan2(dy, dx);
  const angle = (radian * 180) / Math.PI;
  console.log(angle);

  // 내적
  const dot = point1.x * point2.x + point1.y * point2.y;

  // const p1 = Math.sqrt(Math.pow(point1.x, 2) + Math.pow(point1.y, 2));
  const p1 = Math.sqrt(point1.x * point1.x + point1.y * point1.y);
  // const p2 = Math.sqrt(Math.pow(point2.x, 2) + Math.pow(point2.y, 2));
  const p2 = Math.sqrt(point2.x * point2.x + point2.y * point2.y);

  // 내적을 이용한 두 벡터의 각도 계산
  const radian2 = Math.acos(dot / (p1 * p2));
  const angle2 = (radian2 * 180) / Math.PI;
  console.log(angle2);
};

resize();
animate();

window.addEventListener("resize", resize);
