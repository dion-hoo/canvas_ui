import { Pendulum } from "./Pendulum.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let pendulum = [];

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  const width = innerWidth / 2;
  const height = innerHeight / 2;
  const px = (innerWidth - width) / 2;
  const py = (innerHeight - height) / 2;

  for (let i = 0; i < 40; i++) {
    const x = Math.random() * width + px;
    const y = Math.random() * height + py;

    pendulum.push(new Pendulum(x, y));
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pendulum.forEach((p) => {
    p.update();
    p.draw(ctx);
  });

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
