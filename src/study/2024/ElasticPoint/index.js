import { Point } from "./Point.js";
import { Stick } from "./Stick.js";
import { Wave } from "./wave.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const toss = document.querySelector(".toss");
const kakaopay = document.querySelector(".kakaopay");
const naver = document.querySelector(".naver");
const samsung = document.querySelector(".samsung");

const imageList = [
  { image: toss, size: 3, color: "#0064FF" },
  { image: kakaopay, size: 2, color: "#ffeb00" },
  { image: naver, size: 2, color: "#05D686" },
  { image: samsung, size: 2, color: "#2138df" },
];

const mouse = {
  isDown: false,
  isDowned: false,
  x: 0,
  y: 0,
};

let degree = 0;
let currentStartIndex = 0;
let startTime = 0;
let point = [];
let stick = [];
let wave = [];

const size = 100;
const diagonal = Math.sqrt(size * size + size * size);

const resize = () => {
  const ratio = 1; // devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  degree = 45;
  currentStartIndex = 0;
  startTime = 0;
  point = [];
  stick = [];
  wave = null;

  wave = new Wave(8, "#2138df");
};

const animate = (timestamp) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!startTime) {
    startTime = timestamp;
  }
  const elapsed = timestamp - startTime;

  if (mouse.isDown && !mouse.isDowned) {
    // point
    const sides = 4;
    const angle = 360 / sides;

    for (let i = 0; i < sides; i++) {
      const radius = 40;
      const radian = (degree * Math.PI) / 180;

      const x = mouse.x + Math.cos(radian) * size;
      const y = mouse.y + Math.sin(radian) * size;

      point.push(
        new Point(x, y, radius, imageList[i].image, imageList[i].size)
      );
      degree += angle;
    }

    // stick 테두리
    const stickLength = currentStartIndex + sides;
    for (let i = currentStartIndex; i < stickLength; i++) {
      const currentIndex = i;
      const nextIndex = ((i + 1) % sides) + currentStartIndex;

      const p1 = point[currentIndex];
      const p2 = point[nextIndex];

      stick.push(
        new Stick(p1, p2, size, imageList[i - currentStartIndex].color)
      );
    }

    // stick 대각선
    for (let i = currentStartIndex; i < currentStartIndex + sides / 2; i++) {
      const currentIndex = i;
      const diagIndex = i + 2;

      const p1 = point[currentIndex];
      const p2 = point[diagIndex];

      stick.push(new Stick(p1, p2, diagonal, "#fff"));
    }

    currentStartIndex += sides;
    mouse.isDowned = true;
  }

  if (elapsed > 6700) {
    wave.update();
    wave.updateColor(elapsed);
    wave.draw(ctx);
  }

  stick.forEach((s) => {
    s.update();
    s.draw(ctx);
  });

  point.forEach((p) => {
    p.update(1);
    p.checkCollision(point);
    if (wave.dots.length > 0) {
      p.checkHill(wave.dots);
    }
    p.draw(ctx);
  });

  requestAnimationFrame(animate);
};

const onDown = (event) => {
  mouse.isDown = true;
  mouse.x = event.clientX;
  mouse.y = event.clientY;
};
const onUp = () => {
  mouse.isDown = false;
  mouse.isDowned = false;

  mouse.x = 0;
  mouse.y = 0;
};

resize();
animate();

canvas.addEventListener("pointerdown", onDown);
canvas.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
