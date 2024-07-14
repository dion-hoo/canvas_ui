import { Circle } from "./circle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let circles = [];
const mouse = {
  isDown: false,
  x: 0,
  y: 0,
};

const gravity = {
  x: 0,
  y: 0.17,
};

const resize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  circles = [];
};

let hsl = 0;
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mouse.isDown) {
    for (let i = 0; i < 1; i++) {
      const radius = 30;
      const x = mouse.x;
      const y = mouse.y;

      circles.push(new Circle(x, y, radius, hsl));
    }

    hsl += 1;
  }

  circles.forEach((c) => {
    c.collision(circles);
    c.applyForce(gravity);
    c.update();
    c.detectWindow();
    c.draw(ctx);
  });

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
