import { Line } from "./Line.js";
import { Circle } from "./Circle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let line = null;
const mouse = {
  isDown: false,
  x: 0,
  y: 0,
};
let circle = [];

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  const x1 = innerWidth * 0.1;
  const y1 = innerHeight * 0.7;

  const x2 = innerWidth * 0.9;
  const y2 = innerHeight * 0.7;

  line = new Line(x1, y1, x2, y2);

  for (let i = 0; i < 30; i++) {
    const radius = 30;
    const x =
      Math.random() * (innerWidth * 0.9 - radius - innerWidth * 0.1 + radius) +
      (innerWidth * 0.1 + radius);
    const y = -Math.random() * radius - radius;

    circle.push(new Circle(x, y, radius));
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  line.update(mouse);
  line.draw(ctx);

  circle.forEach((c) => {
    c.constraint();
    c.collision(circle);
    c.update(1);
    c.draw(ctx);
  });

  requestAnimationFrame(animate);
};

const onDown = (event) => {
  mouse.isDown = true;

  mouse.x = event.clientX;
  mouse.y = event.clientY;

  line.isGrab = false;
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
