import { Line } from "./Line.js";
import { Point } from "./Point.js";
import { Obstacle } from "./Obstacle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let lines = [];
let points = [];
let obstacle = [];

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  lines = [];
  points = [];
  obstacle = [];

  const length = 7;
  const width = 30;
  const height = 250;
  const lineY = innerHeight - height;

  for (let i = 0; i < length + 1; i++) {
    let lineX = 0;
    if (i === 0) {
      lineX = 0;
    } else if (i === length) {
      lineX = innerWidth - width;
    } else {
      lineX = (innerWidth / length) * i;
    }

    lines.push(new Line(lineX, lineY, width, height));
  }

  const gapX = 130;
  const gapY = 300;
  for (let i = 100; i < innerWidth - 100; i += gapX) {
    for (let j = 200; j < lineY - 100; j += gapY) {
      obstacle.push(new Obstacle(i, j, 20));
    }
  }

  for (let i = 160; i < innerWidth - 100; i += gapX) {
    for (let j = 350; j < lineY - 100; j += gapY) {
      obstacle.push(new Obstacle(i, j, 20));
    }
  }

  const colors = ["#3052c2", "#d1423e", "#f6b960"];
  for (let i = 0; i < 40; i++) {
    const radius = 35;
    const color = colors[Math.floor(Math.random() * colors.length)];

    let x = Math.random() * innerWidth;
    let y = -Math.random() * (innerHeight * 0.5);
    let isOverlapping = false;

    for (let j = 0; j < i; j++) {
      const dx = x - points[j].x;
      const dy = y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius + radius) {
        isOverlapping = true;
        break;
      }
    }

    if (isOverlapping) {
      i--;
      continue;
    }

    points.push(new Point(x, y, radius, color, lineY));
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  lines.forEach((line) => {
    line.draw(ctx);
  });

  obstacle.forEach((o) => {
    o.draw(ctx);
  });

  points.forEach((p) => {
    p.update(1);
    p.lineConstraints(lines);
    p.collision(points, true);
    p.collision(obstacle, false, 1);
    p.constraints();
    p.draw(ctx);
  });

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
