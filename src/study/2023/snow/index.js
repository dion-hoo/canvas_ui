import { Snow } from "./Snow.js";
import { BigSnow } from "./BigSnow.js";

const canvas = document.querySelector(".snow");
const ctx = canvas.getContext("2d");
const gl = canvas.getContext("webgl2");

let snow = [];
let bigSnow = [];
let moveX = 0;
let moveY = 0;
let posX = innerWidth * 0.5;
let posY = innerHeight - 100;
let offsetX = 0;
let offsetY = 0;
let isMove = false;

const fps = 18;
const fpsTime = 1000 / fps;
const fps2 = 0.3;
const fps2Time = 1000 / fps2;

let currentTime;
let currentTime2;

const image = new Image();
image.src = "../../../assets/img/snowflake.png";

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  snow = [];
  bigSnow = [];
};

const animate = (time) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!currentTime) {
    currentTime = time;
  }

  const now = time - currentTime;

  if (now > fpsTime && snow.length < 300) {
    const radius = Math.random() * 25 + 15;
    const x = Math.random() * innerWidth;
    const y = -radius;

    snow.push(new Snow(x, y, radius));

    currentTime = time;
  }

  snow.forEach((s) => {
    s.update();
    s.draw(ctx, image);

    if (s.lifecycle || s.radius < 1) {
      const index = snow.indexOf(s);

      snow.splice(index, 1);
    }
  });

  if (!currentTime2) {
    currentTime2 = time;
  }

  const now2 = time - currentTime2;
  if (now2 > fps2Time && bigSnow.length < 2) {
    for (let i = 0; i < 2; i++) {
      const radius = Math.random() * innerWidth * 0.1 + innerWidth * 0.15;
      const position = Math.random() > 0.5 ? "left" : "right";
      const angle = position === "left" ? 0 : 180;

      const x = position === "left" ? -radius : innerWidth + radius;
      const y = Math.random() * innerHeight * 0.5 + innerHeight * 0.1;

      bigSnow.push(new BigSnow(x, y, radius, angle));
    }

    currentTime2 = time;
  }

  bigSnow.forEach((s) => {
    s.update();
    s.draw(ctx, image);

    if (s.lifecycle) {
      const index = bigSnow.indexOf(s);

      bigSnow.splice(index, 1);
    }
  });

  isMove = false;

  requestAnimationFrame(animate);
};

const onMove = (event) => {
  posX = event.clientX;
  posY = event.clientY;

  moveX = event.clientX - offsetX;
  moveY = event.clientY - offsetY;

  offsetX = event.clientX;
  offsetY = event.clientY;

  isMove = true;
};

resize();
animate();

window.addEventListener("pointermove", onMove);
window.addEventListener("resize", resize);
