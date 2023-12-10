import { Circle } from "./circle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const globe = document.querySelector(".globe");

let circle;
let isClick = false;

let x = 0;
let y = 0;
let vy = 0.1;
let radius = 0;

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  const circleWidth = innerWidth * (15 / 100);
  circle = new Circle(innerWidth / 2, innerHeight / 2, circleWidth);

  const { top, left, width } = globe.getBoundingClientRect();
  radius = 20;
  x = Math.random() * (width - radius * 2) + (left + radius);
  y = top + radius * 2;
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  y += vy;

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  circle.draw(ctx);

  requestAnimationFrame(animate);
};

const onClick = () => {
  isClick = true;
};

resize();
animate();

window.addEventListener("resize", resize);
window.addEventListener("click", onClick);
