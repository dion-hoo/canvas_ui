import { Point } from "./Point.js";
import { Triangle } from "./Triangle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let point = null;
let triangle = null;
const mouse = {
  x: 0,
  y: 0,
};

const resize = () => {
  const ratio = 1; // ;devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  point = null;
  triangle = null;

  triangle = new Triangle(innerWidth * 0.5, innerHeight * 0.5, 3, 300);
  point = new Point(innerWidth * 0.5, innerHeight * 0.5, 100);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  triangle.draw(ctx);

  if (mouse.x !== 0 && mouse.y !== 0) {
    point.update(mouse);
  }

  point.check(triangle);
  point.draw(ctx);

  requestAnimationFrame(animate);
};

const onMove = (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
};

resize();
animate();

window.addEventListener("pointermove", onMove);
window.addEventListener("resize", resize);
