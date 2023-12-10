import { Line } from "./line.js";
import { Snow } from "./snow.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let line;
const snow = [];

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  line = new Line(300, 400);

  for (let i = 0; i < 100; i++) {
    const x = Math.random() * innerWidth;
    const y = 100;
    snow.push(new Snow(x, y));
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  line.draw(ctx);

  snow.forEach((s) => {
    s.update(line.newPoint);
    s.draw(ctx);
  });

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
