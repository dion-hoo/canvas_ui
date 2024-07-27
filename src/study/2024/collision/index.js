import { Circle } from "./circle.js";
import { GuideLine } from "./guideLine.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let circles = [];
const mouse = {
  isDown: false,
  isDowned: false,
  x: 0,
  y: 0,
};
let guideLine = null;

const defaultSize = innerWidth * 0.027;
const numberTextList = [
  {
    name: "A",
    radius: defaultSize,
    color: "rgba(255, 182, 193, 1.0)",
  },
  {
    name: "B",
    radius: defaultSize,
    color: "rgba(173, 216, 230, 1.0)",
  },
  {
    name: "C",
    radius: defaultSize,
    color: "rgba(152, 251, 152, 1.0)",
  },
  {
    name: "D",
    radius: defaultSize,
    color: "rgba(230, 230, 250, 1.0)",
  },
  {
    name: "E",
    radius: defaultSize,
    color: "rgba(240, 128, 128, 1.0)",
  },
  {
    name: "F",
    radius: defaultSize,
    color: "rgba(245, 255, 250, 1.0)",
  },
  {
    name: "G",
    radius: defaultSize,
    color: "rgba(255, 228, 225, 1.0)",
  },
  {
    name: "H",
    radius: defaultSize,
    color: "rgba(255, 255, 224, 1.0)",
  },
  {
    name: "I",
    radius: defaultSize,
    color: "rgba(255, 218, 185, 1.0)",
  },
  {
    name: "J",
    radius: defaultSize,
    color: "rgba(135, 206, 235, 1.0)",
  },
  {
    name: "K",
    radius: defaultSize,
    color: "rgba(176, 224, 230, 1.0)",
  },
  {
    name: "L",
    radius: defaultSize,
    color: "rgba(255, 218, 185, 1.0)",
  },
  {
    name: "M",
    radius: defaultSize,
    color: "rgba(255, 182, 193, 1.0)",
  },
];

const init = () => {
  WebFont.load({
    google: {
      families: ["Hind:500"],
    },
    fontactive: () => {
      resize();
      animate();
    },
  });
};

const resize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  circles = [];

  guideLine = new GuideLine(innerWidth * 0.5, innerHeight * 0.2);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  guideLine.update(mouse);
  guideLine.draw(ctx);

  if (mouse.isDown && !mouse.isDowned) {
    const index = Math.floor(Math.random() * numberTextList.length);
    const numberText = numberTextList[index];

    const numberTextName = numberText.name;
    const radius = numberText.radius;
    const color = numberText.color;

    for (let i = 0; i < 1; i++) {
      const x = mouse.x;
      const y = innerHeight * 0.2;
      const newCircle = new Circle(numberTextName, x, y, radius, color);

      newCircle.isGrab = true;

      circles.push(newCircle);
    }

    mouse.isDowned = true;
  }

  circles.forEach((c) => {
    c.update(1, mouse);
    c.constraints();
    c.collision(circles);
    c.draw(ctx);

    if (c.isFusion) {
      const index = Math.floor(Math.random() * numberTextList.length);
      const numberText = numberTextList[index];

      const numberTextName = numberText.name;
      const radius = numberText.radius;
      const color = numberText.color;

      const newCircle = new Circle(
        numberTextName,
        c.centerX,
        c.centerY,
        radius * 1.2,
        color
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
  mouse.isDowned = false;

  circles.forEach((c) => {
    c.isGrab = false;
  });
};

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
window.onload = () => {
  init();
};
