import { Card } from "./Card.js";

const canvas = document.querySelector("canvas");
const wrap = document.querySelector(".wrap");
const ctx = canvas.getContext("2d");
let card = null;

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = wrap.clientWidth * ratio;
  canvas.height = wrap.clientHeight * ratio;

  canvas.style.width = `${wrap.clientWidth}px`;
  canvas.style.height = `${wrap.clientHeight}px`;

  card = new Card(0, 0, wrap.clientWidth, wrap.clientHeight);

  ctx.scale(ratio, ratio);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  card.draw(ctx);

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
