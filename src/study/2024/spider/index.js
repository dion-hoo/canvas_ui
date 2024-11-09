import { Point } from "./Point.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  x: 0,
  y: 0,
  isDown: false,
};
let point = [];

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  point = [];

  const length = 10;

  for (let i = 0; i < length; i++) {
    const radius = 4;
    const x = innerWidth * 0.5;
    const y = innerHeight * 0.2 + radius * 20 * (i + 1);
    const isLock = i === 0 || i === length - 1;

    point.push(new Point(i, x, y, radius, isLock));
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  point.forEach((p) => {
    p.update(1);
    p.updatePosition(mouse);
    p.edge();
    p.constraints(ctx, point);
    p.draw(ctx);
  });

  requestAnimationFrame(animate);
};

const onDown = () => {
  mouse.isDown = true;
};
const onMove = (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
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
