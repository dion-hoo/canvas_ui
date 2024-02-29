import { Effect } from "./Effect.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d", {
  willReadFrequently: true,
});
ctx.imageSmoothingEnabled = false;
let effect;
let time = 0;
let imageIndex = 0;
let isDown = false;
let isPress = false;
const centerX = (innerWidth - 640) / 2;
const centerY = (innerHeight - 722) / 2;

const imageList = [
  {
    image: "img",
    positionX: 320,
    positionY: 722,
    speedX: 0,
    speedY: 0,
    direction: 1,
  },
  {
    image: "img2",
    positionX: 0,
    positionY: 722,
    speedX: 0,
    speedY: 0,
    direction: -1,
  },
  {
    image: "img3",
    positionX: 640,
    positionY: 722,
    speedX: 0,
    speedY: 0,
    direction: 1,
  },
  {
    image: "img4",
    positionX: 320,
    positionY: 0,
    speedX: 0,
    speedY: 0,
    direction: -1,
  },
  {
    image: "img5",
    positionX: 640,
    positionY: 0,
    speedX: 0,
    speedY: 0,
    direction: 1,
  },
  {
    image: "img6",
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
    direction: -1,
  },
  {
    image: "img7",
    positionX: 320,
    positionY: 722,
    speedX: 0,
    speedY: 0,
    direction: 0,
    isSeperate: true,
  },
  {
    image: "img8",
    positionX: 320,
    positionY: 722,
    speedX: 0,
    speedY: 0,
    direction: 1,
  },
  {
    image: "img9",
    positionX: 320,
    positionY: 722,
    speedX: 0,
    speedY: 0,
    direction: -1,
  },
  {
    image: "img10",
    positionX: 320,
    positionY: 722,
    speedX: 0,
    speedY: 0,
    direction: 1,
  },
  {
    image: "img11",
    positionX: 320,
    positionY: 722,
    speedX: 0,
    speedY: 0,
    direction: -1,
  },
  {
    image: "img12",
    positionX: 320,
    positionY: 722,
    speedX: 0,
    speedY: 0,
    direction: 1,
  },
  {
    image: "img13",
    positionX: 320,
    positionY: 722,
    speedX: 0,
    speedY: 0,
    direction: -1,
  },
];

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  effect = new Effect(canvas, imageList[imageIndex]);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();

  ctx.translate(centerX, centerY);

  if (isDown && isPress) {
    effect = new Effect(canvas, imageList[imageIndex]);
  }

  effect.draw(ctx, time, centerX, centerY, isDown && isPress);

  time += 1;

  ctx.restore();

  requestAnimationFrame(animate);
};

const onDown = () => {
  time = 0;
  isDown = true;

  if (isPress) {
    imageIndex++;
  }

  imageIndex %= imageList.length;
};

const onUp = () => {
  isDown = false;
};

resize();
animate();

window.addEventListener("keydown", (e) => {
  if (e.key === "a") {
    isPress = true;
  }
});

window.addEventListener("keyup", () => {
  isPress = false;
});

window.addEventListener("mousedown", onDown);
window.addEventListener("mouseup", onUp);
window.addEventListener("resize", resize);
