import { Point } from "./Point.js";
import { Text } from "./Text.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let point1 = [];
let point2 = [];
let text = null;
const mouse = {
  x: 0,
  y: 0,
  isDown: false,
};

const init = () => {
  WebFont.load({
    google: {
      families: ["Hind:700"],
    },
    fontactive: () => {
      resize();
      animate();
    },
  });
};

const resize = () => {
  const ratio = 1; // devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  point1 = [];
  point2 = [];
  text = null;

  const length = 60;
  const GAP = 940 / length;
  const startX1 = innerWidth * 0.282 - (GAP * (length - 1)) / 2;
  const startY1 = 200;

  const startX2 = innerWidth * 0.695 - (GAP * (length - 1)) / 2;
  const startY2 = 200;

  const x = innerWidth * 0.5;
  const y = innerHeight * 0.45;
  text = new Text(x, y);

  createCurtain(point1, startX1, startY1, GAP, length, "#111");
  createCurtain(point2, startX2, startY2, GAP, length, "#111");
};

const createCurtain = (point, startX, startY, GAP, length, color) => {
  for (let h = 0; h < length; h++) {
    let isLocked = false;

    for (let w = 0; w < length; w++) {
      const x = startX + w * GAP;
      const y = startY + h * GAP;
      const radius = 3;

      if (h === 0) {
        isLocked = true;
      } else {
        isLocked = false;
      }

      point.push(new Point(x, y, radius, GAP, length, isLocked, color));
    }
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  text.draw(ctx);

  point2.forEach((p, index) => {
    p.constraints();
    p.restrict(ctx, index, point2);
    p.move(mouse);
    p.update(1);
  });

  point1.forEach((p, index) => {
    p.constraints();
    p.restrict(ctx, index, point1);
    p.move(mouse);
    p.update(1);
  });

  requestAnimationFrame(animate);
};

init();
resize();
animate();

const onDown = (event) => {
  mouse.isDown = true;

  mouse.x = event.clientX;
  mouse.y = event.clientY;
};
const onMove = (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
};
const onup = () => {
  mouse.isDown = false;
};

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onup);
window.addEventListener("resize", resize);
