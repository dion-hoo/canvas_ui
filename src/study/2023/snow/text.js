import { Christmas } from "./Christmas.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d", {
  willReadFrequently: false,
});

let christmas;
let moveX = 0;
let moveY = 0;

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  WebFont.load({
    google: {
      families: ["Agbalumo:400"],
    },
    fontactive: () => {
      christmas = new Christmas();
      christmas.setText(ctx, "Christmas");

      animate();
    },
  });
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  christmas.draw(ctx, moveX, moveY);

  requestAnimationFrame(animate);
};

resize();

const onMove = (event) => {
  moveX = event.clientX;
  moveY = event.clientY;
};

window.addEventListener("pointermove", onMove);
window.addEventListener("resize", resize);
