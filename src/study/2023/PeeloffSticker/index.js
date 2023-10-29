import { Cover } from "./Cover.js";
import { Front } from "./Front.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  isDown: false,
  moveX: 0,
  moveY: 0,
};

let cover, front;

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  const width = 400;
  const height = 220;
  const x = window.innerWidth * 0.5 - width / 2;
  const y = window.innerHeight * 0.5 - height / 2;

  const point = [
    { x: x, y: y },
    { x: x + width, y: y },
    { x: x + width, y: y + height },
    { x: x, y: y + height },
  ];

  cover = new Cover(point);
  front = new Front(point);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cover.draw(ctx);
  front.draw(ctx);

  if (mouse.isDown) {
    front.update(mouse, ctx);
  }

  requestAnimationFrame(animate);
};

const onDown = () => {
  mouse.isDown = true;
};
const onMove = (event) => {
  if (mouse.isDown) {
    mouse.moveX = event.clientX;
    mouse.moveY = event.clientY;
  }
};
const onUp = () => {
  mouse.isDown = false;
};

resize();
animate();

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
