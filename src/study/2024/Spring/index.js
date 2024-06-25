import { Line } from "./Line.js";
import { Circle } from "./Circle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  isDown: false,
  x: 0,
  y: 0,
  offsetY: 0,
  dy: 0,
};
let line;
let circle;

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  line = new Line(0, innerHeight * 0.5, innerWidth);

  // circle
  const cx = innerWidth * 0.5;
  const cy = innerHeight * 0.5;

  circle = new Circle(cx, cy);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  line.update(ctx, mouse);
  line.draw(ctx);

  circle.update(line);
  circle.draw(ctx);

  requestAnimationFrame(animate);
};

resize();
animate();

const onDown = (event) => {
  mouse.isDown = true;
  mouse.offsetY = event.clientY;
};
const onMove = (event) => {
  if (mouse.isDown) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }
};
const onUp = () => {
  mouse.isDown = false;
};

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
