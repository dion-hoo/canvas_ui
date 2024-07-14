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
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  point = [];
};

let hsl = 0;
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mouse.isDown) {
    for (let i = 0; i < 70; i++) {
      const radius = 2;
      const x = mouse.x + Math.random() * 5 - 2.5;
      const y = mouse.y + Math.random() * 5 - 2.5;

      point.push(new Point(x, y, radius, hsl));
    }
  }

  point.forEach((p) => {
    p.update();
    p.draw(ctx);

    if (p.isEnd) {
      const index = point.indexOf(p);

      point.splice(index, 1);
    }
  });

  hsl += 2;

  requestAnimationFrame(animate);
};

const onDown = (event) => {
  mouse.isDown = true;

  mouse.x = event.clientX;
  mouse.y = event.clientY;
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
