import { Circle } from "./circle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let circle = null;

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  circle = new Circle(150, 500, 50);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circle.update();
  circle.draw(ctx);

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
