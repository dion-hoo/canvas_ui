import { Stem } from "./stem.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const input = document.querySelector(".input");
let stem = [];
const mouse = {
  isDown: false,
  isDowned: false,
  x: 0,
  y: 0,
};
let inputValue = null;

let modifiedImage = null;
const wind = {
  x: 0.3,
  y: 0,
};

const resize = () => {
  const ratio = 1; // devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  modifiedImage = null;
  inputValue = null;

  changeImageColor(168, 47, 61);

  stem = [];
};

const changeImageColor = (r, g, b) => {
  const image = new Image();
  image.src = "./flower.png";

  image.onload = () => {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = image.width;
    tempCanvas.height = image.height;

    tempCtx.drawImage(image, 0, 0);
    const imageData = tempCtx.getImageData(
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    );
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
      }
    }

    tempCtx.putImageData(imageData, 0, 0);

    modifiedImage = new Image();
    modifiedImage.src = tempCanvas.toDataURL();
  };
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mouse.isDown && !mouse.isDowned) {
    const length = Math.random() * 6 + 3;
    for (let i = 0; i < length; i++) {
      const x = mouse.x + Math.random() * 200 - 100;
      const y = innerHeight;
      const size =
        Math.random() * (innerHeight - innerHeight * 0.7) + innerHeight * 0.1;
      const direction = Math.random() > 0.5 ? 1 : -1;
      const lineWidth = Math.random() * 2 + 2;

      mouse.isDowned = true;

      stem.push(
        new Stem(i, x, y, size, modifiedImage, direction, lineWidth, wind)
      );
    }
  }

  stem.forEach((s) => {
    s.draw(ctx, inputValue);
  });

  requestAnimationFrame(animate);
};

const color = [
  {
    red: 230,
    green: 230,
    blue: 250,
  },
  {
    red: 255,
    green: 255,
    blue: 225,
  },
  {
    red: 168,
    green: 47,
    blue: 61,
  },
];

const number = 0;

const onDown = (event) => {
  mouse.isDown = true;

  mouse.x = event.clientX;
  mouse.y = event.clientY;

  if (stem.length >= 20) {
    const index = Math.floor((stem.length - 20) / 20);
    const colorIndex = Math.min(index, color.length - 1);

    console.log(colorIndex);

    changeImageColor(
      color[colorIndex].red,
      color[colorIndex].green,
      color[colorIndex].blue
    );
  }
};

const onUp = () => {
  mouse.isDown = false;
  mouse.isDowned = false;
};

const onKeyDown = (event) => {
  if (event.key === "Enter") {
    inputValue = event.target.value;
  }
};

resize();
animate();

input.addEventListener("keydown", onKeyDown);
canvas.addEventListener("pointerdown", onDown);
canvas.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
