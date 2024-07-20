import { Point } from "./Point.js";
import { Stick } from "./Stick.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  isDown: false,
  isDowned: false,
  x: 0,
  y: 0,
};

let degree = -45;
let currentStartIndex = 0;
let point = [];
let stick = [];

const size = 150;
const diagonal = Math.sqrt(size * size + size * size);

const resize = () => {
  const ratio = 1; // devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  degree = -45;
  currentStartIndex = 0;
  point = [];
  stick = [];
};

const animate = (timestamp) => {
  let dt = (timestamp && timestamp / 1000) ?? 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mouse.isDown && !mouse.isDowned) {
    // point
    const sides = 6;
    const angle = 360 / sides;

    for (let i = 0; i < sides; i++) {
      const radius = 10;
      const radian = (degree * Math.PI) / 180;

      const x = mouse.x + Math.cos(radian) * size;
      const y = mouse.y + Math.sin(radian) * size;

      point.push(new Point(x, y, radius));
      degree += angle;
    }

    const stickLength = currentStartIndex + sides;
    for (let i = currentStartIndex; i < stickLength; i++) {
      const currentIndex = i;
      const nextIndex = ((i + 1) % sides) + currentStartIndex;

      const p1 = point[currentIndex];
      const p2 = point[nextIndex];

      stick.push(new Stick(p1, p2, size));
    }

    // stick
    for (let i = currentStartIndex; i < currentStartIndex + sides / 2; i++) {
      const currentIndex = i;
      const diagIndex = i + 2;

      const p1 = point[currentIndex];
      const p2 = point[diagIndex];

      console.log(currentIndex, diagIndex);

      //   stick.push(new Stick(p1, p2, diagonal));
    }

    currentStartIndex += sides;
    mouse.isDowned = true;
  }

  stick.forEach((s) => {
    s.update();
    s.draw(ctx);
  });

  point.forEach((p) => {
    p.update(dt);
    p.draw(ctx);
  });

  requestAnimationFrame(animate);
};

const onDown = (event) => {
  mouse.isDown = true;
  mouse.x = event.clientX;
  mouse.y = event.clientY;
};
const onUp = () => {
  mouse.isDown = false;
  mouse.isDowned = false;

  mouse.x = 0;
  mouse.y = 0;
};

resize();
animate();

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
