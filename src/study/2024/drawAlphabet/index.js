import { Text } from "./Text.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let text = null;

let centerX = innerWidth * 0.5;
let centerY = innerHeight * 0.5;

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  text = new Text(centerX, centerY, "b");
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.scale(3, 3);

  // 스케일 조정으로 이동된 좌표를 보정
  ctx.translate(-centerX / 1.5, -centerY / 1.5);

  text.draw(ctx);

  ctx.restore();

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
