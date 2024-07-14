import { Point } from "./Point.js";
import { Spring } from "./Spring.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  isDown: false,
  x: 0,
  y: 0,
};

const rectangle = [];
const springList = [];
const gravity = {
  x: 0.0,
  y: 0.0,
};

const resize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  const radius = 10;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const x = innerWidth / 2 + radius * 2 * j;
      const y = innerHeight / 2 + radius * 2 * i;

      rectangle.push(new Point(x, y, radius, i * 30));

      if (j === 0) {
        continue;
      }

      const a = 4 * i + j;
      const b = 4 * i + (j - 1);

      springList.push(new Spring(20, rectangle[b], rectangle[a]));
    }
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (j === 0) {
        continue;
      }

      const a = i + 4 * j;
      const b = i + 4 * (j - 1);

      springList.push(new Spring(20, rectangle[b], rectangle[a]));
    }
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < rectangle.length; i++) {
    const rect = rectangle[i];

    rect.mouseUpdate(mouse);
    rect.update(gravity);
    rect.collision(rectangle);
    rect.draw(ctx);
  }

  for (let i = 0; i < springList.length; i++) {
    const spring = springList[i];

    spring.update(ctx);
  }

  requestAnimationFrame(animate);
};

resize();
animate();

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

  for (let r of rectangle) {
    if (r.isClick) {
      r.isClick = false;
    }
  }
};

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
