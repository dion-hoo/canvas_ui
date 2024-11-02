import { Point } from "./Point.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let overlap = [];
let reflection = [];
let constraints = [];
let conservationEnergy = [];

const makePoint = (minWidth, maxWidth, isEuler) => {
  const arr = [];

  for (let i = 0; i < 2; i++) {
    const radius = Math.min(innerWidth * 0.03, 50);

    const x = minWidth + (maxWidth - minWidth) / 2;
    const y =
      i === 1
        ? innerHeight - radius
        : Math.random() * (innerHeight * 0.6 - radius * 2) + radius;

    arr.push(new Point(i, x, y, radius, minWidth, maxWidth, isEuler));
  }

  return arr;
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

  overlap = makePoint(0, innerWidth * 0.25, false);
  reflection = makePoint(innerWidth * 0.25, innerWidth * 0.5, false);
  constraints = makePoint(innerWidth * 0.5, innerWidth * 0.75, false);
  conservationEnergy = makePoint(innerWidth * 0.75, innerWidth, true);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  overlap.forEach((p) => {
    p.update(1);
    p.overlap(overlap);
    p.edges();
    p.draw(ctx);
  });

  reflection.forEach((p) => {
    p.update(1);
    p.reflection(reflection);
    p.edges();
    p.draw(ctx);
  });

  constraints.forEach((p) => {
    p.update(1);
    p.constraints(constraints);
    p.edges();
    p.draw(ctx);
  });

  conservationEnergy.forEach((p) => {
    p.update(1);
    p.edges();
    p.conservationEnergy(conservationEnergy);
    p.draw(ctx);
  });

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
