import { GroupSpring } from "./GroupSpring.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  isDown: false,
  x: 0,
  y: 0,
};
const restLength = 10;
const K = 0.14;

let groupSpring = [];

const resize = () => {
  const ratio = 1;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  groupSpring = [];

  let hsl = Math.random() * 80;

  canvas.style.background = `hsl(${hsl}, 60%, 45%)`;

  for (let i = 0; i < 50; i++) {
    const x = Math.random() * innerWidth;
    const y = -restLength * 2;
    const length = Math.random() * 10 + 5;

    groupSpring.push(new GroupSpring(x, y, length, K, restLength, hsl));
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let s of groupSpring) {
    s.draw(ctx, mouse);
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

  for (let s of groupSpring) {
    for (let p of s.points) {
      p.isClick = false;
    }
  }
};

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
