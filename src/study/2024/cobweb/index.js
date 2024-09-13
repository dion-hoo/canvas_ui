import { Cobweb } from "./cobweb.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let cobweb = null;
const mouse = {
  x: 0,
  y: 0,
  isDown: false,
};

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  const x = innerWidth * 0.5;
  const y = innerHeight * 0.5;
  const size = 300;
  const side = 7;
  const curveRadius = 70;
  const lineWidth = 1;
  const gap = 50;

  cobweb = new Cobweb(x, y, side, size, gap, curveRadius, lineWidth);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cobweb.draw(ctx, mouse);

  //  requestAnimationFrame(animate);
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
