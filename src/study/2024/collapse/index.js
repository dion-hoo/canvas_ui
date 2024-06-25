import { Circle } from "./circle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let circles = [];

const fps = 16;
const fpsTime = 1000 / fps;
let time = 0;

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  circles = [];

  for (let i = 0; i < 30; i++) {
    const radius = Math.random() * 50 + 50;
    const x = Math.random() * (innerWidth - radius * 2) + radius;
    const y = Math.random() * (innerHeight - radius * 2) + radius;

    circles.push(new Circle(x, y, radius));

    for (let j = 0; j < i; j++) {
      if (i === j) {
        continue;
      }
      const dx = x - circles[j].x;
      const dy = y - circles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius + circles[j].radius) {
        circles.pop();

        i--;
      }
    }
  }
};

const animate = (timeStamp) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!time) {
    time = timeStamp;
  }

  const now = timeStamp - time;
  if (now > fpsTime) {
    time = timeStamp;
  }

  circles.forEach((c) => {
    c.collision(circles);
    c.update();
    c.draw(ctx);
  });

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
