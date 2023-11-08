import { Wifi } from "./wifi.js";
import { Apeture } from "./Apeture.js";
import { Arrow } from "./Arrow.js";
import { Video } from "./Video.js";
import { Quality } from "./Quality.js";
import { Charger } from "./Charger.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const wrap = document.querySelector(".wrap");
const time = document.querySelector(".time");
const video = document.querySelector("video");
const fov = document.querySelector(".fov");

video.volume = 0.5;

let isDown = false;
let moveX = 0;
let moveY = 0;
let x = 0;
let y = 0;
let offsetX = 0;
let offsetY = 0;
let wifi;
let apeture;
let timestamp = 0;
let increment = true;
let arrow;
let videoIns;
let isClick = false;
let quality;
let charger;

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  const x = innerWidth * 0.77;
  const y = 220;

  wifi = new Wifi(x, y);
  apeture = new Apeture(window.innerWidth * 0.5, innerHeight * 0.81);
  arrow = new Arrow(window.innerWidth * 0.5, innerHeight * 0.77);
  videoIns = new Video(video);
  quality = new Quality(window.innerWidth * 0.178, innerHeight * 0.151);
  charger = new Charger(innerWidth * 0.64, 173);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const date = new Date();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const second =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  time.innerHTML = `00:${hour}:${minute}:${second}`;

  const blur = apeture.blur * 0.01;

  ctx.save();
  ctx.filter = `blur(${blur}px)`;
  wrap.style.filter = `blur(${blur}px)`;

  videoIns.draw(ctx);

  // quality
  quality.draw(ctx);

  moveY *= 0.96;

  // charger
  charger.draw(ctx, moveY, x, y);

  // wifi
  wifi.draw(ctx, timestamp);

  ctx.restore();

  // line
  // arrow
  arrow.draw(ctx);

  moveX *= 0.98;
  apeture.draw(ctx, moveX, y);

  if (timestamp * 0.5 === 95) {
    increment = false;
  } else if (timestamp * 0.5 === 0) {
    increment = true;
  }

  increment ? timestamp++ : timestamp--;

  requestAnimationFrame(animate);
};

resize();
animate();

const onDown = (event) => {
  isDown = true;
  moveX = 0;
  moveY = 0;
  x = 0;
  y = 0;
  offsetX = event.clientX;
  offsetY = event.clientY;

  if (!isClick) {
    video.currentTime = 0; // 108;
    video.play();

    isClick = true;
  }
};
const onMove = (event) => {
  if (isDown) {
    moveX = event.clientX - offsetX;
    moveY = event.clientY - offsetY;

    x = event.clientX;
    y = event.clientY;

    offsetX = event.clientX;
    offsetY = event.clientY;
  }

  const { left, top } = fov.getBoundingClientRect();
};
const onUp = () => {
  isDown = false;
};

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
