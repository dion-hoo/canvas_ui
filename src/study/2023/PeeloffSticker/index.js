import { Sticker } from "./sticker.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let sticker;
let isDown = false;
let moveX = 0;
let moveY = 0;

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  const x = innerWidth * 0.5 - 200;
  const y = innerHeight * 0.5 - 100;

  sticker = new Sticker(x, y);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sticker.draw(ctx);
  sticker.update(ctx, moveX, moveY);

  requestAnimationFrame(animate);
};

resize();
animate();

const onDown = (event) => {
  isDown = true;

  moveX = event.clientX;
  moveY = event.clientY;
};
const onMove = (event) => {
  if (isDown) {
    moveX = event.clientX;
    moveY = event.clientY;
  }
};
const onUp = () => {
  isDown = false;

  moveX = 0;
  moveY = 0;
};

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
