import { Spring } from "./spring.js";
import { StringAudio } from "./stringsAudio.js";
import { PlayDot } from "./playDot.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const borderSpring = [];
const mouse = {
  startX: 0,
  startY: 0,
  moveX: 0,
  moveY: 0,
  isDown: false,
  isClick: false,
};
let dot;
let audio;
let playListIndex = 0;
let opacity = 1;
let isStop = false;

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  const x = (i) => {
    return innerWidth / 2 + i * 80 - (80 * 4) / 2;
  };

  // dot
  dot = new PlayDot(x(0), 100);

  // bar
  const color = ["#fff", "#fff", "#fff", "#fff", "#fff"];
  for (let i = 0; i < 5; i++) {
    borderSpring.push(
      new Spring(
        {
          x1: x(i),
          y1: Math.random() * innerHeight * 0.28,
          x2: innerWidth / 2 + i * 80 - (80 * 4) / 2,
          y2: innerHeight * 0.3,
        },
        i,
        30,
        color[i],
        Math.random() * 10
      )
    );
  }

  // audio
  audio = new StringAudio();
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#e63f47";
  ctx.globalAlpha = opacity;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  borderSpring.forEach((spring) => {
    spring.update();
    spring.draw(ctx, mouse.moveX, mouse.moveY);

    isStop = spring.isFalled;
  });

  dot.update(mouse, borderSpring, isStop, playListIndex);
  dot.draw(ctx);

  requestAnimationFrame(animate);
};

resize();
animate();

const onDown = (event) => {
  mouse.isDown = true;
  mouse.moveX = 0;
  mouse.moveY = 0;

  mouse.startX = event.clientX;
  mouse.startY = event.clientY;
};

const onMove = (event) => {
  if (mouse.isDown) {
    mouse.moveX = event.clientX;
    mouse.moveY = event.clientY;
  }
};

const onUp = () => {
  mouse.isDown = false;
};

const onClick = () => {
  mouse.isClick = true;

  // audio.play(playListIndex);

  // playListIndex += 1;
  // playListIndex %= borderSpring.length;
};

window.addEventListener("click", onClick);
window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
