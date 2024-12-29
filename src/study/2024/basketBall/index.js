import { NetManager } from "./NetManager.js";
import { Ball } from "./Ball.js";
import { GuideLine } from "./GuideLine.js";
import { EventHandlers } from "./EventHandlers.js";
import { Chalk } from "./Chalk.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const socre = document.querySelector(".score");

let ball = null;
let netManager = [];
let guideLine = null;
let eventHandlers = null;
let chalk = null;

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  initialize();
};

const createChalk = () => {
  chalk = null;

  const x = innerWidth * 0.5;
  const y = innerHeight;

  chalk = new Chalk(x, y);
};

const createBall = () => {
  ball = null;

  const radius = innerHeight * 0.0639;
  const x = innerWidth * 0.5;
  const y = innerHeight - radius;

  ball = new Ball(x, y, radius);
};

// true false
const isMove = true;

const createNetManager = () => {
  netManager = [];

  // true false
  const length = 3;
  const isRandomColor = false;

  const getRandomRgbColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  for (let i = 0; i < length; i++) {
    const x = (innerWidth / (length + 1)) * (i + 1);
    const y = innerHeight * 0.2;
    const strokeColor = "#454545";
    const rimColor = isRandomColor ? getRandomRgbColor() : "#ea826b";

    netManager[i] = new NetManager(x, y, strokeColor, rimColor);
  }
};

const createGuideLine = () => {
  guideLine = null;

  const padding = innerHeight * 0.0143;
  const x = innerWidth * 0.5;
  const y = innerHeight - ball.radius * 2 - padding;
  const color = "#333";

  guideLine = new GuideLine(x, y, color);
};

const createEventHandlers = () => {
  eventHandlers = new EventHandlers(ball, guideLine);
  eventHandlers.registerEvents();
};

const initialize = () => {
  createChalk();
  createBall();
  createNetManager();
  createGuideLine();
  createEventHandlers();
};

const drawChalk = () => {
  chalk.draw(ctx);
};

const drawNetManager = (touch) => {
  netManager.forEach((net) => {
    if (isMove) {
      net.moveMoment(0.01);
    }
    net.draw(ctx, ball, touch, ball.isRimPassed);
  });
};

const drawRimPedestal = () => {
  netManager.forEach((net) => {
    net.drawRimPedestal(ctx);
  });
};

const drawBall = (timeStamp, mouse) => {
  if (mouse.isStart) {
    ball.throw(timeStamp, mouse);
  }

  socre.innerHTML = ball.score;

  ball.updatePassedBall();
  ball.windowRebound();
  ball.draw(ctx, mouse);
};

const animate = (timeStamp) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const mouse = eventHandlers.mouse;
  const touch = eventHandlers.touch;

  if (mouse.isDown) {
    guideLine.draw(ctx, mouse);
  }

  drawChalk(ctx);

  if (!ball.isRimPassed) {
    drawRimPedestal();
    drawNetManager(touch);
    drawBall(timeStamp, mouse);
  } else {
    drawRimPedestal();
    drawBall(timeStamp, mouse);
    drawNetManager(touch);
  }

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
