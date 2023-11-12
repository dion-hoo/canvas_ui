import { Snow } from "./Snow.js";
import { Circle } from "./circle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const globe = document.querySelector(".globe");
let snow = [];
let circle;

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  const circleWidth = innerWidth * (15 / 100);

  circle = new Circle(innerWidth / 2, innerHeight / 2, circleWidth);

  snow = [];
  const { top, left, width } = globe.getBoundingClientRect();
  for (let i = 0; i < 20; i++) {
    const radius = 10;
    const x = Math.random() * (width - radius * 2) + (left + radius);
    const y = top + Math.random() * 150 + radius;
    const point = {
      x,
      y,
    };

    snow.push(new Snow(x, y, radius));
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circle.draw(ctx);

  snow.forEach((s) => {
    s.update(circle.line);
    s.draw(ctx);
  });

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
