import { Swing } from "./swing.js";
import { Moon } from "./moon.js";
import { Tree } from "./tree.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  x: 0,
  y: 0,
  isDown: false,
};
let swing = null;
let moon = null;
let tree = null;

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  

  ctx.scale(ratio, ratio);

  const x = innerWidth * 0.5;
  const y = innerHeight * 0.05;
  const width = 140;
  const length = innerHeight * 0.7;
  const angle = 50;

  swing = new Swing(x, y, width, length, angle);
  moon = new Moon(innerWidth * 0.34, innerHeight * 0.19, innerWidth * 0.06);
  tree = new Tree(innerWidth * 0.7, innerHeight, 3);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moon.draw(ctx);
  tree.draw(ctx);

  if (!mouse.isDown) {
    swing.updateAngle();
  }
  swing.draw(ctx, mouse);

  requestAnimationFrame(animate);
};

const onDown = (event) => {
  mouse.isDown = true;

  swing.angleVel = 0;

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
