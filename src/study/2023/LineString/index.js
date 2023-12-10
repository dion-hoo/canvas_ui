import { BounceString } from "./BounceString.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let bounceString = [];
let moveX = -5000;
let moveY = -5000;
let isDown = false;

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  bounceString.push(
    new BounceString(
      {
        x1: 0,
        y1: innerHeight * 0.7,
        x2: innerWidth,
        y2: innerHeight * 0.7,
      },
      `rgba(255, 255, 255, 1)`
    )
  );
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < bounceString.length; i++) {
    const strings = bounceString[i];

    strings.animate(ctx, moveX, moveY);
  }

  requestAnimationFrame(animate);
};

resize();
animate();

const onDown = (event) => {
  isDown = true;

  moveX = event.clientX;
  moveY = event.clientY;
};
const onMove = (event) => {
  if (isDown) {
    moveX = event.clientX;
    moveY = event.clientY;
  }
};
const onUp = () => {
  isDown = false;

  moveX = -5000;
  moveY = -5000;
};

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
