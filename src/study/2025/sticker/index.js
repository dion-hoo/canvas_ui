import { Sticker } from "./sticker.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  x: 0,
  y: 0,
  isDown: false,
};
let sticker = null;

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  const width = 500;
  const height = 300;
  const x = innerWidth / 2 - width / 2;
  const y = innerHeight / 2 - height / 2;

  sticker = new Sticker(x, y, width, height);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sticker.update(mouse);
  sticker.draw(ctx);

  requestAnimationFrame(animate);
};

const onDown = (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  mouse.isDown = true;
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

resize();
animate();

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
