import { Swing } from "./swing.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  x: 0,
  y: 0,
  isDown: false,
};
let swing = null;

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  const x = innerWidth * 0.5;
  const y = innerHeight * 0.15;
  const width = 200;
  const length = innerHeight * 0.6;
  const angle = 0;

  swing = new Swing(x, y, width, length, angle);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!mouse.isDown) {
    swing.update();
  }
  swing.draw(ctx, mouse);

  requestAnimationFrame(animate);
};

const onDown = (event) => {
  mouse.isDown = true;

  mouse.x = event.clientX;
  mouse.y = event.clientY;
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
