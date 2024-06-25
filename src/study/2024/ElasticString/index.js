import { Point } from "./Point.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  isDown: false,
  x: 0,
  y: 0,
};
let point = [];

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  point = [];

  const Phrases = "Interactive Developer Dion";
  const arr = Phrases.split("");

  const radius = 18;
  const fontSize = 32;
  const letterSpacing = fontSize / 6;
  const totalWidth = arr.length * (fontSize + letterSpacing);

  ctx.font = `${fontSize}px Georgia`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let currentX = (innerWidth - totalWidth) / 2;
  for (let i = 0; i < arr.length; i++) {
    const font = arr[i];

    const metrics = ctx.measureText(font);
    const actualHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const x = currentX + i * (fontSize + letterSpacing);
    const y = -actualHeight;

    point.push(new Point(i, font, x, y, radius));
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  point.forEach((p) => {
    p.display();
    p.update(point, mouse);
    p.draw(ctx);
  });

  requestAnimationFrame(animate);
};

resize();
animate();

const onMove = (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
};

window.addEventListener("pointermove", onMove);
window.addEventListener("resize", resize);
