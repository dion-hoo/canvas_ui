import { Text } from "./Text.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let text = null;

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  text = new Text(innerWidth * 0.5, innerHeight * 0.5, "t");
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.scale(2, 2);

  // 스케일 조정으로 이동된 좌표를 보정
  ctx.translate((-innerWidth * 0.5) / 2, (-innerHeight * 0.5) / 2);

  text.draw(ctx);

  ctx.restore();

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
