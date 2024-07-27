import { Line } from "./Line.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let line;

const resize = () => {
  const ratio = 1; // devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  const x = innerWidth * 0.5;
  const y = innerHeight;
  const size = 500;

  line = new Line(x, y, size);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  line.draw(ctx);

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
