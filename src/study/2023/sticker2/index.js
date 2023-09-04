import { Dot } from "./Dot.js";

const canvas = document.querySelector("canvas");
const banner = document.querySelector(".banner");
const ctx = canvas.getContext("2d");
let dot = null;

const frontImage = new Image();
const backImage = new Image();

frontImage.src = "/src/assets/img/kakao.jpg";
backImage.src = "/src/assets/img/kakao_dark.jpg";

const mouse = {
  isDown: false,
  offsetX: 0,
  offsetY: 0,
  moveX: 0,
  moveY: 0,
};

const resize = () => {
  const width = banner.clientWidth;
  const height = banner.clientHeight;
  const cetnerX = innerWidth / 2 - width / 2;
  const centerY = innerHeight / 2 - height / 2;

  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  dot = new Dot(cetnerX, centerY, width, height, frontImage, backImage);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  mouse.moveX *= 0.5;
  mouse.moveY *= 0.5;

  // 아래로 내렸을 경우에만 왼쪽으로 천천히 밀기
  if (mouse.moveX === 0) {
    mouse.moveX = -0.2;
  }

  const end = dot.draw(ctx, mouse.moveX, mouse.moveY);

  if (end) return;

  requestAnimationFrame(animate);
};

const onDown = (event) => {
  mouse.isDown = true;

  mouse.offsetX = event.clientX;
  mouse.offsetY = event.clientY;
};

const onMove = (event) => {
  if (mouse.isDown) {
    mouse.moveX = event.clientX - mouse.offsetX;
    mouse.moveY = event.clientY - mouse.offsetY;

    mouse.offsetX = event.clientX;
    mouse.offsetY = event.clientY;
  }
};

const onUp = () => {
  mouse.isDown = false;
};

resize();
animate();

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);

window.addEventListener("resize", resize);
