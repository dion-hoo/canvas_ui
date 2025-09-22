import { Tile } from "./Tile.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  x: 0,
  y: 0,
  isDown: false,
};
const tiles = [];

const setSize = () => {
  const ratio = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;

  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  ctx.scale(ratio, ratio);

  const cols = 4;
  const size = innerHeight * 0.13;
  const offsetX = innerWidth / 2 - (size * cols) / 2 + size / 2;
  const offsetY = innerHeight / 2 - (size * cols) / 2 + size / 2;

  for (let h = 0; h < cols; h++) {
    for (let w = 0; w < cols; w++) {
      const index = w + h * cols;

      const x = offsetX + w * size;
      const y = offsetY + h * size;

      tiles.push(new Tile(index, cols, x, y, size));
    }
  }
};
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  tiles.forEach((tile) => {
    tile.updatePosition(tiles, mouse);
    tile.draw(ctx);
  });

  requestAnimationFrame(animate);
};

const onDown = (event) => {
  mouse.isDown = true;

  mouse.x = event.clientX;
  mouse.y = event.clientY;
};

const onMove = (event) => {
  if (!mouse.isDown) return;

  mouse.x = event.clientX;
  mouse.y = event.clientY;
};

const onUp = () => {
  mouse.isDown = false;
};

setSize();
animate();

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
