import { Letter } from "./letter.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let letter;
let moveX = 0;
let moveY = 0;
let isDown = false;
let delayTime = 110;
let delayTime2 = 100;
let currentTime = 0;
let time = 0;
let scale = 0;
let scaleVelocity = 0;
let ratio;
let isMax = false;

const resize = () => {
  ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  letter = new Letter(innerWidth * 0.5, innerHeight * 0.5);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!letter.isEnd) {
    letter.fill();
    letter.drawText(ctx);
  } else {
    if (!currentTime) {
      currentTime = time;
    }
    const now = time - currentTime;
    let maxScale = ratio + scale;

    ctx.save();

    ctx.translate(innerWidth / 2, innerHeight / 2);
    ctx.scale(maxScale, maxScale);
    ctx.translate(-innerWidth / 2, -innerHeight / 2);

    if (now > delayTime2) {
      if (maxScale <= 20 && !isMax) {
        scaleVelocity += 0.005;
        scale += scaleVelocity;
      } else {
        isMax = true;
        scale -= 0.1;

        if (scale < 1) {
          scale = 0;
        }
      }
    }

    if (now > delayTime) {
      ctx.globalAlpha = Math.abs(1 - time / delayTime);

      letter.stringText(ctx, moveX, moveY);
    } else {
      letter.drawText(ctx);
    }

    time++;

    ctx.restore();
  }

  requestAnimationFrame(animate);
};

resize();
animate();

const onDown = (event) => {
  isDown = true;

  moveX = 0;
  moveY = 0;

  moveX = event.clientX;
  moveY = event.clientY;
};

const onMove = (event) => {
  if (isDown) {
    moveX = event.clientX;
    moveY = event.clientY;
  }
};

const onup = () => {
  isDown = false;
};

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onup);
window.addEventListener("resize", resize);
