import { Stem } from "./stem.js";
import { Petal } from "./petal.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const input = document.querySelector(".input");
let stem = [];
let petal = [];
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

let fps = 5;
let fpsTime = 1000 / fps;
let currentTime = 0;

const petalImage = new Image();
petalImage.src = "./petal.png";

const resize = () => {
  const ratio = 1; // devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  modifiedImage = null;
  inputValue = null;

  changeImageColor(234, 37, 72);

  stem = [];
  petal = [];
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

const animate = (time) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!currentTime) {
    currentTime = time;
  }

  const now = time - currentTime;

  if (now > fpsTime) {
    for (let i = 0; i < 1; i++) {
      const radius = 30;
      const x = Math.random() * innerWidth;
      const y = -Math.random() * radius - radius * 2;

      petal.push(new Petal(petalImage, x, y, radius));
    }

    currentTime = time;
  }

  if (mouse.isDown && !mouse.isDowned) {
    const length = Math.random() * 3 + 1;
    for (let i = 0; i < length; i++) {
      const x = mouse.x;
      const y = innerHeight;
      const size =
        Math.random() * (innerHeight - innerHeight * 0.85) + innerHeight * 0.1;

      const lineWidth = Math.random() * 2 + 2;
      const curve = Math.random() * 5 + 3;
      const direction = Math.random() > 0.5 ? curve : -curve;

      mouse.isDowned = true;

      stem.push(
        new Stem(
          i,
          x,
          y,
          size,
          modifiedImage,
          direction,
          lineWidth,
          curve,
          wind
        )
      );
    }
  }

  petal.forEach((p) => {
    p.update(inputValue);
    p.draw(ctx);

    if (p.isEnd) {
      const index = petal.indexOf(p);

      petal.splice(index, 1);
    }
  });

  stem.forEach((s) => {
    s.draw(ctx, inputValue);
  });

  requestAnimationFrame(animate);
};

const color = [
  {
    red: 255,
    green: 204,
    blue: 178,
  },
  {
    red: 230,
    green: 230,
    blue: 250,
  },
  {
    red: 234,
    green: 37,
    blue: 72,
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
