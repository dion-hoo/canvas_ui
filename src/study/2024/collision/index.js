import { Point } from "./Point.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let overlap = [];
let reflection = [];
let constraints = [];
let conservationEnergy = [];

const makePoint = (arr, x) => {
  for (let i = 0; i < 2; i++) {
    const radius = Math.min(innerWidth * 0.03, 50);
    const y = i === 0 ? innerHeight - radius : innerHeight - radius * 13;
    const speedY = i === 0 ? 0 : 1;
    const color = i === 0 ? "rgba(255, 255, 255, 0.2)" : "#fff";

    arr.push(new Point(x, y, radius, speedY, color));
  }
};

const resize = () => {
  const ratio = 1; // devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  overlap = [];
  reflection = [];
  constraints = [];
  conservationEnergy = [];

  makePoint(overlap, innerWidth * 0.13);
  makePoint(reflection, innerWidth * 0.38);
  makePoint(constraints, innerWidth * 0.62);
  makePoint(conservationEnergy, innerWidth * 0.87);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  overlap.forEach((p) => {
    p.update(1);
    p.overlap(overlap);
    p.windowBounce();
    p.draw(ctx);
  });

  reflection.forEach((p) => {
    p.update(1);
    p.reflection(reflection);
    p.windowBounce();
    p.draw(ctx);
  });

  constraints.forEach((p) => {
    p.update(1);
    p.constraints(constraints);
    p.windowBounce();
    p.draw(ctx);
  });

  conservationEnergy.forEach((p) => {
    p.update(1);
    p.windowBounce();
    p.draw(ctx);
  });

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
