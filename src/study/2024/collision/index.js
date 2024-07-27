import { Circle } from "./circle.js";
import { GuideLine } from "./guideLine.js";
import { Spark } from "./spark.js";

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
let spark = null;

const defaultSize = innerWidth * 0.03;
const numberTextList = [
  {
    name: "A",
    radius: defaultSize,
    color: "#dfc74b",
    fontColor: "#f2e08c",
  },
  {
    name: "B",
    radius: defaultSize,
    color: "#84b865",
    fontColor: "#acc988",
  },
  {
    name: "C",
    radius: defaultSize,
    color: "#6ac4b6",
    fontColor: "#90e0d7",
  },
  {
    name: "D",
    radius: defaultSize,
    color: "#ef9998",
    fontColor: "#f6b0ae",
  },
  {
    name: "E",
    radius: defaultSize,
    color: "#cda5e3",
    fontColor: "#e3c7f0",
  },
  {
    name: "F",
    radius: defaultSize,
    color: "#76aed1",
    fontColor: "#a0cce5",
  },
  {
    name: "G",
    radius: defaultSize,
    color: "#c5493d",
    fontColor: "#d56962",
  },
  {
    name: "H",
    radius: defaultSize,
    color: "#2e2f6f",
    fontColor: "#515394",
  },
  {
    name: "I",
    radius: defaultSize,
    color: "#cb912e",
    fontColor: "#e2ae61",
  },
  {
    name: "J",
    radius: defaultSize,
    color: "#773a1d",
    fontColor: "#93554a",
  },
  {
    name: "K",
    radius: defaultSize,
    color: "#817aa3",
    fontColor: "#a29dbb",
  },
  {
    name: "L",
    radius: defaultSize,
    color: "#3f6e95",
    fontColor: "#6186b1",
  },
  {
    name: "M",
    radius: defaultSize,
    color: "#9ba23a",
    fontColor: "#b7c55e",
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
    const fontColor = numberText.fontColor;

    for (let i = 0; i < 1; i++) {
      const x = mouse.x;
      const y = innerHeight * 0.2;
      const newCircle = new Circle(
        numberTextName,
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
      spark = new Spark(c.centerX, c.centerY - c.centerY * 0.03);

      const index = Math.floor(Math.random() * numberTextList.length);
      const numberText = numberTextList[index];

      const numberTextName = numberText.name;
      const radius = numberText.radius;
      const color = numberText.color;
      const fontColor = numberText.fontColor;

      const newCircle = new Circle(
        numberTextName,
        c.centerX,
        c.centerY,
        radius * 2,
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

  if (spark) {
    spark.update();
    spark.draw(ctx);

    if (spark.isEnd) {
      spark = null;
    }
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
