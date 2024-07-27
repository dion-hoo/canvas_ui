import { Circle } from "./circle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let circles = [];
const mouse = {
  isDown: false,
  x: 0,
  y: 0,
};

const defaultSize = innerWidth * 0.06;
const fruits = [
  {
    name: "south-korea",
    radius: defaultSize,
    imageSrc: "./flags/south-korea.png",
  },
  {
    name: "micronesia",
    radius: defaultSize,
    imageSrc: "./flags/micronesia.png",
  },
  {
    name: "canada",
    radius: defaultSize,
    imageSrc: "./flags/canada.png",
  },
  {
    name: "germany",
    radius: defaultSize,
    imageSrc: "./flags/germany.png",
  },
  {
    name: "greece",
    radius: defaultSize,
    imageSrc: "./flags/greece.png",
  },
  {
    name: "japan",
    radius: defaultSize,
    imageSrc: "./flags/japan.png",
  },
  {
    name: "vatican-city",
    radius: defaultSize,
    imageSrc: "./flags/vatican-city.png",
  },
  {
    name: "brazil",
    radius: defaultSize,
    imageSrc: "./flags/brazil.png",
  },
  {
    name: "qatar",
    radius: defaultSize,
    imageSrc: "./flags/qatar.png",
  },
  {
    name: "ukraine",
    radius: defaultSize,
    imageSrc: "./flags/ukraine.png",
  },
  {
    name: "united-kingdom",
    radius: defaultSize,
    imageSrc: "./flags/united-kingdom.png",
  },
  {
    name: "united-states",
    radius: defaultSize,
    imageSrc: "./flags/united-states.png",
  },
  {
    name: "albania",
    radius: defaultSize,
    imageSrc: "./flags/albania.png",
  },
];

const resize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  circles = [];
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mouse.isDown) {
    const index = Math.floor(Math.random() * fruits.length);
    const fruit = fruits[index];

    const fruitName = fruit.name;
    const radius = fruit.radius;
    const imageSrc = fruit.imageSrc;

    for (let i = 0; i < 1; i++) {
      const x = mouse.x;
      const y = mouse.y;

      circles.push(new Circle(fruitName, x, y, radius, imageSrc));
    }

    mouse.isDown = false;
  }

  circles.forEach((c) => {
    c.update(1);
    c.constraints();
    c.collision(circles);
    c.draw(ctx);

    if (c.isFusion) {
      const index = Math.floor(Math.random() * fruits.length);
      const fruit = fruits[index];

      const fruitName = fruit.name;
      const radius = fruit.radius;
      const imageSrc = fruit.imageSrc;

      const newCircle = new Circle(
        fruitName,
        c.centerX,
        c.centerY,
        radius * 2,
        imageSrc
      );

      circles.push(newCircle);
    }

    if (c.isCollision) {
      const index = circles.indexOf(c);

      circles.splice(index, 1);
    }
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

resize();
animate();

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
