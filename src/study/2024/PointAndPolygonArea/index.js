import { Point } from "./Point.js";
import { Triangle } from "./Triangle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let point = [];
let triangle = null;
const mouse = {
  x: 0,
  y: 0,
  isClick: false,
};

let lastTime = 0;
let fpsTime = 1000 / 60;
let deltaTime = 1;

const resize = () => {
  const ratio = 1; // ;devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  point = [];
  triangle = null;

  triangle = new Triangle(innerWidth * 0.5, innerHeight * 0.5, 450, 3, 300);

  for (let i = 0; i < 10; i++) {
    const radius = 60;
    const x =
      Math.random() * innerWidth * 0.1 - innerWidth * 0.05 + innerWidth * 0.5;
    const y = i === 0 ? 100 : point[i - 1].y - radius * 2;

    point.push(new Point(i, x, y, radius));
  }
};

const onVisibilityChange = () => {
  if (document.visibilityState === "visible") {
    lastTime = performance.now();
  }
};

const animate = (timeStamp) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!lastTime) {
    lastTime = timeStamp;
  }

  const elapsed = timeStamp - lastTime;
  lastTime = timeStamp;

  deltaTime = elapsed / fpsTime;

  triangle.draw(ctx);

  point.forEach((p) => {
    p.update(1, deltaTime);
    p.prison(triangle, mouse);
    p.boundary(triangle, point);
    p.constraints(point);
    p.windowBounce();
    p.draw(ctx);
  });

  requestAnimationFrame(animate);
};

const onMove = (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
};

const onClick = () => {
  mouse.isClick = true;
};

resize();
requestAnimationFrame(animate);

window.addEventListener("click", onClick);
window.addEventListener("pointermove", onMove);
window.addEventListener("resize", resize);
document.addEventListener("visibilitychange", onVisibilityChange);
