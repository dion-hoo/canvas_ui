import { Ball } from "./ball.js";
import { Polygon } from "./polygon.js";
import { triangles } from "./obstacles.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let ball = null;
let circle = [];
let triangleList = [];

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * 2 * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight * 2}px`;

  ctx.scale(ratio, ratio);

  ball = null;
  circle = [];
  triangleList = [];

  ball = new Ball(110, 0, 30, "orange", true);

  for (let i = 0; i < triangles.length; i++) {
    const { x, y, sides, size, angle } = triangles[i];

    triangleList.push(new Polygon(i, x, y, sides, size, angle, "#fff"));
  }

  for (let i = 0; i < 16; i++) {
    const radius = 30;
    const x = i === 0 ? 100 : 110 + i * radius * 2.1;
    const y = i === 0 ? 200 : 230 + i * radius;
    const color = "#fff";

    circle.push(new Ball(x, y, radius, color, false));
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  triangleList.forEach((triangle, index) => {
    triangle.draw(ctx);
    ball.collision(triangle, index);
  });

  circle.forEach((c) => {
    c.draw(ctx);
  });

  ball.update(1);
  ball.edges(canvas.width, canvas.height);
  ball.constraints(circle);
  ball.draw(ctx);

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
