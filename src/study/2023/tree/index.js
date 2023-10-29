import { Light } from "./Light.js";
import { Line } from "./Line.js";
import { util } from "./Util.js";
import { branch, bauble, radius } from "./data/branch.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  isDown: false,
  moveX: 0,
  moveY: 0,
};
let light = [];
let line = [];

const resize = () => {
  // canvas
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  // Object
  line = [];
  light = [];

  // line
  for (let i = 0; i < branch.length; i++) {
    const { x1, y1, x2, y2, x3, y3 } = branch[i];
    const baubles = bauble[i];

    line.push(new Line(x1, y1, x2, y2, x3, y3));

    // lighting
    for (let j = 0; j < baubles.length; j++) {
      const point = util.getPoint(x1, y1, x2, y2, x3, y3, baubles[j].position);

      const x = baubles[j].x + point.x;
      const y = baubles[j].y + point.y;
      const r = radius;
      const color = baubles[j].color;

      light.push(new Light(x, y, r, color));
    }
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  line.forEach((l) => {
    l.draw(ctx);
  });

  light.forEach((l) => {
    l.update(mouse);
    l.draw(ctx);
  });

  requestAnimationFrame(animate);
};

resize();
animate();

const onDown = (event) => {
  mouse.moveX = event.clientX;
  mouse.moveY = event.clientY;
};

const onMove = (event) => {
  mouse.moveX = event.clientX;
  mouse.moveY = event.clientY;
};

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("resize", resize);
