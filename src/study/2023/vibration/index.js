import { Oscillator } from "./Oscillator.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let oscillator;

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  oscillator = new Oscillator();
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  oscillator.update();
  oscillator.draw(ctx);

  // requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
