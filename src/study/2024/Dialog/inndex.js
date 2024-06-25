import { Point } from "./Point.js";
import { Dialog } from "./Dialog.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let mousePos = null;
let curItem = null;
let items = [];

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 3;
  ctx.shadowBlur = 6;
  ctx.shadowColor = `rgba(0, 0, 0, 0.1)`;
  ctx.lineWidth = 2;

  mousePos = new Point();

  for (let i = 0; i < 1; i++) {
    items.push(new Dialog());
  }

  items.forEach((d) => {
    d.resize(innerWidth, innerHeight);
  });
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  items.forEach((d) => {
    d.animate(ctx);
  });

  requestAnimationFrame(animate);
};

resize();
animate();

const onDown = (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;

  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i].down(mousePos.clone());

    if (item) {
      curItem = item;

      const index = items.indexOf(item);
      const targetRemoved = items.splice(index, 1);

      items.push(targetRemoved[0]);

      break;
    }
  }
};
const onMove = (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;

  for (let i = 0; i < items.length; i++) {
    items[i].move(mousePos.clone());
  }
};
const onUp = (e) => {
  curItem = null;

  for (let i = 0; i < items.length; i++) {
    items[i].up();
  }
};

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
