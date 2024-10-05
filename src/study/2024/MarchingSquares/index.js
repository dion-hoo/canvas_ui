import { Circle } from "./circle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let circle = [];
let length = 60;
let cols = [],
  rows = [],
  size = 10;
let grid = [];

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  for (let i = 0; i < length; i++) {
    const radius = 40;
    const x = Math.random() * (innerWidth - radius * 2) + radius;
    const y = Math.random() * (innerHeight - radius * 2) + radius;

    circle.push(new Circle(x, y, radius));
  }

  cols = innerWidth / size;
  rows = innerHeight / size;

  for (let i = 0; i < cols; i++) {
    grid[i] = [];

    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
};

const lerp = (p1, p2, d1) => {
  return (1 - d1) * p1 + d1 * p2;
};

let hsl = 0;
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * size;
      const y = j * size;

      let val = 0;
      for (let k = 0; k < length; k++) {
        const c = circle[k];

        const px = x - c.x;
        const py = y - c.y;

        val += Math.pow(c.radius, 2) / (Math.pow(px, 2) + Math.pow(py, 2));

        grid[i][j] = val;
      }
    }
  }

  circle.forEach((c) => {
    c.update(1);
    c.draw(ctx);
  });

  for (let i = 0; i < cols - 1; i++) {
    for (let j = 0; j < rows - 1; j++) {
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;

      let f_a = grid[i][j];
      let f_b = grid[i + 1][j];
      let f_c = grid[i + 1][j + 1];
      let f_d = grid[i][j + 1];

      a = setBinaryNumber(f_a);
      b = setBinaryNumber(f_b);
      c = setBinaryNumber(f_c);
      d = setBinaryNumber(f_d);

      let config = 8 * a + 4 * b + 2 * c + d;

      let t = (1 - f_a) / (f_b - f_a);
      let pt1 = {
        x: lerp(i * size, i * size + size, t),
        y: j * size,
      };

      t = (1 - f_b) / (f_c - f_b);
      let pt2 = {
        x: i * size + size,
        y: lerp(j * size, j * size + size, t),
      };

      t = (1 - f_d) / (f_c - f_d);
      let pt3 = {
        x: lerp(i * size, i * size + size, t),
        y: j * size + size,
      };

      t = (1 - f_a) / (f_d - f_a);
      let pt4 = {
        x: i * size,
        y: lerp(j * size, j * size + size, t),
      };

      ctx.strokeStyle = "#555";
      ctx.beginPath();
      switch (config) {
        case 1:
          ctx.moveTo(pt3.x, pt3.y);
          ctx.lineTo(pt4.x, pt4.y);
          break;

        case 2:
          ctx.moveTo(pt2.x, pt2.y);
          ctx.lineTo(pt3.x, pt3.y);
          break;

        case 3:
          ctx.moveTo(pt4.x, pt4.y);
          ctx.lineTo(pt2.x, pt2.y);
          break;

        case 4:
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          break;

        case 5:
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt4.x, pt4.y);

          ctx.moveTo(pt2.x, pt2.y);
          ctx.lineTo(pt3.x, pt3.y);
          break;

        case 6:
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt3.x, pt3.y);
          break;

        case 7:
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt4.x, pt4.y);
          break;

        case 8:
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt4.x, pt4.y);
          break;

        case 9:
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt3.x, pt3.y);
          break;

        case 10:
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);

          ctx.moveTo(pt4.x, pt4.y);
          ctx.lineTo(pt3.x, pt3.y);
          break;

        case 11:
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          break;

        case 12:
          ctx.moveTo(pt4.x, pt4.y);
          ctx.lineTo(pt2.x, pt2.y);
          break;

        case 13:
          ctx.moveTo(pt3.x, pt3.y);
          ctx.lineTo(pt2.x, pt2.y);
          break;

        case 14:
          ctx.moveTo(pt3.x, pt3.y);
          ctx.lineTo(pt4.x, pt4.y);
          break;
      }

      ctx.stroke();
      ctx.closePath();
    }
  }

  requestAnimationFrame(animate);
};

const setBinaryNumber = (number) => {
  return number >= 1 ? 1 : 0;
};

resize();
animate();

window.addEventListener("resize", resize);
