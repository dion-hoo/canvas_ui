import { Pixel } from "./pixel.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let pixels = [];

const initialize = () => {
  const image = new Image();
  image.src = "../../../assets/img/image01.png";

  image.onload = () => {
    const gap = 30;
    const size = 300;

    for (let h = 0; h < size; h += gap) {
      for (let w = 0; w < size; w += gap) {
        const centerX = innerWidth / 2 - size / 2;
        const centerY = innerHeight / 2 - size / 2;

        const x = centerX + w + gap;
        const y = centerY + h + gap;
        const pixel = new Pixel(image, x, y, gap, size);

        pixels.push(pixel);
      }
    }
  };
};

const setSize = () => {
  const ratio = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;

  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  ctx.scale(ratio, ratio);

  initialize();
};
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pixels.forEach((pixel) => {
    pixel.draw(ctx);
  });

  requestAnimationFrame(animate);
};

setSize();
animate();
