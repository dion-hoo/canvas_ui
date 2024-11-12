import { Ball } from "./ball.js";
import { Polygon } from "./polygon.js";
import { triangles } from "./obstacles.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let ball = null;
let triangleList = [];

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  ball = null;
  triangleList = [];

  ball = new Ball(innerWidth * 0.44, 100, 30);

  for (let i = 0; i < triangles.length; i++) {
    const { x, y, sides, size, angle } = triangles[i];

    triangleList.push(new Polygon(i, x, y, sides, size, angle));
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  triangleList.forEach((triangle) => {
    triangle.update();
    triangle.draw(ctx);

    ball.collision(ctx, triangle);
  });

  ball.update(1);
  ball.edges();
  ball.draw(ctx);

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
