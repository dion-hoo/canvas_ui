import { Point } from "./Point.js";
import { Anchor } from "./anchor.js";
import { EyesGroup } from "./eyesGroup.js";

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

let point = [];
let anchor = null;
let eyesGroup = [];

const mouse = {
  x: 0,
  y: 0,
  isDown: false,
};

let startX = -innerWidth;
let startY = innerHeight;

const audio = new Audio("./impact.mp3");
const color = ["#641e1e", "	#c39a1c", "#3d2f22", "#717679", "#efeee9"];
const image = [
  {
    src: "./ghost.png",
    width: 0.611,
  },
  {
    src: "./pumpkin.png",
    width: 1.0479,
  },
  {
    src: "./bat.png",
    width: 1.4907,
  },
  {
    src: "./skeleton.png",
    width: 0.8124,
  },
  {
    src: "./spider.png",
    width: 1.6,
  },
];

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);
  point = [];

  anchor = new Anchor(startX, startY, 3, 200);

  eyesGroup = new EyesGroup(8);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mouse.isDown) {
    for (let i = 0; i < 3; i++) {
      const dx = mouse.x - startX;
      const dy = mouse.y - startY;
      const radian = Math.atan2(dy, dx);

      const size = 150;
      const x = startX + Math.cos(radian);
      const y = startY + Math.sin(radian);

      point.push(new Point(x, y, size));
    }

    const randomColor = color[Math.floor(Math.random() * color.length)];

    anchor.update(randomColor);
  }

  eyesGroup.draw(ctx, mouse);

  anchor.draw(ctx, mouse);

  point.forEach((p, index) => {
    p.update(1);
    p.spread(mouse);
    p.draw(ctx);

    if (p.opacity === 0 || p.opacity < 0) {
      point.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
};

const onDown = (event) => {
  mouse.isDown = true;

  mouse.x = event.clientX;
  mouse.y = event.clientY;

  startX = mouse.x;
  startY = mouse.y;

  anchor.x = mouse.x;
  anchor.y = mouse.y;

  const index = Math.floor(Math.random() * image.length);

  anchor.image.src = image[index].src;
  anchor.width = image[index].width;

  audio.volume = 0.4;
  audio.currentTime = 0;
  audio.play();
};
const onMove = (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
};
const onUp = () => {
  mouse.isDown = false;
};

// tick();
resize();
animate();

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
