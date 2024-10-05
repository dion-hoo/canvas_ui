import { Vector } from "./Vector.js";
import { Point } from "./Point.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
let vertices = [];
let point = [];
const mouse = {
  isDown: false,
  isUp: false,
  offsetY: 0,
  y: 0,
};

let iamgeData = null;
let pixels = null;
const updateBackground = () => {
  ctx.putImageData(iamgeData, 0, 0);
};

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  vertices = [];
  point = [];

  iamgeData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  pixels = iamgeData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = 0; // Red
    pixels[i + 1] = 0; // Green
    pixels[i + 2] = 0; // Blue
    pixels[i + 3] = 255; // Alpha (불투명)
  }

  const startX = innerWidth * 0.1;
  const endX = innerWidth * 0.9;
  const count = 60;
  const interval = (endX - startX) / (count - 1);
  const size = (endX - startX) / count / 2;

  for (let i = 0; i < count; i++) {
    const x = startX + i * interval;
    const y = innerHeight * 0.6;

    const isFixed = i === 0 || i === count - 1 ? true : false;

    vertices.push(new Vector(isFixed, x, y, size));
  }

  for (let i = 0; i < 5; i++) {
    let x = Math.random() * (endX - startX) + startX;
    let y = -Math.random() * 300;
    const radius = size * 1.3;

    point.push(new Point(i, x, y, radius));

    // let isOverLaping = false;

    //   for (let j = 0; j < point.length; j++) {
    //     const p = point[j];
    //     const dx = p.x - x;
    //     const dy = p.y - y;
    //     const dist = Math.sqrt(dx * dx + dy * dy);

    //     if (dist < radius + p.radius) {
    //       isOverLaping = true;

    //       break;
    //     }
    //   }

    //   if (isOverLaping) {
    //     i--;

    //     continue;
    //   }

    //   if (!isOverLaping) {
    //     point.push(new Point(i, x, y, radius));
    //   }
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // updateBackground();

  vertices.forEach((v) => {
    v.constraints();
    v.update(1);
    v.move(mouse);
    v.draw(ctx);
    v.restricts(ctx, vertices);
  });

  point.forEach((p) => {
    p.lineCollsion(vertices);
    p.constraints();
    // p.collision(point);
    p.move(mouse);
    p.update(1);
    p.draw(ctx);
  });

  requestAnimationFrame(animate);
};

resize();
animate();

const onDown = (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  mouse.isDown = true;

  mouse.offsetX = event.clientX;
  mouse.offsetY = event.clientY;
};

const onMove = (event) => {
  if (mouse.isDown) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    const y = mouse.y - mouse.offsetY;

    mouse.isUp = y < 0;
  }
};

const onUp = () => {
  mouse.isDown = false;
};

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
