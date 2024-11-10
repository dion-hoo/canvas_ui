import { Text } from "./Text.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let text1 = null;
let text2 = null;
let text3 = null;
let text4 = null;
let text5 = null;

let centerX = innerWidth * 0.5;
let centerY = innerHeight * 0.5;
let lineWidth = 1;
let isClick = false;
let isScaleDown = false;

// true
let isOne = true;

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  text1 = new Text(centerX * 0.75, centerY, "d");
  text2 = new Text(centerX * 0.9, centerY, "i");
  text3 = new Text(centerX + centerX * 0.05, centerY + centerY * 0.03, "o");
  text4 = new Text(centerX + centerX * 0.3, centerY + centerY * 0.03, "n");

  text5 = new Text(centerX, centerY, "b");
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isScaleDown) {
    if (isClick) {
      if (1 < lineWidth) {
        lineWidth -= 0.1;
      } else {
        lineWidth = 1;
      }
    }
  } else {
    if (isClick) {
      if (lineWidth < 45) {
        lineWidth += 0.1;
      } else {
        lineWidth = 45;
      }
    }
  }

  if (isOne) {
    ctx.save();
    ctx.scale(3, 3);

    // 스케일 조정으로 이동된 좌표를 보정
    ctx.translate(-centerX / 1.5, -centerY / 1.5);

    text5.draw(ctx, lineWidth);
  } else {
    text1.draw(ctx, lineWidth);
    text2.draw(ctx, lineWidth);
    text3.draw(ctx, lineWidth);
    text4.draw(ctx, lineWidth);
  }

  ctx.restore();

  requestAnimationFrame(animate);
};

const onClick = () => {
  isClick = true;
  isScaleDown = false;
};

const onKeyDown = (event) => {
  if (event.key) {
    isScaleDown = true;
  }
};

const onKeyUp = () => {
  // isScaleDown = false;
};

resize();
animate();

window.addEventListener("click", onClick);
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.addEventListener("resize", resize);
