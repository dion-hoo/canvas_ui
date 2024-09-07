import { Point } from "./Point.js";
import { Polygon } from "./Polygon.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let point = null;
let polygons = [];

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  point = null;
  polygons = [];

  const size = Math.random() * 100 + 100;
  const x1 = size / 2;
  const x2 = innerWidth - size / 2;

  point = new Point(innerWidth * 0.09, 80, 30);

  // left
  polygons[0] = new Polygon(x1, innerHeight * 0.3, 3, size, 0);
  polygons[1] = new Polygon(x1, innerHeight * 0.55, 3, size, 0);
  polygons[2] = new Polygon(x1, innerHeight * 0.86, 3, size, 0);

  // right
  // polygons[3] = new Polygon(x2, innerHeight * 0.9, 3, size, 180);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  polygons.forEach((polygon) => {
    polygon.rotation();
    polygon.draw(ctx);
    polygon.collision(ctx, point);
  });

  point.constraints();
  point.update(1);
  point.draw(ctx);

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
