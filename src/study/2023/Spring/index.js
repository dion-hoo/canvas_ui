import { Line } from "./line.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let line;
const mouse = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
  isDown: false,
  isMove: false,
};

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  line = new Line(innerWidth / 2, innerHeight * 0.4);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  line.update(mouse);
  line.draw(ctx);

  requestAnimationFrame(animate);
};

resize();
animate();

const onDown = (event) => {
  mouse.isDown = true;

  mouse.startX = event.clientX;
  mouse.startY = event.clientY;
};
const onMove = (event) => {
  if (mouse.isDown) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    mouse.isMove = true;
  }
};
const onUp = () => {
  mouse.isDown = false;
  mouse.isMove = false;

  line.dragging = false;
  line.isGrab = false;
};

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
