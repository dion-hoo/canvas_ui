import { Snow } from "./Snow.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let snow = [];

const line = [
  { x: 0, y: innerHeight / 1.1 },
  { x: innerWidth, y: innerHeight / 1.52 },
  { x: innerWidth, y: innerHeight / 1.5 },
  { x: 0, y: innerHeight / 1 },
];

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  for (let i = 0; i < 1; i++) {
    const radius = Math.random() * 5 + 5;
    const x = Math.random() * innerWidth;
    const y = Math.random() * 100;

    snow.push(new Snow(x, y, radius));
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "pink";
  ctx.beginPath();
  ctx.moveTo(line[0].x, line[0].y);
  ctx.lineTo(line[1].x, line[1].y);
  //   ctx.lineTo(line[2].x, line[2].y);
  //   ctx.lineTo(line[3].x, line[3].y);
  ctx.stroke();
  ctx.closePath();

  snow.forEach((s) => {
    s.update(line);
    s.draw(ctx);
  });

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
