import { Circle } from "./circle.js";
import { GuideLine } from "./guideLine.js";
import { Boom } from "./boom.js";

const canvas = document.querySelector(".alphabet-canvas");
const ctx = canvas.getContext("2d");
let circles = [];
const mouse = {
  isDown: false,
  isDowned: false,
  x: 0,
  y: 0,
};
let guideLine = null;
let boom = null;

const defaultSize = innerWidth * 0.025;
const alphabetTextList = [
  {
    name: "A",
    radius: defaultSize,
    color: "#dfc74b",
    fontColor: "#f2e08c",
  },
  {
    name: "B",
    radius: defaultSize * 1.1,
    color: "#84b865",
    fontColor: "#acc988",
  },
  {
    name: "C",
    radius: defaultSize * 1.15,
    color: "#6ac4b6",
    fontColor: "#90e0d7",
  },
  {
    name: "D",
    radius: defaultSize * 1.2,
    color: "#ef9998",
    fontColor: "#f6b0ae",
  },
  {
    name: "E",
    radius: defaultSize * 1.25,
    color: "#cda5e3",
    fontColor: "#e3c7f0",
  },
  {
    name: "F",
    radius: defaultSize * 1.3,
    color: "#76aed1",
    fontColor: "#a0cce5",
  },
  {
    name: "G",
    radius: defaultSize * 1.35,
    color: "#c5493d",
    fontColor: "#d56962",
  },
  {
    name: "H",
    radius: defaultSize * 1.6,
    color: "#2e2f6f",
    fontColor: "#515394",
  },
  {
    name: "I",
    radius: defaultSize * 1.7,
    color: "#cb912e",
    fontColor: "#e2ae61",
  },
  {
    name: "J",
    radius: defaultSize * 1.8,
    color: "#773a1d",
    fontColor: "#93554a",
  },
  {
    name: "K",
    radius: defaultSize * 1.9,
    color: "#817aa3",
    fontColor: "#a29dbb",
  },
  {
    name: "L",
    radius: defaultSize * 2,
    color: "#3f6e95",
    fontColor: "#6186b1",
  },
];

const completedAlphabet = {
  name: "M",
  radius: defaultSize * 3,
  color: "red",
  fontColor: "#b7c55e",
};

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
    const index = Math.floor(Math.random() * alphabetTextList.length);
    const alphabetText = alphabetTextList[index];

    const alphabetTextName = alphabetText.name;
    const radius = alphabetText.radius;
    const color = alphabetText.color;
    const fontColor = alphabetText.fontColor;

    for (let i = 0; i < 1; i++) {
      const x = mouse.x;
      const y = innerHeight * 0.2;
      const newCircle = new Circle(
        index,
        alphabetTextName,
        x,
        y,
        radius,
        color,
        fontColor
      );

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
      boom = new Boom(c.centerX, c.centerY - c.centerY * 0.03, c.radius);

      const index = c.index + 1;
      let alphabetText = null;

      if (index > alphabetTextList.length - 1) {
        alphabetText = completedAlphabet;
      } else {
        alphabetText = alphabetTextList[index];
      }

      const alphabetTextName = alphabetText.name;
      const radius = alphabetText.radius;
      const color = alphabetText.color;
      const fontColor = alphabetText.fontColor;

      const newCircle = new Circle(
        index,
        alphabetTextName,
        c.centerX,
        c.centerY,
        radius,
        color,
        fontColor
      );

      circles.push(newCircle);
    }

    if (c.isCollision) {
      const index = circles.indexOf(c);

      circles.splice(index, 1);
    }
  });

  if (boom) {
    boom.draw(ctx);
  }

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
