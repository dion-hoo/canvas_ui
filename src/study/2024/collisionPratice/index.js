import { Circle } from "./Circle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const text = document.querySelector(".front");

let circle = [];
const mouse = {
  isDown: false,
  isClick: false,
  x: 0,
  y: 0,
};

const resize = () => {
  const ratio = devicePixelRatio < 1 ? 1 : devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  circle = [];
};

// let hsl = 200;
let hsl = 255;
let index = 0;

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mouse.isClick) {
    for (let i = 0; i < 1; i++) {
      const radius = 30;
      const x = 100; // mouse.x;
      const y = 100; // mouse.y;

      if (circle.length === 0) {
        circle.push(new Circle(index, x, y, radius, hsl));

        index++;
        hsl += 3;
      } else {
        const lastCircle = circle.length - 1;
        const dx = circle[lastCircle].x - x;
        const distance = circle[lastCircle].radius + radius + radius / 2;

        if (distance < dx) {
          circle.push(new Circle(index, x, y, radius, hsl));

          index++;
          hsl--;
        }
      }
    }
  }

  // grid.draw(ctx);

  // circle
  circle.forEach((c) => {
    c.applyForce();
    c.windowCollision();
    c.update(circle);
    c.draw(ctx);
  });

  requestAnimationFrame(animate);
};

const onDown = (event) => {
  mouse.isDown = true;

  mouse.x = event.clientX;
  mouse.y = event.clientY;
};

const onMove = (event) => {
  if (mouse.isDown) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }
};

const onUp = () => {
  mouse.isDown = false;
};

const onClick = () => {
  mouse.isClick = !mouse.isClick;
};

const letter = ["crash", "one", "two"];
const onWheel = () => {
  let count = 3;
  text.classList.add("active");
  setInterval(() => {
    count--;

    if (count < 0) {
      count = 0;
    }
    text.innerHTML = letter[count];
  }, 880);
};

resize();
animate();

window.addEventListener("click", onClick);
window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("wheel", onWheel);
window.addEventListener("resize", resize);
