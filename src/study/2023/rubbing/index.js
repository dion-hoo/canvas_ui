import { Rect } from "./rect.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  isDown: false,
  moveX: 0,
  moveY: 0,
};
let rect = null;

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  rect = new Rect(0, 0, innerWidth, innerHeight);

  ctx.scale(ratio, ratio);
};

const eraser = () => {
  ctx.fillStyle = "#fff";

  ctx.beginPath();
  ctx.arc(mouse.moveX, mouse.moveY, 30, 0, Math.PI * 2);
  ctx.fill();
};

const animate = () => {
  rect.draw(ctx);
};

resize();
animate();

const onDown = () => {
  mouse.isDown = true;
};
const onMove = (event) => {
  if (mouse.isDown) {
    mouse.moveX = event.clientX;
    mouse.moveY = event.clientY;

    ctx.globalCompositeOperation = "destination-out";

    eraser();
  }
};
const onUp = () => {
  mouse.isDown = false;
};

canvas.addEventListener("pointerdown", onDown);
canvas.addEventListener("pointermove", onMove);
canvas.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
